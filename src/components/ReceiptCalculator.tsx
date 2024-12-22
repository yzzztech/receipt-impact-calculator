import { useState } from "react";
import { Info, TreeDeciduous, Gauge, Clock, DollarSign } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { translations } from "@/utils/translations";

const RECEIPTS_PER_TREE = 8333;
const CO2_PER_RECEIPT = 2.5; // grams of CO2 per receipt
const SECONDS_PER_RECEIPT = 3; // seconds wasted per receipt transaction
const GRAMS_PER_TON = 1000000; // 1 ton = 1,000,000 grams
const GRAMS_PER_KG = 1000; // 1 kg = 1,000 grams
const COST_PER_RECEIPT = 0.015; // $0.015 per receipt (includes paper, ink, and maintenance)

interface Props {
  language: 'en' | 'ar';
}

export const ReceiptCalculator = ({ language }: Props) => {
  const [receipts, setReceipts] = useState<string>("");
  const [trees, setTrees] = useState<number | null>(null);
  const [co2, setCo2] = useState<{ value: number; unit: string } | null>(null);
  const [timeWasted, setTimeWasted] = useState<number | null>(null);
  const [cost, setCost] = useState<number | null>(null);

  const t = translations[language];
  const isArabic = language === 'ar';

  const formatNumber = (num: number | null): string => {
    if (num === null) return "0";
    return num.toLocaleString(isArabic ? 'ar-SA' : 'en-US');
  };

  const formatCO2 = (grams: number) => {
    if (grams >= GRAMS_PER_TON) {
      return {
        value: Math.round(grams / GRAMS_PER_TON),
        unit: t.co2TextTons
      };
    } else if (grams >= GRAMS_PER_KG) {
      return {
        value: Math.round(grams / GRAMS_PER_KG),
        unit: t.co2TextKg
      };
    } else {
      return {
        value: Math.round(grams),
        unit: t.co2TextGrams
      };
    }
  };

  const calculateImpact = () => {
    const numReceipts = parseInt(receipts);
    if (!isNaN(numReceipts) && numReceipts > 0) {
      setTrees(Math.round(numReceipts / RECEIPTS_PER_TREE));
      const totalCO2Grams = numReceipts * CO2_PER_RECEIPT;
      setCo2(formatCO2(totalCO2Grams));
      setTimeWasted(Math.round(numReceipts * SECONDS_PER_RECEIPT));
      setCost(Math.round(numReceipts * COST_PER_RECEIPT));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateImpact();
  };

  const formatTime = (seconds: number | null): string => {
    if (seconds === null) return "0";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return isArabic
        ? `${formatNumber(hours)} ${hours === 1 ? t.hour : t.hours} ${formatNumber(minutes)} ${minutes === 1 ? t.minute : t.minutes}`
        : `${formatNumber(hours)} ${hours === 1 ? t.hour : t.hours} ${formatNumber(minutes)} ${minutes === 1 ? t.minute : t.minutes}`;
    }
    return `${formatNumber(minutes)} ${minutes === 1 ? t.minute : t.minutes}`;
  };

  return (
    <div className={`w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg ${isArabic ? 'rtl' : 'ltr'}`}>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-app-blue-dark">
            {t.title}
          </h1>
          <p className="text-sm text-neutral">
            {t.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-app-blue-dark flex items-center gap-2">
              {t.receiptsLabel}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-neutral hover:text-app-blue transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t.tooltipText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <Input
              type="number"
              min="0"
              value={receipts}
              onChange={(e) => setReceipts(e.target.value)}
              placeholder={t.receiptsLabel}
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-app-blue hover:bg-app-blue/90 text-white transition-all duration-200 transform hover:scale-[1.02]"
          >
            {t.calculateButton}
          </Button>

          {trees !== null && (
            <div className="animate-fade-in space-y-4">
              <div className="p-5 bg-app-blue-light rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 text-app-blue-dark">
                  <TreeDeciduous className="h-8 w-8 mt-1 flex-shrink-0" />
                  <p className="text-lg text-left">
                    <span className="font-semibold">
                      {trees === 0 ? t.lessThanOne : formatNumber(trees)}
                    </span>{" "}
                    {trees === 1 ? t.treesText : t.treesTextPlural}
                  </p>
                </div>
              </div>

              <div className="p-5 bg-app-blue-light rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 text-app-blue-dark">
                  <Gauge className="h-8 w-8 mt-1 flex-shrink-0" />
                  <p className="text-lg text-left">
                    <span className="font-semibold">{co2 ? formatNumber(co2.value) : "0"}</span>{" "}
                    {co2?.unit || t.co2TextGrams}
                  </p>
                </div>
              </div>

              <div className="p-5 bg-app-blue-light rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 text-app-blue-dark">
                  <Clock className="h-8 w-8 mt-1 flex-shrink-0" />
                  <p className="text-lg text-left">
                    <span className="font-semibold">{formatTime(timeWasted)}</span>{" "}
                    {t.timeText}
                  </p>
                </div>
              </div>

              <div className="p-5 bg-app-blue-light rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 text-app-blue-dark">
                  <DollarSign className="h-8 w-8 mt-1 flex-shrink-0" />
                  <p className="text-lg text-left">
                    <span className="font-semibold">SAR {formatNumber(cost)}</span>{" "}
                    {t.costText}
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