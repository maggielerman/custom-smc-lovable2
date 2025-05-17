import { BookTemplate } from "@/lib/bookTemplates";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BookOpen } from "lucide-react";
import React from "react";

interface StorySelectionProps {
  filter: {
    donor_process: string;
    art_process: string;
    family_structure: string;
  };
  setFilter: (f: any) => void;
  stories: BookTemplate[];
  onSelect: (story: BookTemplate) => void;
}

const StorySelection: React.FC<StorySelectionProps> = ({ filter, setFilter, stories, onSelect }) => {
  const filteredStories = stories.filter(story =>
    (!filter.donor_process || story.donor_process === filter.donor_process) &&
    (!filter.art_process || story.art_process === filter.art_process) &&
    (!filter.family_structure || story.family_structure === filter.family_structure)
  );

  return (
    <HelmetProvider>
      <div className="flex flex-col min-h-screen">
        <Helmet>
          <title>Choose Your Story Type | Personalized Children's Book | DonorBookies</title>
          <meta name="description" content="Choose the story type for your personalized children's book. Perfect for donor-conceived and diverse families." />
          <link rel="canonical" href={`${window.location.origin}/customize/`} />
          <meta property="og:title" content="Choose Your Story Type | Personalized Children's Book | DonorBookies" />
          <meta property="og:description" content="Choose the story type for your personalized children's book. Perfect for donor-conceived and diverse families." />
          <meta property="og:image" content={`${window.location.origin}/placeholder.svg`} />
          <meta property="og:url" content={`${window.location.origin}/customize/`} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Choose Your Story Type | Personalized Children's Book | DonorBookies" />
          <meta name="twitter:description" content="Choose the story type for your personalized children's book. Perfect for donor-conceived and diverse families." />
          <meta name="twitter:image" content={`${window.location.origin}/placeholder.svg`} />
        </Helmet>
        <Navbar />
        <main className="flex-grow container py-10">
          <h1 className="text-3xl font-bold mb-8">Choose Your Story Type</h1>
          <div className="mb-6 flex flex-wrap gap-4">
            <select value={filter.donor_process} onChange={e => setFilter((f: any) => ({ ...f, donor_process: e.target.value }))} className="border rounded px-3 py-2">
              <option value="">All Donor Processes</option>
              <option value="sperm">Sperm Donor</option>
              <option value="egg">Egg Donor</option>
              <option value="none">No Donor</option>
            </select>
            <select value={filter.art_process} onChange={e => setFilter((f: any) => ({ ...f, art_process: e.target.value }))} className="border rounded px-3 py-2">
              <option value="">All ART Processes</option>
              <option value="IVF">IVF</option>
              <option value="surrogacy">Surrogacy</option>
            </select>
            <select value={filter.family_structure} onChange={e => setFilter((f: any) => ({ ...f, family_structure: e.target.value }))} className="border rounded px-3 py-2">
              <option value="">All Family Types</option>
              <option value="two moms">Two Moms</option>
              <option value="single dad">Single Dad</option>
              <option value="mom and dad">Mom and Dad</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredStories.map(story => (
              <div key={story.id} className="border rounded-lg p-6 flex flex-col items-center bg-white shadow">
                <div className="mb-4 w-24 h-24 bg-gray-100 flex items-center justify-center rounded-full">
                  <BookOpen className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-lg font-semibold mb-2">{story.name}</h2>
                <p className="text-sm text-muted-foreground mb-4 text-center">{story.description}</p>
                <Button onClick={() => onSelect(story)} className="mt-auto">Select</Button>
              </div>
            ))}
            {filteredStories.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground py-12">No stories match your filters.</div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default StorySelection; 