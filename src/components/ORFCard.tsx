"use client";

type ORFCardProps = {
  orfs: { start: number; end: number; orf: string }[];
};

export default function ORFCard({ orfs }: ORFCardProps) {
  if (orfs.length === 0) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">ORF検出結果</h2>
        <p className="text-gray-300">ORFが見つかりませんでした。</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">ORF検出結果</h2>
      <div className="flex flex-col gap-4">
        {orfs.map((orf, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg">
            <p><strong>開始位置:</strong> {orf.start}</p>
            <p><strong>終了位置:</strong> {orf.end}</p>
            <p className="break-words mt-2"><strong>ORF配列:</strong> {orf.orf}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
