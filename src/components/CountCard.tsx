"use client";

type CountCardProps = {
  result: {
    A: number;
    T: number;
    G: number;
    C: number;
  };
};

export default function CountCard({ result }: CountCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">塩基数カウント結果</h2>
      <div className="grid grid-cols-2 gap-4 text-lg">
        {["A", "T", "G", "C"].map((base) => (
          <div
            key={base}
            className="bg-gray-700 px-6 py-4 rounded-lg text-center"
          >
            {base}: {result[base]} 回
          </div>
        ))}
      </div>
    </div>
  );
}
