import { useState } from "react";
import { Car } from "@/types/car";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface AdminPanelProps {
  onAddCar: (car: Omit<Car, 'id'>) => void;
}

export const AdminPanel = ({ onAddCar }: AdminPanelProps) => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    condition: 'Good' as Car['condition'],
    description: '',
    images: [''],
    contactNumber: '',
    features: [''],
    engineType: '',
    transmission: 'Manual' as Car['transmission'],
    exteriorColor: '',
    interiorColor: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.make || !formData.model || !formData.contactNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newCar: Omit<Car, 'id'> = {
      ...formData,
      images: formData.images.filter(img => img.trim() !== ''),
      features: formData.features.filter(feature => feature.trim() !== ''),
    };

    onAddCar(newCar);
    
    // Reset form
    setFormData({
      make: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      condition: 'Good',
      description: '',
      images: [''],
      contactNumber: '',
      features: [''],
      engineType: '',
      transmission: 'Manual',
      exteriorColor: '',
      interiorColor: '',
    });

    toast.success("Car added successfully!");
  };

  const addImageField = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const updateImage = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const addFeatureField = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-6 w-6" />
            <span>Add New Car</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="make">Make *</Label>
                <Input
                  id="make"
                  value={formData.make}
                  onChange={(e) => setFormData(prev => ({ ...prev, make: e.target.value }))}
                  placeholder="Ferrari, Porsche, etc."
                  required
                />
              </div>
              <div>
                <Label htmlFor="model">Model *</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                  placeholder="911, F40, etc."
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="mileage">Mileage</Label>
                <Input
                  id="mileage"
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => setFormData(prev => ({ ...prev, mileage: parseInt(e.target.value) }))}
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="condition">Condition</Label>
                <Select value={formData.condition} onValueChange={(value: Car['condition']) => 
                  setFormData(prev => ({ ...prev, condition: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Needs Work">Needs Work</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="transmission">Transmission</Label>
                <Select value={formData.transmission} onValueChange={(value: Car['transmission']) => 
                  setFormData(prev => ({ ...prev, transmission: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manual">Manual</SelectItem>
                    <SelectItem value="Automatic">Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the car's history, condition, and unique features..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactNumber">Contact Number *</Label>
                <Input
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactNumber: e.target.value }))}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
              <div>
                <Label htmlFor="engineType">Engine Type</Label>
                <Input
                  id="engineType"
                  value={formData.engineType}
                  onChange={(e) => setFormData(prev => ({ ...prev, engineType: e.target.value }))}
                  placeholder="V8, V6, etc."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="exteriorColor">Exterior Color</Label>
                <Input
                  id="exteriorColor"
                  value={formData.exteriorColor}
                  onChange={(e) => setFormData(prev => ({ ...prev, exteriorColor: e.target.value }))}
                  placeholder="Red, Blue, etc."
                />
              </div>
              <div>
                <Label htmlFor="interiorColor">Interior Color</Label>
                <Input
                  id="interiorColor"
                  value={formData.interiorColor}
                  onChange={(e) => setFormData(prev => ({ ...prev, interiorColor: e.target.value }))}
                  placeholder="Black, Tan, etc."
                />
              </div>
            </div>

            <div>
              <Label>Car Images</Label>
              {formData.images.map((image, index) => (
                <div key={index} className="flex space-x-2 mt-2">
                  <Input
                    value={image}
                    onChange={(e) => updateImage(index, e.target.value)}
                    placeholder="Image URL"
                    className="flex-1"
                  />
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addImageField} className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Image
              </Button>
            </div>

            <div>
              <Label>Features</Label>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex space-x-2 mt-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder="e.g., Leather Seats, Sunroof, etc."
                    className="flex-1"
                  />
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addFeatureField} className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full">
              Add Car to Inventory
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};