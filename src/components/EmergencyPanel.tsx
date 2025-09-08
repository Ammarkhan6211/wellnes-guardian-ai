import { Phone, MapPin, Users, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const EmergencyPanel = () => {
  const emergencyContacts = [
    { name: "Dr. Sarah Johnson", relation: "Primary Care", phone: "(555) 0123" },
    { name: "Mom", relation: "Emergency Contact", phone: "(555) 0124" },
    { name: "John (Spouse)", relation: "Emergency Contact", phone: "(555) 0125" }
  ];

  return (
    <Card className="border-2 border-alert-red/20 bg-alert-red/5">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-alert-red">
          <Shield className="h-5 w-5" />
          <span>Emergency Features</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-alert-red/30 bg-alert-red/10">
          <MapPin className="h-4 w-4" />
          <AlertDescription className="font-medium">
            Location sharing is enabled for emergency contacts
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button variant="destructive" className="h-12 text-base font-semibold">
            <Phone className="h-5 w-5 mr-2" />
            Call 911
          </Button>
          
          <Button variant="outline" className="h-12 border-alert-red text-alert-red hover:bg-alert-red hover:text-white">
            <Users className="h-5 w-5 mr-2" />
            Alert Family
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Quick Contacts</h4>
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded border bg-card/50">
              <div>
                <p className="font-medium text-sm">{contact.name}</p>
                <p className="text-xs text-muted-foreground">{contact.relation}</p>
              </div>
              <Button size="sm" variant="ghost" className="text-primary">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full">
          <MapPin className="h-4 w-4 mr-2" />
          Share Location
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmergencyPanel;