"use client";

type GCContentCardProps = {
  gcContent: number;
};

export default function GCContentCard({ gcContent }: GCContentCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">GC含量</h2>
      <p className="text-cyan-300 text-2xl font-semibold">
        {gcContent.toFixed(2)} %
      </p>
    </div>
  );
}
