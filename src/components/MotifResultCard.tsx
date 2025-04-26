"use client";

type MotifResultCardProps = {
  motif: string;
  positions: number[];
};

export default function MotifResultCard({ motif, positions }: MotifResultCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">モチーフ検索結果</h2>
      {positions.length === 0 ? (
        <p className="text-gray-300">モチーフ「{motif}」は見つかりませんでした。</p>
      ) : (
        <div className="flex flex-col gap-2">
          <p>モチーフ「{motif}」は {positions.length} 回見つかりました。</p>
          <p>位置一覧: {positions.join(", ")} (1-based)</p>
        </div>
      )}
    </div>
  );
}
