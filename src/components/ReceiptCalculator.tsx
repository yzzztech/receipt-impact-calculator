import { useState } from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RECEIPTS_PER_TREE = 8333;

export const ReceiptCalculator = () => {
  const [receipts, setReceipts] = useState<string>("");
  const [trees, setTrees] = useState<number | null>(null);

  const calculateTrees = () => {
    const numReceipts = parseInt(receipts);
    if (!isNaN(numReceipts) && numReceipts > 0) {
      setTrees(Math.round(numReceipts / RECEIPTS_PER_TREE));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateTrees();
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-app-blue-dark">
            Receipt Impact
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
            <div className="animate-fade-in p-4 bg-app-blue-light rounded-lg text-center">
              <p className="text-app-blue-dark">
                <span className="font-semibold">
                  {trees === 0 ? "Less than 1" : formatNumber(trees)}
                </span>{" "}
                {trees === 1 ? "tree" : "trees"} taken down
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};