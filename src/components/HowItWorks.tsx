
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "1. Choose Your Template",
    description:
      "Select from our range of beautifully illustrated book templates designed specifically for different donor conception journeys.",
    image: "https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&q=80&w=2648&ixlib=rb-4.0.3",
  },
  {
    title: "2. Personalize Your Story",
    description:
      "Add your child's name, customize characters to resemble your family, and adjust the narrative to match your unique journey.",
    image: "https://images.unsplash.com/photo-1600880292630-ee8a00403024?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
  },
  {
    title: "3. Review & Edit",
    description:
      "Preview your book and make any adjustments needed to ensure it perfectly reflects your family's story.",
    image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?auto=format&fit=crop&q=80&w=2673&ixlib=rb-4.0.3",
  },
  {
    title: "4. Receive Your Book",
    description:
      "We'll print and ship your high-quality hardcover book, ready to become a treasured part of your family's story.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=2672&ixlib=rb-4.0.3",
  },
];

const features = [
  "Age-appropriate language and concepts",
  "Beautiful, diverse illustrations",
  "Expert-reviewed content",
  "Customizable characters and story details",
  "High-quality hardcover printing",
  "Digital copy included with every order",
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white" id="how-it-works">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 md:text-lg">
            Creating your personalized donor conception storybook is simple,
            quick, and meaningful.
          </p>
        </div>

        <div className="grid gap-12 md:gap-y-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`grid gap-8 items-center ${
                index % 2 === 0 ? "md:grid-cols-[3fr,2fr]" : "md:grid-cols-[2fr,3fr] md:grid-flow-dense"
              }`}
            >
              <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                <h3 className="text-2xl font-bold text-primary">{step.title}</h3>
                <p className="mt-4 text-gray-600 md:text-lg">{step.description}</p>
              </div>
              <div
                className={`rounded-xl overflow-hidden shadow-lg ${
                  index % 2 === 1 ? "md:col-start-1" : ""
                }`}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-primary-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Every Book Includes
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link to="/how-it-works">
              <Button size="lg">Learn More About the Process</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
