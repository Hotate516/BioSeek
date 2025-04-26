"use client";

type InputAreaProps = {
  sequence: string;
  setSequence: (value: string) => void;
};

export default function InputArea({ sequence, setSequence }: InputAreaProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">配列を入力</h2>
      <textarea
        className="w-full h-60 p-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        placeholder="ここに塩基配列（例: ATCGATCG...）を貼り付けてください"
        value={sequence}
        onChange={(e) => setSequence(e.target.value)}
      />
    </div>
  );
}
