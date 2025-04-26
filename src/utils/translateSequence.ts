export function translateSequence(sequence: string, frame: number = 0): string {
  const codonTable: { [key: string]: string } = {
    ATG: "M", TAA: "*", TAG: "*", TGA: "*",
    GCT: "A", GCC: "A", GCA: "A", GCG: "A",
    CGT: "R", CGC: "R", CGA: "R", CGG: "R", AGA: "R", AGG: "R",
    AAT: "N", AAC: "N",
    GAT: "D", GAC: "D",
    TGT: "C", TGC: "C",
    CAA: "Q", CAG: "Q",
    GAA: "E", GAG: "E",
    GGT: "G", GGC: "G", GGA: "G", GGG: "G",
    CAT: "H", CAC: "H",
    ATT: "I", ATC: "I", ATA: "I",
    TTA: "L", TTG: "L", CTT: "L", CTC: "L", CTA: "L", CTG: "L",
    AAA: "K", AAG: "K",
    TTT: "F", TTC: "F",
    CCT: "P", CCC: "P", CCA: "P", CCG: "P",
    TCT: "S", TCC: "S", TCA: "S", TCG: "S", AGT: "S", AGC: "S",
    ACT: "T", ACC: "T", ACA: "T", ACG: "T",
    TGG: "W",
    TAT: "Y", TAC: "Y",
    GTT: "V", GTC: "V", GTA: "V", GTG: "V",
  };

  const upperSeq = sequence.toUpperCase();
  let aaSeq = "";

  for (let i = frame; i + 2 < upperSeq.length; i += 3) {
    const codon = upperSeq.slice(i, i + 3);
    aaSeq += codonTable[codon] || "X"; // マッチしないコドンは "X"
  }

  return aaSeq;
}
