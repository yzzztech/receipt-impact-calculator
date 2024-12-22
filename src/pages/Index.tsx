import { useState } from "react";
import { ReceiptCalculator } from "@/components/ReceiptCalculator";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  return (
    <div className="min-h-screen bg-app-blue-light/30 flex flex-col items-center p-4">
      <div className="w-full max-w-5xl flex justify-end mb-4">
        <div className="space-x-2 rtl:space-x-reverse">
          <Button
            variant={language === 'en' ? "default" : "outline"}
            onClick={() => setLanguage('en')}
            className="w-12"
          >
            EN
          </Button>
          <Button
            variant={language === 'ar' ? "default" : "outline"}
            onClick={() => setLanguage('ar')}
            className="w-12"
          >
            AR
          </Button>
        </div>
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
          className="w-60 mb-8 mt-4"
        />
      </a>
      <ReceiptCalculator language={language} />
    </div>
  );
};

export default Index;