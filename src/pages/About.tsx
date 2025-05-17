import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TEAM = [
  { name: "Maggie Lerman", role: "Founder & CEO" },
  { name: "Alex Kim", role: "Lead Illustrator" },
  { name: "Jordan Patel", role: "Content Specialist" },
  { name: "Taylor Smith", role: "Customer Success" },
];

const About = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow container py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
      <p className="text-lg text-center mb-8 text-muted-foreground">
        DonorBookies helps families share their unique stories with love, honesty, and beautiful illustrations.
      </p>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          Our mission is to empower families to talk openly about donor conception and assisted reproduction. We believe every child deserves to know their story, and every family deserves a book that reflects their journey.
        </p>
        <p className="text-gray-700">
          We combine expert-reviewed content, inclusive language, and customizable illustrations to help you create a book as unique as your family.
        </p>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-700">
          DonorBookies was founded by parents and artists who saw a need for more inclusive, honest, and beautiful resources for families formed through donor conception and ART. We are passionate about helping you celebrate your family's story.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-6">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {TEAM.map((member) => (
            <div key={member.name} className="border rounded-lg p-6 bg-white shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                {member.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="font-semibold text-lg">{member.name}</div>
              <div className="text-primary text-sm mt-1">{member.role}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default About; 