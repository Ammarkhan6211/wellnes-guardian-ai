import HealthMetrics from "@/components/HealthMetrics";
import MedicineReminders from "@/components/MedicineReminders";
import EmergencyPanel from "@/components/EmergencyPanel";
import FoodTracker from "@/components/FoodTracker";
import DoctorPanel from "@/components/DoctorPanel";
import heroImage from "@/assets/medical-hero.jpg";

const Index = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative mb-12 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-10" />
        <img 
          src={heroImage} 
          alt="Medical Dashboard" 
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
          <div className="text-white space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">MedCare Dashboard</h1>
            <p className="text-xl md:text-2xl opacity-90">Your health, managed intelligently</p>
          </div>
        </div>
      </section>

      {/* Health Metrics */}
      <section id="dashboard" className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Health Overview</h2>
        <HealthMetrics />
      </section>

      {/* Medicine & Emergency Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <section id="medicine">
          <MedicineReminders />
        </section>
        
        <section>
          <EmergencyPanel />
        </section>
      </div>

      {/* Food & Doctors Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section id="food">
          <FoodTracker />
        </section>
        
        <section id="doctors">
          <DoctorPanel />
        </section>
      </div>
    </main>
  );
};

export default Index;
