import { useState } from "react";
import { ReceiptCalculator } from "@/components/ReceiptCalculator";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  return (
    <div className="min-h-screen bg-app-blue-light/30 flex flex-col items-center p-4">
      <div className="w-full max-w-5xl flex justify-end mb-4">
        <Button
          variant="outline"
          onClick={toggleLanguage}
          className="w-12"
        >
          {language === 'en' ? 'AR' : 'EN'}
        </Button>
      </div>
      <a 
        href="https://wateer.sa" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:opacity-80 transition-opacity"
      >
        <img 
          src="/lovable-uploads/3825e739-23c0-42ac-ac6c-90d59d129855.png" 
          alt="Wateer Logo" 
          className="w-60 mb-4 mt-2"
        />
      </a>
      <ReceiptCalculator language={language} />
      <footer className="mt-auto pt-8 pb-4 text-app-blue-dark/80 text-sm">
        © 2024-2025 Wateer. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;