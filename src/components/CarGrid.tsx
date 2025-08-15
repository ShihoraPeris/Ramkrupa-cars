import { Car } from "@/types/car";
import { CarCard } from "./CarCard";

interface CarGridProps {
  cars: Car[];
  onAddToCart: (car: Car) => void;
  onEdit?: (car: Car) => void;
  onDelete?: (carId: string) => void;
  isAdmin?: boolean;
}

export const CarGrid = ({ cars, onAddToCart, onEdit, onDelete, isAdmin = false }: CarGridProps) => {
  if (cars.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-semibold text-muted-foreground mb-4">
          No cars available
        </h3>
        <p className="text-muted-foreground">
          {isAdmin ? "Add your first car to get started." : "Check back soon for new arrivals."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          onAddToCart={onAddToCart}
          onEdit={onEdit}
          onDelete={onDelete}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};