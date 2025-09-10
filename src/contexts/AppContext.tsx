import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface UserData {
  name: string;
  email: string;
  contactNumber: string;
  alternativeContactNumber: string;
}

export interface MedicalInfo {
  diseaseDetails: string;
  medicines: string;
}

export interface MappedCodes {
  icd11: string;
  namaste: string;
}

interface AppContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  medicalInfo: MedicalInfo | null;
  setMedicalInfo: (info: MedicalInfo) => void;
  mappedCodes: MappedCodes | null;
  setMappedCodes: (codes: MappedCodes) => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [medicalInfo, setMedicalInfo] = useState<MedicalInfo | null>(null);
  const [mappedCodes, setMappedCodes] = useState<MappedCodes | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setMedicalInfo(null);
    setMappedCodes(null);
  };

  return (
    <AppContext.Provider
      value={{
        userData,
        setUserData,
        medicalInfo,
        setMedicalInfo,
        mappedCodes,
        setMappedCodes,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};