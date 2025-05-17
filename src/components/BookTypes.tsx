
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const bookTemplates = [
  {
    id: "donor-egg",
    title: "Donor Egg Story",
    description: "A gentle story explaining donor egg conception to young children.",
    imageUrl: "https://images.unsplash.com/photo-1626302289957-cd25ba21e3da?auto=format&fit=crop&q=80&w=2052&ixlib=rb-4.0.3",
    color: "bg-pink-100"
  },
  {
    id: "donor-sperm",
    title: "Donor Sperm Story",
    description: "A warm narrative about how donor sperm helped create a loving family.",
    imageUrl: "https://images.unsplash.com/photo-1633508636048-1c23473198c7?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
    color: "bg-blue-100"
  },
  {
    id: "donor-embryo",
    title: "Donor Embryo Story",
    description: "A loving story about embryo donation and the gift of family.",
    imageUrl: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=2680&ixlib=rb-4.0.3",
    color: "bg-purple-100"
  },
  {
    id: "ivf",
    title: "IVF Journey Story",
    description: "An illustrated journey through the IVF process for young children.",
    imageUrl: "https://images.unsplash.com/photo-1631217873436-b0fa8df9b92b?auto=format&fit=crop&q=80&w=2532&ixlib=rb-4.0.3",
    color: "bg-green-100"
  },
];

const BookTypes = () => {
  return (
    <section className="py-16 bg-gray-50" id="book-types">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Our Book Templates
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-gray-600 md:text-lg">
            Choose from our expertly designed templates created specifically for different
            donor conception journeys. Each book can be fully personalized.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {bookTemplates.map((template) => (
            <div key={template.id} className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
              <div className={`${template.color} p-3 aspect-[4/3] overflow-hidden`}>
                <img
                  src={template.imageUrl}
                  alt={template.title}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl">{template.title}</h3>
                <p className="mt-2 text-gray-600">{template.description}</p>
                <div className="mt-4">
                  <Link to={`/create/${template.id}`}>
                    <Button className="w-full">Start Creating</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookTypes;
