import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Users, Palette, Image, Zap, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  {
    title: "Choose a Book Template",
    description: "Select from our range of expertly designed book templates created for different donor conception journeys.",
    icon: <BookOpen className="h-10 w-10 text-primary" />,
  },
  {
    title: "Customize Your Family",
    description: "Tell us about your family structure and add the names and roles of everyone who will appear in the story.",
    icon: <Users className="h-10 w-10 text-primary" />,
  },
  {
    title: "Personalize for Your Child",
    description: "Add your child's name and customize their character to look just like them.",
    icon: <Palette className="h-10 w-10 text-primary" />,
  },
  {
    title: "Customize Illustrations",
    description: "Choose colors, scenes, and styles to make the book uniquely yours.",
    icon: <Image className="h-10 w-10 text-primary" />,
  },
  {
    title: "Preview & Publish",
    description: "Review your creation, add a special dedication, and order your personalized book.",
    icon: <Zap className="h-10 w-10 text-primary" />,
  },
];

const features = [
  "Age-appropriate language for donor conception",
  "Beautiful, diverse illustrations",
  "Expert-reviewed content",
  "Customizable characters and story details",
  "High-quality hardcover printing",
  "Digital copy included with every order",
];

const HowItWorksPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-primary/10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                How to Create Your Personalized Book
              </h1>
              <p className="text-xl mb-8 text-muted-foreground">
                Our simple step-by-step process makes it easy to create a beautiful, 
                personalized book that tells your family's unique story.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link to="/customize/">Start Creating</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <a href="#customization-process">Learn More</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Steps section */}
        <section className="py-16 md:py-24" id="customization-process">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">
              The Customization Process
            </h2>

            <div className="space-y-20 max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div 
                  key={step.title} 
                  className="flex flex-col md:flex-row md:items-start gap-8"
                >
                  <div className="flex-shrink-0 flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="relative">
                        {step.icon}
                        <div className="absolute -top-2 -right-2 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-lg text-muted-foreground mb-4">
                      {step.description}
                    </p>
                    
                    {index === 0 && (
                      <div className="bg-muted rounded-lg p-6 mt-4">
                        <h4 className="font-semibold mb-3">Available Book Templates:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Donor Egg Story
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Donor Sperm Story
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Donor Embryo Story
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            IVF Journey Story
                          </li>
                        </ul>
                      </div>
                    )}

                    {index === 1 && (
                      <div className="bg-muted rounded-lg p-6 mt-4">
                        <h4 className="font-semibold mb-3">Supported Family Structures:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Two Parents
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Single Mom by Choice
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Single Dad by Choice
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Two Moms
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Two Dads
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            Grandparent(s) as Guardian
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Every Book Includes</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our books are thoughtfully designed to help families talk about donor conception 
                in a way that's accurate, age-appropriate, and filled with love.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-lg shadow-sm flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild size="lg">
                <Link to="/customize/">Create Your Book</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials preview */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Families Say</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hear from families who have used our books to talk about donor conception with their children.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="italic mb-4">
                  "This book has been such a wonderful tool for explaining to our daughter how she came to be. 
                  The illustrations are beautiful and the story is perfect for her age."
                </p>
                <p className="font-medium">— Sarah T., mom of 4-year-old</p>
              </div>
              
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="italic mb-4">
                  "As two dads, we were looking for a way to talk to our son about his origins. 
                  This book made it easy and natural. He loves that he's the star of the story!"
                </p>
                <p className="font-medium">— James and Michael, dads of 3-year-old</p>
              </div>
              
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="italic mb-4">
                  "The customization options are fantastic. Being able to include all our family members 
                  and match the illustrations to how we look made this book extra special."
                </p>
                <p className="font-medium">— Lisa M., single mom by choice</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Create Your Family's Story?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Start your personalized journey today and create a book your family will treasure for years to come.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link to="/customize/">Start Creating Now</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
