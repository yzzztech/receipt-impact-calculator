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
      setTrees(Number((numReceipts / RECEIPTS_PER_TREE).toFixed(3)));
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-eco-green-dark">
            Receipt Impact
          </h1>
          <p className="text-sm text-neutral">
            Calculate your paper receipt footprint
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-eco-green-dark flex items-center gap-2">
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
            onClick={calculateTrees}
            className="w-full bg-eco-green hover:bg-eco-green/90 text-white"
          >
            Calculate Impact
          </Button>

          {trees !== null && (
            <div className="animate-fade-in p-4 bg-eco-green-light rounded-lg text-center">
              <p className="text-eco-green-dark">
                <span className="font-semibold">
                  {trees === 0 ? "Less than 0.001" : trees}
                </span>{" "}
                {trees === 1 ? "tree" : "trees"} used
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};