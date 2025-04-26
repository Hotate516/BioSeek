type SummaryCardProps = {
  sequenceLength: number;
  gcContent: number;
  aminoAcidSeq: string;
};

export default function SummaryCard({ sequenceLength, gcContent, aminoAcidSeq }: SummaryCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col gap-4">
      <h2 className="text-2xl font-bold">解析サマリー</h2>
      <p>配列長： {sequenceLength} bp</p>
      <p>GC含量： {gcContent.toFixed(2)} %</p>
      {aminoAcidSeq && (
        <div className="break-words text-sm text-gray-300 mt-2">
          <span className="font-semibold text-white">翻訳配列：</span>
          {aminoAcidSeq}
        </div>
      )}
    </div>
  );
}
