"use client";

type TranslateCardProps = {
  aminoAcidSeq: string;
};

export default function TranslateCard({ aminoAcidSeq }: TranslateCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">翻訳結果（アミノ酸配列）</h2>
      <p className="break-words">{aminoAcidSeq}</p>
    </div>
  );
}
