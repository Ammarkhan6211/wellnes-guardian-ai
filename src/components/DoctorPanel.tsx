import { UserCheck, Calendar, MessageCircle, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DoctorPanel = () => {
  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Primary Care",
      rating: 4.9,
      nextAppointment: "Dec 15, 2:30 PM",
      status: "available",
      avatar: "/placeholder.svg"
    },
    {
      name: "Dr. Michael Chen", 
      specialty: "Cardiology",
      rating: 4.8,
      nextAppointment: "Dec 20, 10:00 AM", 
      status: "busy",
      avatar: "/placeholder.svg"
    },
    {
      name: "Dr. Emily Davis",
      specialty: "Endocrinology",
      rating: 4.7,
      nextAppointment: "Jan 3, 11:15 AM",
      status: "available", 
      avatar: "/placeholder.svg"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-health-good/10 text-health-good border-health-good/20">Available</Badge>;
      case "busy":
        return <Badge className="bg-health-warning/10 text-health-warning border-health-warning/20">Busy</Badge>;
      default:
        return <Badge variant="outline">Offline</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <UserCheck className="h-5 w-5 text-primary" />
          <span>Your Doctors</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {doctors.map((doctor, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={doctor.avatar} alt={doctor.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h4 className="font-medium">{doctor.name}</h4>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-current text-yellow-500" />
                      <span className="text-xs">{doctor.rating}</span>
                    </div>
                    {getStatusBadge(doctor.status)}
                  </div>
                </div>
              </div>
              
              <div className="text-right space-y-2">
                <p className="text-sm font-medium">Next: {doctor.nextAppointment}</p>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <Button className="w-full" variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Book New Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorPanel;