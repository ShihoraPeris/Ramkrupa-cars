import { Car } from "@/types/car";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Calendar, Gauge, Cog, Edit, Trash2 } from "lucide-react";

interface CarCardProps {
  car: Car;
  onAddToCart: (car: Car) => void;
  onEdit?: (car: Car) => void;
  onDelete?: (carId: string) => void;
  isAdmin?: boolean;
}

export const CarCard = ({ car, onAddToCart, onEdit, onDelete, isAdmin = false }: CarCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={car.images[0]} 
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-64 object-cover"
        />
        <Badge 
          variant={car.condition === 'Excellent' ? 'default' : 'secondary'}
          className="absolute top-4 left-4"
        >
          {car.condition}
        </Badge>
      </div>

      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-primary">
            {car.year} {car.make} {car.model}
          </h3>
          <span className="text-2xl font-bold text-accent">
            ${car.price.toLocaleString()}
          </span>
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-2">
          {car.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            <span>{car.mileage.toLocaleString()} miles</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Cog className="h-4 w-4 text-muted-foreground" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{car.contactNumber}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {car.features.slice(0, 3).map((feature, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
          {car.features.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{car.features.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        {isAdmin ? (
          <div className="flex w-full space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEdit?.(car)}
              className="flex-1"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => onDelete?.(car.id)}
              className="flex-1"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        ) : (
          <Button 
            variant="hero" 
            className="w-full" 
            onClick={() => onAddToCart(car)}
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};