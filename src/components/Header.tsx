import { Bell, User, Menu, Phone, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Menu className="h-6 w-6 text-muted-foreground md:hidden" />
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold text-foreground">MedCare</h1>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#dashboard" className="text-sm font-medium text-primary">Dashboard</a>
            <a href="#medicine" className="text-sm font-medium text-muted-foreground hover:text-foreground">Medicines</a>
            <a href="#food" className="text-sm font-medium text-muted-foreground hover:text-foreground">Food Tracker</a>
            <a href="#doctors" className="text-sm font-medium text-muted-foreground hover:text-foreground">My Doctors</a>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative">
              <Phone className="h-5 w-5" />
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                !
              </Badge>
            </Button>
            
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge variant="secondary" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>

            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;