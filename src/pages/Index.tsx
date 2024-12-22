import { ReceiptCalculator } from "@/components/ReceiptCalculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-app-blue-light/30 flex flex-col items-center p-4">
      <a 
        href="https://wateer.sa" 
        target="_blank" 
        rel="noopener noreferrer"
        className="hover:opacity-80 transition-opacity"
      >
        <img 
          src="/lovable-uploads/3825e739-23c0-42ac-ac6c-90d59d129855.png" 
          alt="Wateer Logo" 
          className="w-48 mb-8 mt-4"
        />
      </a>
      <ReceiptCalculator />
    </div>
  );
};

export default Index;