import { Clock, Pill, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MedicineReminders = () => {
  const medications = [
    {
      name: "Metformin",
      dosage: "500mg",
      time: "8:00 AM",
      status: "pending",
      type: "Diabetes",
      nextDose: "2 hours"
    },
    {
      name: "Lisinopril",
      dosage: "10mg", 
      time: "12:00 PM",
      status: "taken",
      type: "Blood Pressure",
      nextDose: "8 hours"
    },
    {
      name: "Vitamin D3",
      dosage: "1000 IU",
      time: "6:00 PM",
      status: "upcoming",
      type: "Supplement",
      nextDose: "10 hours"
    },
    {
      name: "Aspirin",
      dosage: "81mg",
      time: "9:00 PM",
      status: "missed",
      type: "Heart Health",
      nextDose: "overdue"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "taken":
        return <Badge variant="secondary" className="bg-health-good/10 text-health-good border-health-good/20">Taken</Badge>;
      case "pending":
        return <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">Due Now</Badge>;
      case "upcoming":
        return <Badge variant="outline">Upcoming</Badge>;
      case "missed":
        return <Badge variant="destructive">Missed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "taken":
        return <CheckCircle className="h-4 w-4 text-health-good" />;
      case "pending":
        return <Clock className="h-4 w-4 text-primary" />;
      case "upcoming":
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      case "missed":
        return <AlertCircle className="h-4 w-4 text-health-critical" />;
      default:
        return <Pill className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Pill className="h-5 w-5 text-primary" />
          <span>Medicine Reminders</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medications.map((med, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3">
                {getStatusIcon(med.status)}
                <div>
                  <h4 className="font-medium">{med.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {med.dosage} • {med.type} • {med.time}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium">Next in {med.nextDose}</p>
                  {getStatusBadge(med.status)}
                </div>
                
                {med.status === "pending" && (
                  <Button size="sm" variant="outline">
                    Mark Taken
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <Button className="w-full" variant="outline">
            <Pill className="h-4 w-4 mr-2" />
            Manage Medications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicineReminders;