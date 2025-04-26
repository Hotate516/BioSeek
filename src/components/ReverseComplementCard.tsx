"use client";

type ReverseComplementCardProps = {
  reverseComplement: string;
};

export default function ReverseComplementCard({ reverseComplement }: ReverseComplementCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">逆相補鎖</h2>
      <textarea
        className="w-full h-40 p-4 rounded-lg bg-gray-700 text-white border border-gray-600"
        readOnly
        value={reverseComplement}
      />
    </div>
  );
}
