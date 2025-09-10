import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAppContext, MedicalInfo } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { findDiseaseCode } from '@/utils/diseaseCodeMapping';

const medicalSchema = z.object({
  diseaseDetails: z.string().min(5, 'Please provide more details about your condition'),
  medicines: z.string().min(3, 'Please list your current medicines'),
});

type MedicalFormData = z.infer<typeof medicalSchema>;

const MedicalFormPage = () => {
  const navigate = useNavigate();
  const { userData, setMedicalInfo, setMappedCodes } = useAppContext();
  const { toast } = useToast();

  const form = useForm<MedicalFormData>({
    resolver: zodResolver(medicalSchema),
    defaultValues: {
      diseaseDetails: '',
      medicines: '',
    },
  });

  const onSubmit = (data: MedicalFormData) => {
    setMedicalInfo(data as MedicalInfo);
    
    // Map disease to ICD-11 and NAMASTE codes
    const codes = findDiseaseCode(data.diseaseDetails);
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="diseaseDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Disease Details</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your current medical condition(s) - e.g., diabetes, hypertension, asthma..."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="medicines"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Medicines</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="List all medicines you are currently taking (name, dosage, frequency)..."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                Save and Continue to Dashboard
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalFormPage;