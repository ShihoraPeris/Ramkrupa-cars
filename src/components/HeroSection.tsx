// import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-cars.jpg";

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60" />

      <div className="relative z-10 text-center text-[#dfa8a8] max-w-4xl mx-auto px-4">
        <h1 className="text-2xl md:text-6xl font-bold mb-4 text-nowrap text-white">
          Welcome to ramkrupa car world
        </h1>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Classic Cars
          <span className="block text-accent">Redefined</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
          Discover timeless automotive excellence. From vintage muscle cars to
          elegant classics, find your perfect piece of automotive history.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* <Button variant="hero" size="xl">
            Browse Collection
          </Button>
          <Button variant="accent" size="xl">
            Sell Your Classic
          </Button> */}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
