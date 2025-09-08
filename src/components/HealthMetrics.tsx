import { Heart, Activity, Thermometer, Scale } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const HealthMetrics = () => {
  const metrics = [
    {
      title: "Heart Rate",
      value: "72",
      unit: "bpm",
      status: "good",
      icon: Heart,
      progress: 75,
      target: "60-100 bpm"
    },
    {
      title: "Blood Pressure",
      value: "118/76", 
      unit: "mmHg",
      status: "good",
      icon: Activity,
      progress: 85,
      target: "<120/80 mmHg"
    },
    {
      title: "Temperature",
      value: "98.6",
      unit: "°F",
      status: "good", 
      icon: Thermometer,
      progress: 90,
      target: "98.6°F normal"
    },
    {
      title: "Weight",
      value: "165",
      unit: "lbs",
      status: "warning",
      icon: Scale,
      progress: 60,
      target: "160 lbs goal"
    }
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "good":
        return "text-health-good border-health-good/20 bg-health-good/5";
      case "warning":
        return "text-health-warning border-health-warning/20 bg-health-warning/5";
      case "critical":
        return "text-health-critical border-health-critical/20 bg-health-critical/5";
      default:
        return "text-muted-foreground border-border bg-muted/5";
    }
  };

  const getProgressStyle = (status: string) => {
    switch (status) {
      case "good":
        return "bg-health-good";
      case "warning":
        return "bg-health-warning";
      case "critical":
        return "bg-health-critical";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className={`border-2 transition-all hover:shadow-lg ${getStatusStyle(metric.status)}`}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-sm font-medium">
                <span>{metric.title}</span>
                <Icon className="h-4 w-4" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{metric.progress}%</span>
                  </div>
                  <Progress value={metric.progress} className="h-2" />
                </div>
                <p className="text-xs text-muted-foreground">{metric.target}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default HealthMetrics;