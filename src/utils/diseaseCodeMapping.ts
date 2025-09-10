export interface DiseaseCode {
  icd11: string;
  namaste: string;
}

export const DISEASE_CODE_MAPPING: Record<string, DiseaseCode> = {
  diabetes: {
    icd11: "5A11",
    namaste: "AYU123"
  },
  hypertension: {
    icd11: "BA00", 
    namaste: "AYU456"
  },
  asthma: {
    icd11: "CA23",
    namaste: "AYU789"
  },
  "high blood pressure": {
    icd11: "BA00",
    namaste: "AYU456"
  },
  "type 2 diabetes": {
    icd11: "5A11",
    namaste: "AYU123"
  },
  "bronchial asthma": {
    icd11: "CA23",
    namaste: "AYU789"
  }
};

export const findDiseaseCode = (diseaseText: string): DiseaseCode | null => {
  const normalizedText = diseaseText.toLowerCase().trim();
  
  // Direct match
  if (DISEASE_CODE_MAPPING[normalizedText]) {
    return DISEASE_CODE_MAPPING[normalizedText];
  }
  
  // Partial match
  for (const [disease, codes] of Object.entries(DISEASE_CODE_MAPPING)) {
    if (normalizedText.includes(disease) || disease.includes(normalizedText)) {
      return codes;
    }
  }
  
  return null;
};