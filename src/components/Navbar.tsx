
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">DonorBookies</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/how-it-works" className="text-gray-600 hover:text-primary transition-colors">
            How It Works
          </Link>
          <Link to="/book-types" className="text-gray-600 hover:text-primary transition-colors">
            Book Types
          </Link>
          <Link to="/pricing" className="text-gray-600 hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link to="/faq" className="text-gray-600 hover:text-primary transition-colors">
            FAQ
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline">My Books</Button>
              </Link>
              <Button onClick={() => signOut()}>Sign Out</Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col space-y-4 mt-8">
              <Link
                to="/how-it-works"
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </Link>
              <Link
                to="/book-types"
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                Book Types
              </Link>
              <Link
                to="/pricing"
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                to="/faq"
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    My Books
                  </Link>
                  <Button onClick={() => { signOut(); setIsOpen(false); }}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
