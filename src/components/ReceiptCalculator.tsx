import { useState } from "react";
import { Info, TreeDeciduous, Gauge, Clock } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RECEIPTS_PER_TREE = 8333;
const CO2_PER_RECEIPT = 2.5; // grams of CO2 per receipt
const SECONDS_PER_RECEIPT = 3; // seconds wasted per receipt transaction
const GRAMS_PER_TON = 1000000; // 1 ton = 1,000,000 grams

export const ReceiptCalculator = () => {
  const [receipts, setReceipts] = useState<string>("");
  const [trees, setTrees] = useState<number | null>(null);
  const [co2, setCo2] = useState<number | null>(null);
  const [timeWasted, setTimeWasted] = useState<number | null>(null);

  const calculateImpact = () => {
    const numReceipts = parseInt(receipts);
    if (!isNaN(numReceipts) && numReceipts > 0) {
      setTrees(Math.round(numReceipts / RECEIPTS_PER_TREE));
      // Convert CO2 from grams to tons and round to 3 decimal places
      setCo2(Number(((numReceipts * CO2_PER_RECEIPT) / GRAMS_PER_TON).toFixed(3)));
      setTimeWasted(Math.round(numReceipts * SECONDS_PER_RECEIPT));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateImpact();
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    }
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-app-blue-dark">
            Paper Receipt Impact
          </h1>
          <p className="text-sm text-neutral">
            Calculate the environmental impact of your paper receipts
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-app-blue-dark flex items-center gap-2">
              Number of Receipts per Month
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-neutral hover:text-app-blue transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>One tree produces approximately 8,333 paper receipts</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <Input
              type="number"
              min="0"
              value={receipts}
              onChange={(e) => setReceipts(e.target.value)}
              placeholder="Enter the number of receipts"
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-app-blue hover:bg-app-blue/90 text-white transition-all duration-200 transform hover:scale-[1.02]"
          >
            Calculate Environmental Impact
          </Button>

          {trees !== null && (
            <div className="animate-fade-in space-y-4">
              <div className="p-5 bg-app-blue-light rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 text-app-blue-dark">
                  <TreeDeciduous className="h-8 w-8 mt-1 flex-shrink-0" />
                  <p className="text-lg text-left">
                    <span className="font-semibold">
                      {trees === 0 ? "Less than 1" : formatNumber(trees)}
                    </span>{" "}
                    {trees === 1 ? "tree" : "trees"} taken down
                  </p>
                </div>
              </div>

              <div className="p-5 bg-app-blue-light rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 text-app-blue-dark">
                  <Gauge className="h-8 w-8 mt-1 flex-shrink-0" />
                  <p className="text-lg text-left">
                    <span className="font-semibold">{formatNumber(co2!)}</span>{" "}
                    tons of CO2 emissions
                  </p>
                </div>
              </div>

              <div className="p-5 bg-app-blue-light rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 text-app-blue-dark">
                  <Clock className="h-8 w-8 mt-1 flex-shrink-0" />
                  <p className="text-lg text-left">
                    <span className="font-semibold">{formatTime(timeWasted!)}</span>{" "}
                    wasted on transactions
                  </p>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};