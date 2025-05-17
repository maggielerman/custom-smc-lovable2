import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Helmet, HelmetProvider } from "react-helmet-async";
import React from "react";

const StoryNotFound: React.FC = () => (
  <HelmetProvider>
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Story Not Found | Personalized Children's Book | DonorBookies</title>
        <meta name="description" content="The story template you are looking for does not exist." />
        <link rel="canonical" href={`${window.location.origin}/customize/`} />
        <meta property="og:title" content="Story Not Found | Personalized Children's Book | DonorBookies" />
        <meta property="og:description" content="The story template you are looking for does not exist." />
        <meta property="og:image" content={`${window.location.origin}/placeholder.svg`} />
        <meta property="og:url" content={`${window.location.origin}/customize/`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Story Not Found | Personalized Children's Book | DonorBookies" />
        <meta name="twitter:description" content="The story template you are looking for does not exist." />
        <meta name="twitter:image" content={`${window.location.origin}/placeholder.svg`} />
      </Helmet>
      <Navbar />
      <main className="flex-grow container py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Story Not Found</h1>
          <p className="text-muted-foreground mb-8">The story template you are looking for does not exist.</p>
          <Button asChild>
            <a href="/customize/">Back to Story Selection</a>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  </HelmetProvider>
);

export default StoryNotFound; 