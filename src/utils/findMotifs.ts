export function findMotifs(sequence: string, motif: string): number[] {
    const positions = [];
    const upperSeq = sequence.toUpperCase();
    const upperMotif = motif.toUpperCase();
  
    let index = upperSeq.indexOf(upperMotif);
    while (index !== -1) {
      positions.push(index + 1); // 1-based indexにする
      index = upperSeq.indexOf(upperMotif, index + 1);
    }
  
    return positions;
  }
  