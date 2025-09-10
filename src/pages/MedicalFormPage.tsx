import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useAppContext, MedicalInfo } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { findDiseaseCode, DISEASES, DISEASE_MEDICINE_MAPPING } from '@/utils/diseaseCodeMapping';

const MedicalFormPage = () => {
  const navigate = useNavigate();
  const { userData, setMedicalInfo, setMappedCodes } = useAppContext();
  const { toast } = useToast();
  
  const [selectedDisease, setSelectedDisease] = useState<string>('');
  const [selectedMedicines, setSelectedMedicines] = useState<string[]>([]);

  const handleMedicineChange = (medicine: string, checked: boolean) => {
    if (checked) {
      setSelectedMedicines(prev => [...prev, medicine]);
    } else {
      setSelectedMedicines(prev => prev.filter(m => m !== medicine));
    }
  };

  const onSubmit = () => {
    if (!selectedDisease) {
      toast({
        title: "Error",
        description: "Please select a disease",
        variant: "destructive"
      });
      return;
    }

    if (selectedMedicines.length === 0) {
      toast({
        title: "Error", 
        description: "Please select at least one medicine",
        variant: "destructive"
      });
      return;
    }

    const medicalInfo: MedicalInfo = {
      selectedDisease,
      selectedMedicines
    };
    
    setMedicalInfo(medicalInfo);
    
    // Map disease to ICD-11 and NAMASTE codes
    const codes = findDiseaseCode(selectedDisease);
    if (codes) {
      setMappedCodes(codes);
    }
    
    toast({
      title: "Medical Information Saved",
      description: "Redirecting to your dashboard...",
    });
    
    navigate('/dashboard');
  };

  if (!userData) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-health-50 to-health-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-health-800">Medical Information</CardTitle>
          <CardDescription>
            Welcome {userData.name}! Please provide your medical details for better care.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Disease</label>
              <Select value={selectedDisease} onValueChange={setSelectedDisease}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your condition..." />
                </SelectTrigger>
                <SelectContent>
                  {DISEASES.map((disease) => (
                    <SelectItem key={disease} value={disease}>
                      {disease.charAt(0).toUpperCase() + disease.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedDisease && (
              <div className="space-y-3">
                <label className="text-sm font-medium">Select Current Medicines</label>
                <div className="grid grid-cols-1 gap-3">
                  {DISEASE_MEDICINE_MAPPING[selectedDisease]?.map((medicine) => (
                    <div key={medicine} className="flex items-center space-x-2">
                      <Checkbox
                        id={medicine}
                        checked={selectedMedicines.includes(medicine)}
                        onCheckedChange={(checked) => handleMedicineChange(medicine, !!checked)}
                      />
                      <label
                        htmlFor={medicine}
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {medicine}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <Button 
              onClick={onSubmit} 
              className="w-full"
              disabled={!selectedDisease || selectedMedicines.length === 0}
            >
              Save and Continue to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalFormPage;