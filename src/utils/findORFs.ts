export function findORFs(sequence: string): { start: number; end: number; orf: string }[] {
    const orfs = [];
    const startCodon = "ATG";
    const stopCodons = ["TAA", "TAG", "TGA"];
    const upperSeq = sequence.toUpperCase();
  
    for (let i = 0; i < upperSeq.length - 2; i++) {
      if (upperSeq.slice(i, i + 3) === startCodon) {
        for (let j = i + 3; j < upperSeq.length - 2; j += 3) {
          const codon = upperSeq.slice(j, j + 3);
          if (stopCodons.includes(codon)) {
            orfs.push({
              start: i + 1, // 1-based index
              end: j + 3,
              orf: upperSeq.slice(i, j + 3),
            });
            break; // ストップコドン見つかったらこのORFは終了
          }
        }
      }
    }
  
    return orfs;
  }
  