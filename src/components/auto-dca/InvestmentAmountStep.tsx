"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InvestmentAmountStepProps {
  onNext?: () => void;
  onBack?: () => void;
  onAmountChange?: (amount: number) => void;
  amount?: number;
  currency?: string;
}

const InvestmentAmountStep = ({
  onNext = () => {},
  onBack = () => {},
  onAmountChange = () => {},
  amount = 1000,
  currency = "THB",
}: InvestmentAmountStepProps) => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(amount);
  const [selectedCurrency, setSelectedCurrency] = useState<string>(currency);
  const availableBalance = 300000; // Mock available balance
  const historicalReturn = 71.25; // Mock historical return percentage

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
    if (!isNaN(newAmount)) {
      setInvestmentAmount(newAmount);
      onAmountChange(newAmount);
    } else {
      setInvestmentAmount(0);
      onAmountChange(0);
    }
  };

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
  };

  const handleNext = () => {
    if (investmentAmount > 0 && investmentAmount <= availableBalance) {
      onNext();
    }
  };

  return (
    <div className="w-full bg-background p-6 sm:p-8 md:p-10 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">3. Total amount per order</h2>

      <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="amount" className="text-base">
                Amount
              </Label>
            </div>
            <div className="flex">
              <Input
                id="amount"
                type="number"
                value={investmentAmount}
                onChange={handleAmountChange}
                className="rounded-r-none"
                min={1}
                max={availableBalance}
              />
              <Select
                value={selectedCurrency}
                onValueChange={handleCurrencyChange}
              >
                <SelectTrigger className="w-24 rounded-l-none border-l-0">
                  <SelectValue placeholder="THB" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="THB">THB</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-muted-foreground">
              Available: {availableBalance.toLocaleString()} {selectedCurrency}
            </p>
          </div>

          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-medium">Historical Returns</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon
                        size={16}
                        className="text-muted-foreground cursor-help"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Based on past performance. Not indicative of future
                        results.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center gap-2">
                <span>1-year historical returns</span>
                <span className="font-semibold text-green-500">
                  {historicalReturn}%
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Estimated value after 1 year:{" "}
                  <span className="font-medium">
                    {(
                      investmentAmount *
                      (1 + historicalReturn / 100)
                    ).toLocaleString()}{" "}
                    {selectedCurrency}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-muted/30 h-fit">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Investment Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total per order:</span>
                <span>
                  {investmentAmount.toLocaleString()} {selectedCurrency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frequency:</span>
                <span>Monthly</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span>12 months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total investment:</span>
                <span>
                  {(investmentAmount * 12).toLocaleString()} {selectedCurrency}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={
            investmentAmount <= 0 || investmentAmount > availableBalance
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default InvestmentAmountStep;
