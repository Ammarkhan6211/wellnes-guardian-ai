export interface DiseaseCode {
  icd11: string;
  namaste: string;
}

export const DISEASE_CODE_MAPPING: Record<string, DiseaseCode> = {
  "diabetes": {
    icd11: "5A11",
    namaste: "AYU123"
  },
  "hypertension": {
    icd11: "BA00", 
    namaste: "AYU456"
  },
  "asthma": {
    icd11: "CA23",
    namaste: "AYU789"
  },
  "heart disease": {
    icd11: "BA40",
    namaste: "AYU321"
  },
  "arthritis": {
    icd11: "FA12",
    namaste: "AYU654"
  },
  "depression": {
    icd11: "MB20",
    namaste: "AYU987"
  }
};

export const DISEASE_MEDICINE_MAPPING: Record<string, string[]> = {
  "diabetes": ["Metformin", "Insulin", "Glipizide"],
  "hypertension": ["Amlodipine", "Losartan", "Lisinopril"],
  "asthma": ["Salbutamol", "Budesonide", "Montelukast"],
  "heart disease": ["Aspirin", "Atorvastatin", "Metoprolol"],
  "arthritis": ["Ibuprofen", "Methotrexate", "Prednisone"],
  "depression": ["Sertraline", "Fluoxetine", "Escitalopram"]
};

export const DISEASES = Object.keys(DISEASE_CODE_MAPPING);

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