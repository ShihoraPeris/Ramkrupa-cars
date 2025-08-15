import { useState } from "react";
import { Car, CartItem } from "@/types/car";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CarGrid } from "@/components/CarGrid";
import { AdminPanel } from "@/components/AdminPanel";
import { sampleCars } from "@/data/sampleCars";
import { toast } from "sonner";

const Index = () => {
  const [cars, setCars] = useState<Car[]>(sampleCars);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAddToCart = (car: Car) => {
    const existingItem = cart.find(item => item.car.id === car.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.car.id === car.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      toast.success(`Updated ${car.make} ${car.model} quantity in cart`);
    } else {
      setCart([...cart, { car, quantity: 1 }]);
      toast.success(`Added ${car.make} ${car.model} to cart`);
    }
  };

  const handleAddCar = (newCarData: Omit<Car, 'id'>) => {
    const newCar: Car = {
      ...newCarData,
      id: Date.now().toString(),
    };
    setCars([newCar, ...cars]);
  };

  const handleEditCar = (car: Car) => {
    // For demo purposes, we'll just show a toast
    toast.info(`Edit functionality for ${car.make} ${car.model} would open here`);
  };

  const handleDeleteCar = (carId: string) => {
    setCars(cars.filter(car => car.id !== carId));
    toast.success("Car deleted successfully");
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartCount={cartCount}
        isAdmin={isAdmin}
        onToggleAdmin={() => setIsAdmin(!isAdmin)}
      />
      
      {!isAdmin && <HeroSection />}
      
      <section id="cars" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              {isAdmin ? "Manage Inventory" : "Featured Classics"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {isAdmin 
                ? "Add, edit, or remove cars from your inventory" 
                : "Discover our curated collection of exceptional classic automobiles"
              }
            </p>
          </div>

          {isAdmin ? (
            <div className="space-y-12">
              <AdminPanel onAddCar={handleAddCar} />
              <div>
                <h3 className="text-2xl font-bold text-primary mb-6">Current Inventory</h3>
                <CarGrid 
                  cars={cars}
                  onAddToCart={handleAddToCart}
                  onEdit={handleEditCar}
                  onDelete={handleDeleteCar}
                  isAdmin={true}
                />
              </div>
            </div>
          ) : (
            <CarGrid 
              cars={cars}
              onAddToCart={handleAddToCart}
              isAdmin={false}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
