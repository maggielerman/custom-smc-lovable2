
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    quote: "This book has been a game-changer for our family. Our 4-year-old loves her personalized story and it's made explaining her donor conception journey so much easier.",
    author: "Sarah T.",
    role: "Mother of two",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=2564&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    quote: "As a psychologist specializing in family formation, I recommend DonorBookies to all my clients. The books are not only beautiful but developmentally appropriate.",
    author: "Dr. Michael Chen",
    role: "Child Psychologist",
    avatar: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&q=80&w=2942&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    quote: "The ability to customize the story to match our family's specific journey made all the difference. Our son carries his book everywhere!",
    author: "James & David",
    role: "Parents through donor conception",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=2671&ixlib=rb-4.0.3"
  },
  {
    id: 4,
    quote: "I was nervous about explaining donor conception to my twins, but these books made it natural and positive. The illustrations are stunning too!",
    author: "Aisha K.",
    role: "Single mother by choice",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3"
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What Families Are Saying
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600 md:text-lg">
            Hear from families who have used our books to share their special stories.
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2">
                <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex-grow">
                      <svg
                        className="h-8 w-8 text-primary mb-4 opacity-50"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                      >
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="text-gray-700 mb-6">{testimonial.quote}</p>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8">
            <CarouselPrevious className="relative mx-2" />
            <CarouselNext className="relative mx-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialSection;
