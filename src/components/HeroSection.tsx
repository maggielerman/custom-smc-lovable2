import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const HeroSection = () => {
  const { user } = useAuth();
  
  return (
    <div className="relative overflow-hidden bg-[var(--cream)] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-[var(--navy)]">
              Beautiful books for <span className="text-[var(--blush)]">beautiful stories</span>
            </h1>
            <p className="max-w-[600px] text-[var(--charcoal)] md:text-xl">
              Create personalized children's books that explain donor conception with warmth, 
              honesty, and age-appropriate illustrations. Help your child understand their 
              unique story in a way that celebrates love and family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {user ? (
                <Link to="/customize/">
                  <Button size="lg" className="h-12 px-8 bg-[var(--navy)] text-white hover:bg-[var(--blush)] hover:text-[var(--navy)]">Start Creating Book</Button>
                </Link>
              ) : (
                <Link to="/login" state={{ from: "/customize/" }}>
                  <Button size="lg" className="h-12 px-8 bg-[var(--navy)] text-white hover:bg-[var(--blush)] hover:text-[var(--navy)]">Start Creating Book</Button>
                </Link>
              )}
              <Link to="/how-it-works">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-12 px-8 border-[var(--navy)] text-[var(--navy)] hover:bg-[var(--mint)] hover:text-[var(--navy)]"
                >
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -bottom-6 -right-6 h-48 w-48 bg-[var(--mint)] rounded-full opacity-40 blur-2xl"></div>
            <div className="absolute -top-6 -left-6 h-48 w-48 bg-[var(--blush)] rounded-full opacity-40 blur-2xl"></div>
            
            <div className="relative p-4 bg-white rounded-xl shadow-lg rotate-3 z-10">
              <img
                alt="Example of a customized children's book about donor conception"
                className="w-full h-auto object-cover rounded-lg"
                src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=2530&ixlib=rb-4.0.3"
                width={500}
                height={350}
              />
            </div>
            <div className="absolute top-12 right-8 bg-white p-4 rounded-lg shadow-lg -rotate-6 z-0">
              <img
                alt="A child reading a custom story book"
                className="w-full h-auto object-cover rounded"
                src="https://images.unsplash.com/photo-1598354473594-9e06d383136a?auto=format&fit=crop&q=80&w=2376&ixlib=rb-4.0.3"
                width={300}
                height={200}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
