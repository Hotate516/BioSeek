"use client";

import { useState } from "react";
import InputArea from "@/components/InputArea";
import CountCard from "@/components/CountCard";
import ReverseComplementCard from "@/components/ReverseComplementCard";
import BaseCountChart from "@/components/BaseCountChart";
import SummaryCard from "@/components/SummaryCard";
import ORFCard from "@/components/ORFCard";
import TranslateCard from "@/components/TranslateCard";
import MotifResultCard from "@/components/MotifResultCard";
import { findORFs } from "@/utils/findORFs";
import { translateSequence } from "@/utils/translateSequence";
import { findMotifs } from "@/utils/findMotifs";

export default function Home() {
  const [sequence, setSequence] = useState("");
  const [result, setResult] = useState<{
    A: number;
    T: number;
    G: number;
    C: number;
    gcContent: number;
  } | null>(null);
  const [reverseComplement, setReverseComplement] = useState("");
  const [orfs, setOrfs] = useState<{ start: number; end: number; orf: string }[]>([]);
  const [aminoAcidSeq, setAminoAcidSeq] = useState("");
  const [selectedFunction, setSelectedFunction] = useState("count");

  const [motif, setMotif] = useState("");
  const [motifPositions, setMotifPositions] = useState<number[]>([]);

  const [translationFrame, setTranslationFrame] = useState(0); // ← NEW!! フレーム管理

  const countBases = () => {
    const counts = { A: 0, T: 0, G: 0, C: 0 };
    const upperSeq = sequence.toUpperCase();

    for (const base of upperSeq) {
      if (counts.hasOwnProperty(base)) {
        counts[base as keyof typeof counts]++;
      }
    }

    const totalBases = counts.A + counts.T + counts.G + counts.C;
    const gcContent = totalBases > 0 ? ((counts.G + counts.C) / totalBases) * 100 : 0;

    setResult({ ...counts, gcContent });
  };

  const createReverseComplement = () => {
    const complementMap: { [key: string]: string } = {
      A: "T",
      T: "A",
      G: "C",
      C: "G",
    };

    const upperSeq = sequence.toUpperCase();
    const reversedSeq = upperSeq
      .split("")
      .reverse()
      .map((base) => complementMap[base] || base)
      .join("");

    setReverseComplement(reversedSeq);
  };

  const detectORFs = () => {
    const detected = findORFs(sequence);
    setOrfs(detected);
  };

  const doTranslate = () => {
    if (orfs.length > 0) {
      const longestORF = orfs.reduce((prev, curr) => (curr.orf.length > prev.orf.length ? curr : prev));
      const translated = translateSequence(longestORF.orf, translationFrame); // ← フレーム渡す
      setAminoAcidSeq(translated);
    } else {
      const translated = translateSequence(sequence, translationFrame); // ORFがない場合
      setAminoAcidSeq(translated);
    }
  };

  const searchMotif = () => {
    if (motif.trim() === "") {
      setMotifPositions([]);
      return;
    }
    const positions = findMotifs(sequence, motif);
    setMotifPositions(positions);
  };

  const analyzeAll = () => {
    countBases();
    createReverseComplement();
    detectORFs();
    doTranslate();
  };

  const chartData =
    result &&
    ["A", "T", "G", "C"].map((base) => ({
      base,
      count: result[base],
    }));

  return (
    <main className="mt-[60px] min-h-screen bg-gray-950 text-white flex flex-col p-6 gap-6">
      {/* ヘッダー */}
      <header className="fixed top-0 left-0 w-full bg-gray-950 z-50 px-6 py-4 border-b border-gray-800 shadow-md">
        <h1 className="text-3xl font-bold text-cyan-400">🧬 BioSeek</h1>
      </header>

      {/* 説明ボード */}
      <div className="bg-gray-800 text-gray-100 px-6 py-4 rounded-lg flex items-start gap-2 text-sm shadow-sm border border-gray-700">
        <span className="text-xl">💡</span>
        <p>
          <strong>BioSeekとは：</strong><br/>
          塩基配列を入力するだけで、塩基カウント・逆相補鎖・ORF検出・翻訳・モチーフ検索など、生命科学に必要な解析をワンボタンで実行できるツールです。
        </p>
      </div>

      {/* サマリー */}
      {result && (
        <SummaryCard sequenceLength={sequence.length} gcContent={result.gcContent} aminoAcidSeq={aminoAcidSeq} />
      )}

      {/* 入力エリア */}
      <div className="flex flex-col lg:flex-row gap-6 w-full mt-8">
        <div className="lg:w-1/3 w-full flex flex-col gap-6">
          <InputArea sequence={sequence} setSequence={setSequence} />

          <div className="flex flex-col gap-4">
            <button
              className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg"
              onClick={analyzeAll}
            >
              🔬 解析する
            </button>
          </div>
        </div>

        {/* 選択エリア */}
        <div className="lg:w-2/3 w-full flex flex-col gap-6">
          {/* 機能選択ドロップダウン */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold mb-1">解析機能を選択：</label>
            <select
              className="p-2 rounded bg-gray-800 text-white border border-gray-600"
              value={selectedFunction}
              onChange={(e) => setSelectedFunction(e.target.value)}
            >
              <option value="count">塩基カウント</option>
              <option value="reverse">逆相補鎖</option>
              <option value="graph">グラフ表示</option>
              <option value="orf">ORF検出</option>
              <option value="translate">翻訳（アミノ酸配列）</option>
              <option value="motif">モチーフ検索</option>
            </select>
          </div>

          {/* 選択した機能の表示 */}
          <div className="w-full">
            {selectedFunction === "count" && result && (
              <CountCard result={result} />
            )}
            {selectedFunction === "reverse" && reverseComplement && (
              <ReverseComplementCard reverseComplement={reverseComplement} />
            )}
            {selectedFunction === "graph" && result && (
              <BaseCountChart chartData={chartData!} />
            )}
            {selectedFunction === "orf" && <ORFCard orfs={orfs} />}
            {selectedFunction === "translate" && (
              <>
                {/* フレーム選択 */}
                <div className="flex flex-col gap-2 mb-4">
                  <label className="text-sm text-gray-400">翻訳フレーム</label>
                  <select
                    className="p-2 rounded bg-gray-800 text-white border border-gray-600"
                    value={translationFrame}
                    onChange={(e) => setTranslationFrame(Number(e.target.value))}
                  >
                    <option value={0}>+0 フレーム</option>
                    <option value={1}>+1 フレーム</option>
                    <option value={2}>+2 フレーム</option>
                  </select>
                </div>

                {/* 翻訳結果 */}
                {aminoAcidSeq && <TranslateCard aminoAcidSeq={aminoAcidSeq} />}
              </>
            )}
            {selectedFunction === "motif" && (
              <>
                {/* モチーフ検索フォーム */}
                <div className="flex flex-col gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="検索するモチーフを入力してください（例: TATA）"
                    className="p-2 rounded bg-gray-800 text-white border border-gray-600"
                    value={motif}
                    onChange={(e) => setMotif(e.target.value)}
                  />
                  <button
                    className="w-full px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg"
                    onClick={searchMotif}
                  >
                    🔍 モチーフ検索
                  </button>
                </div>

                {/* モチーフ検索結果 */}
                <MotifResultCard motif={motif} positions={motifPositions} />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
