const codonTable: { [key: string]: string } = {
    // スタート
    "ATG": "M",
  
    // フェニルアラニン
    "TTT": "F", "TTC": "F",
  
    // ロイシン
    "TTA": "L", "TTG": "L", "CTT": "L", "CTC": "L", "CTA": "L", "CTG": "L",
  
    // イソロイシン
    "ATT": "I", "ATC": "I", "ATA": "I",
  
    // メチオニン（スタート）
    "ATG": "M",
  
    // バリン
    "GTT": "V", "GTC": "V", "GTA": "V", "GTG": "V",
  
    // セリン
    "TCT": "S", "TCC": "S", "TCA": "S", "TCG": "S", "AGT": "S", "AGC": "S",
  
    // プロリン
    "CCT": "P", "CCC": "P", "CCA": "P", "CCG": "P",
  
    // スレオニン
    "ACT": "T", "ACC": "T", "ACA": "T", "ACG": "T",
  
    // アラニン
    "GCT": "A", "GCC": "A", "GCA": "A", "GCG": "A",
  
    // チロシン
    "TAT": "Y", "TAC": "Y",
  
    // ヒスチジン
    "CAT": "H", "CAC": "H",
  
    // グルタミン
    "CAA": "Q", "CAG": "Q",
  
    // アスパラギン
    "AAT": "N", "AAC": "N",
  
    // リシン
    "AAA": "K", "AAG": "K",
  
    // アスパラギン酸
    "GAT": "D", "GAC": "D",
  
    // グルタミン酸
    "GAA": "E", "GAG": "E",
  
    // システイン
    "TGT": "C", "TGC": "C",
  
    // トリプトファン
    "TGG": "W",
  
    // アルギニン
    "CGT": "R", "CGC": "R", "CGA": "R", "CGG": "R", "AGA": "R", "AGG": "R",
  
    // グリシン
    "GGT": "G", "GGC": "G", "GGA": "G", "GGG": "G",
  
    // ストップコドン
    "TAA": "*", "TAG": "*", "TGA": "*",
  };
  
  export function translateSequence(seq: string): string {
    const upperSeq = seq.toUpperCase();
    let aminoAcidSeq = "";
  
    for (let i = 0; i < upperSeq.length - 2; i += 3) {
      const codon = upperSeq.slice(i, i + 3);
      aminoAcidSeq += codonTable[codon] || "?"; // 不明なコドンは ? にする
    }
  
    return aminoAcidSeq;
  }
  