import { ShoppingCart, Car, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartCount: number;
  isAdmin: boolean;
  onToggleAdmin: () => void;
}

export const Header = ({ cartCount, isAdmin, onToggleAdmin }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Car className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary">Ramkrupa cars</h1>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#cars"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Cars
          </a>
          <a
            href="#about"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleAdmin}
            className="flex items-center space-x-2"
          >
            {isAdmin ? (
              <Shield className="h-4 w-4" />
            ) : (
              <User className="h-4 w-4" />
            )}
            <span>{isAdmin ? "Admin" : "User"}</span>
          </Button>

          <Button variant="outline" size="sm" className="relative">
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {cartCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
