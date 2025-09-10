import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppContext } from '@/contexts/AppContext';
import { User, Phone, Mail, FileText, Pill, Code, LogOut } from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { userData, medicalInfo, mappedCodes, logout } = useAppContext();

  if (!userData || !medicalInfo) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">MedTech Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {userData.name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* User Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{userData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{userData.contactNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Alt: {userData.alternativeContactNumber}</span>
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Selected Disease</h4>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {medicalInfo.selectedDisease.charAt(0).toUpperCase() + medicalInfo.selectedDisease.slice(1)}
                </Badge>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                  <Pill className="h-4 w-4" />
                  Current Medicines
                </h4>
                <div className="flex flex-wrap gap-2">
                  {medicalInfo.selectedMedicines.map((medicine, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {medicine}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ICD-11 & NAMASTE Codes */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Medical Code Mapping
              </CardTitle>
              <CardDescription>
                Standardized medical codes for your condition (ICD-11 & NAMASTE Traditional Medicine)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {mappedCodes ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">ICD-11 Code</h4>
                    <Badge variant="secondary" className="text-sm px-3 py-1">
                      {mappedCodes.icd11}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      International Classification of Diseases (11th Revision)
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">NAMASTE Code</h4>
                    <Badge variant="outline" className="text-sm px-3 py-1">
                      {mappedCodes.namaste}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      National AYUSH Morbidity and Standardized Terminologies Electronic
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Badge variant="destructive" className="text-sm">
                    Code not available (demo only)
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-2">
                    No matching codes found in our demo database for the entered condition.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Button variant="outline" size="sm">Schedule Appointment</Button>
              <Button variant="outline" size="sm">Update Medical Info</Button>
              <Button variant="outline" size="sm">Download Report</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;