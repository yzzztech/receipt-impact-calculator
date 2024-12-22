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

export const ReceiptCalculator = () => {
  const [receipts, setReceipts] = useState<string>("");
  const [trees, setTrees] = useState<number | null>(null);
  const [co2, setCo2] = useState<number | null>(null);
  const [timeWasted, setTimeWasted] = useState<number | null>(null);

  const calculateImpact = () => {
    const numReceipts = parseInt(receipts);
    if (!isNaN(numReceipts) && numReceipts > 0) {
      setTrees(Math.round(numReceipts / RECEIPTS_PER_TREE));
      setCo2(Math.round(numReceipts * CO2_PER_RECEIPT));
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
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-app-blue-dark">
            Paper Receipt Impact
          </h1>
          <p className="text-sm text-neutral">
            Calculate your paper receipt footprint
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-app-blue-dark flex items-center gap-2">
              Number of Receipts
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-neutral" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>One tree produces ~8,333 paper receipts</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <Input
              type="number"
              min="0"
              value={receipts}
              onChange={(e) => setReceipts(e.target.value)}
              placeholder="Enter number of receipts"
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-app-blue hover:bg-app-blue/90 text-white"
          >
            Calculate Impact
          </Button>

          {trees !== null && (
            <div className="animate-fade-in space-y-3">
              <div className="p-4 bg-app-blue-light rounded-lg">
                <div className="flex items-center justify-center gap-2 text-app-blue-dark">
                  <TreeDeciduous className="h-5 w-5" />
                  <p>
                    <span className="font-semibold">
                      {trees === 0 ? "Less than 1" : formatNumber(trees)}
                    </span>{" "}
                    {trees === 1 ? "tree" : "trees"} taken down
                  </p>
                </div>
              </div>

              <div className="p-4 bg-app-blue-light rounded-lg">
                <div className="flex items-center justify-center gap-2 text-app-blue-dark">
                  <Gauge className="h-5 w-5" />
                  <p>
                    <span className="font-semibold">{formatNumber(co2!)}</span>{" "}
                    grams of CO2 emissions
                  </p>
                </div>
              </div>

              <div className="p-4 bg-app-blue-light rounded-lg">
                <div className="flex items-center justify-center gap-2 text-app-blue-dark">
                  <Clock className="h-5 w-5" />
                  <p>
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