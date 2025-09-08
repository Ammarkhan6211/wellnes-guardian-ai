import { Apple, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const FoodTracker = () => {
  const recentMeals = [
    {
      name: "Greek Yogurt with Berries",
      time: "8:30 AM",
      sugarLevel: "low",
      carbs: "15g",
      calories: "120"
    },
    {
      name: "Grilled Chicken Salad", 
      time: "12:45 PM",
      sugarLevel: "low",
      carbs: "8g",
      calories: "285"
    },
    {
      name: "Apple & Almonds",
      time: "3:15 PM",
      sugarLevel: "medium",
      carbs: "22g", 
      calories: "160"
    },
    {
      name: "Pasta with Marinara",
      time: "7:00 PM",
      sugarLevel: "high",
      carbs: "45g",
      calories: "340"
    }
  ];

  const getSugarAlert = (level: string) => {
    switch (level) {
      case "low":
        return { 
          badge: <Badge className="bg-health-good/10 text-health-good border-health-good/20">Low Sugar</Badge>,
          icon: <CheckCircle className="h-4 w-4 text-health-good" />
        };
      case "medium":
        return {
          badge: <Badge className="bg-health-warning/10 text-health-warning border-health-warning/20">Medium Sugar</Badge>,
          icon: <AlertTriangle className="h-4 w-4 text-health-warning" />
        };
      case "high":
        return {
          badge: <Badge className="bg-health-critical/10 text-health-critical border-health-critical/20">High Sugar</Badge>,
          icon: <AlertTriangle className="h-4 w-4 text-health-critical" />
        };
      default:
        return {
          badge: <Badge variant="outline">Unknown</Badge>,
          icon: <Apple className="h-4 w-4 text-muted-foreground" />
        };
    }
  };

  const dailyTargets = {
    calories: { current: 905, target: 2000 },
    carbs: { current: 90, target: 150 },
    sugar: { current: 25, target: 50 }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Apple className="h-5 w-5 text-primary" />
          <span>Food & Sugar Tracker</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Daily Progress */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Calories</span>
                <span>{dailyTargets.calories.current}/{dailyTargets.calories.target}</span>
              </div>
              <Progress value={(dailyTargets.calories.current / dailyTargets.calories.target) * 100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Carbs (g)</span>
                <span>{dailyTargets.carbs.current}/{dailyTargets.carbs.target}</span>
              </div>
              <Progress value={(dailyTargets.carbs.current / dailyTargets.carbs.target) * 100} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sugar (g)</span>
                <span>{dailyTargets.sugar.current}/{dailyTargets.sugar.target}</span>
              </div>
              <Progress value={(dailyTargets.sugar.current / dailyTargets.sugar.target) * 100} className="h-2" />
            </div>
          </div>

          {/* Recent Meals */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Recent Meals</h4>
            {recentMeals.map((meal, index) => {
              const sugarAlert = getSugarAlert(meal.sugarLevel);
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    {sugarAlert.icon}
                    <div>
                      <h5 className="font-medium">{meal.name}</h5>
                      <p className="text-sm text-muted-foreground">
                        {meal.time} • {meal.carbs} carbs • {meal.calories} cal
                      </p>
                    </div>
                  </div>
                  {sugarAlert.badge}
                </div>
              );
            })}
          </div>

          <div className="flex space-x-2">
            <Button className="flex-1" variant="outline">
              <Apple className="h-4 w-4 mr-2" />
              Log Food
            </Button>
            <Button className="flex-1" variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Trends
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodTracker;