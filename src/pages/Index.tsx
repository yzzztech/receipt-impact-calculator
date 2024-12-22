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
          src="https://wateer.com.sa/static/images/WateerVersion4.png" 
          alt="Wateer Logo" 
          className="w-48 mb-8 mt-4"
        />
      </a>
      <ReceiptCalculator />
    </div>
  );
};

export default Index;