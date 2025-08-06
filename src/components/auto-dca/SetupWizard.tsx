"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Calendar } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Asset {
  symbol: string;
  name: string;
  icon: React.ReactNode;
  allocation: number;
}

interface SetupWizardProps {
  onComplete?: (dcaConfig: DCAConfig) => void;
}

interface DCAConfig {
  name: string;
  assets: Asset[];
  frequency: "Daily" | "Weekly" | "Monthly";
  date: string;
  time: string;
  duration: string;
  amount: number;
  currency: string;
}

const SetupWizard: React.FC<SetupWizardProps> = ({ onComplete = () => {} }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [dcaConfig, setDcaConfig] = useState<DCAConfig>({
    name: "BTC, ETH DCA",
    assets: [
      { symbol: "BTC", name: "Bitcoin", icon: <BitcoinIcon />, allocation: 60 },
      {
        symbol: "ETH",
        name: "Ethereum",
        icon: <EthereumIcon />,
        allocation: 40,
      },
    ],
    frequency: "Monthly",
    date: "15th",
    time: "17:00",
    duration: "12 months",
    amount: 1000,
    currency: "THB",
  });
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const handleAddAsset = () => {
    // Implementation for adding a new asset would go here
    console.log("Add asset clicked");
  };

  const handleAssetAllocationChange = (symbol: string, value: number) => {
    setDcaConfig((prev) => ({
      ...prev,
      assets: prev.assets.map((asset) =>
        asset.symbol === symbol ? { ...asset, allocation: value } : asset,
      ),
    }));
  };

  const handleFrequencyChange = (value: "Daily" | "Weekly" | "Monthly") => {
    setDcaConfig((prev) => ({ ...prev, frequency: value }));
  };

  const handleDateChange = (value: string) => {
    setDcaConfig((prev) => ({ ...prev, date: value }));
  };

  const handleTimeChange = (value: string) => {
    setDcaConfig((prev) => ({ ...prev, time: value }));
  };

  const handleDurationChange = (value: string) => {
    setDcaConfig((prev) => ({ ...prev, duration: value }));
  };

  const handleAmountChange = (value: number) => {
    setDcaConfig((prev) => ({ ...prev, amount: value }));
  };

  const handleNameChange = (value: string) => {
    setDcaConfig((prev) => ({ ...prev, name: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else if (termsAccepted) {
      onComplete(dcaConfig);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getTotalAllocation = () => {
    return dcaConfig.assets.reduce((sum, asset) => sum + asset.allocation, 0);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return getTotalAllocation() === 100;
      case 2:
        return (
          dcaConfig.frequency &&
          dcaConfig.date &&
          dcaConfig.time &&
          dcaConfig.duration
        );
      case 3:
        return dcaConfig.amount > 0;
      default:
        return false;
    }
  };

  return (
    <div className="bg-background w-full max-w-7xl mx-auto p-6 sm:p-8 md:p-10">
      <Card className="w-full">
        <CardHeader className="p-6 sm:p-8 md:p-10">
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
            Setup your Auto DCA in 3 steps
          </CardTitle>
          <div className="flex flex-col sm:flex-row items-start sm:items-center mt-4 sm:mt-6 gap-2 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full">
              <Label className="text-base sm:text-lg whitespace-nowrap">
                Auto DCA name:
              </Label>
              <Input
                value={dcaConfig.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full sm:w-64 md:w-72"
              />
              <Button variant="ghost" size="icon" className="ml-2">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 md:p-10">
          <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 md:gap-10">
            <div className="flex-1">
              <div className="mb-8 sm:mb-10">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-blue-500 text-white font-bold mr-3 sm:mr-4 text-lg sm:text-xl md:text-2xl">
                    {currentStep}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-medium">
                    {currentStep === 1 && "Asset allocation"}
                    {currentStep === 2 && "Recurring period"}
                    {currentStep === 3 && "Total amount per order"}
                  </h3>
                </div>

                {/* Step 1: Asset Allocation */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    {dcaConfig.assets.map((asset, index) => (
                      <div
                        key={asset.symbol}
                        className="flex items-center space-x-4"
                      >
                        <div className="flex items-center w-full max-w-xs">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 mr-2">
                            {asset.icon}
                          </div>
                          <Select defaultValue={asset.symbol}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder={asset.symbol} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={asset.symbol}>
                                {asset.name}
                              </SelectItem>
                              {/* Add more cryptocurrencies as needed */}
                            </SelectContent>
                          </Select>
                        </div>
                        <Input
                          type="number"
                          value={asset.allocation}
                          onChange={(e) =>
                            handleAssetAllocationChange(
                              asset.symbol,
                              parseInt(e.target.value) || 0,
                            )
                          }
                          className="w-32"
                        />
                        <span>%</span>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={handleAddAsset}
                      className="flex items-center mt-4"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2"
                      >
                        <path
                          d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Add more crypto
                    </Button>
                    <div className="flex justify-between items-center mt-4 text-sm">
                      <span>Total allocation:</span>
                      <span
                        className={`font-bold ${getTotalAllocation() === 100 ? "text-green-500" : "text-red-500"}`}
                      >
                        {getTotalAllocation()}/100%
                      </span>
                    </div>
                  </div>
                )}

                {/* Step 2: Recurring Period */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label className="block mb-2">Recurring period</Label>
                      <Tabs
                        defaultValue={dcaConfig.frequency}
                        onValueChange={(value) =>
                          handleFrequencyChange(
                            value as "Daily" | "Weekly" | "Monthly",
                          )
                        }
                        className="w-full"
                      >
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="Daily">Daily</TabsTrigger>
                          <TabsTrigger value="Weekly">Weekly</TabsTrigger>
                          <TabsTrigger value="Monthly">Monthly</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>

                    <div>
                      <Label htmlFor="date" className="block mb-2">
                        Date
                      </Label>
                      <div className="relative">
                        <Input
                          id="date"
                          value={dcaConfig.date}
                          onChange={(e) => handleDateChange(e.target.value)}
                          className="w-full pr-10"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0"
                        >
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="time" className="block mb-2">
                        Time
                      </Label>
                      <Select
                        defaultValue={dcaConfig.time}
                        onValueChange={handleTimeChange}
                      >
                        <SelectTrigger id="time" className="w-full">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00">09:00</SelectItem>
                          <SelectItem value="12:00">12:00</SelectItem>
                          <SelectItem value="15:00">15:00</SelectItem>
                          <SelectItem value="17:00">17:00</SelectItem>
                          <SelectItem value="20:00">20:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="duration" className="block mb-2">
                        Duration
                      </Label>
                      <Select
                        defaultValue={dcaConfig.duration}
                        onValueChange={handleDurationChange}
                      >
                        <SelectTrigger id="duration" className="w-full">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3 months">3 months</SelectItem>
                          <SelectItem value="6 months">6 months</SelectItem>
                          <SelectItem value="12 months">12 months</SelectItem>
                          <SelectItem value="24 months">24 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 3: Total Amount Per Order */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="amount" className="block mb-2">
                        Amount
                      </Label>
                      <div className="flex">
                        <Input
                          id="amount"
                          type="number"
                          value={dcaConfig.amount}
                          onChange={(e) =>
                            handleAmountChange(parseFloat(e.target.value) || 0)
                          }
                          className="flex-1 rounded-r-none"
                        />
                        <div className="bg-muted flex items-center justify-center px-3 rounded-r-md border border-l-0 border-input">
                          {dcaConfig.currency}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        Available: 300,000 THB
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 mt-8">
                      <Checkbox
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={(checked) =>
                          setTermsAccepted(checked === true)
                        }
                      />
                      <Label htmlFor="terms" className="text-sm">
                        I understand Auto DCA is advantage, limitation, and risk
                        that could occur from crypto volatility and I hereby
                        accept that the Auto DCA Order will be executed
                        automatically on my intention
                      </Label>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={
                      !isStepValid() || (currentStep === 3 && !termsAccepted)
                    }
                  >
                    {currentStep < 3 ? "Next" : "Create Auto DCA"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Summary Panel */}
            <div className="w-full xl:w-96 bg-muted/50 rounded-lg p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-medium mb-4 sm:mb-6">
                Summary of your Auto DCA
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                This Auto DCA will buy crypto with the following amount at
                market price (market order) at the recurring date and time
              </p>

              <div className="bg-muted rounded-md p-3 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Total amount</span>
                  <span className="font-bold">
                    {dcaConfig.amount} {dcaConfig.currency}
                  </span>
                </div>

                {dcaConfig.assets.map((asset) => (
                  <div
                    key={asset.symbol}
                    className="flex items-center justify-between text-sm mb-1"
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 mr-2">{asset.icon}</div>
                      <span>{asset.symbol}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">{asset.allocation}%</span>
                      <span>=</span>
                      <span className="ml-2">
                        {((dcaConfig.amount * asset.allocation) / 100).toFixed(
                          0,
                        )}{" "}
                        {dcaConfig.currency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-muted rounded-md p-3 mb-4">
                <div className="mb-2">
                  <span className="text-sm block">
                    Every {dcaConfig.frequency.toLowerCase()} on
                  </span>
                  <span className="font-bold">{dcaConfig.date}</span>
                </div>

                <div className="text-xs text-muted-foreground">
                  <div>
                    Start on{" "}
                    <span className="font-medium">
                      15 May 2024 {dcaConfig.time}
                    </span>
                  </div>
                  <div>
                    and End on{" "}
                    <span className="font-medium">14 May 2025 16:59</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Historical Returns</h4>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="text-sm">
                  <span>1-year historical returns</span>
                  <span className="text-green-500 font-bold ml-2">71.25%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Simple icon components for Bitcoin and Ethereum
const BitcoinIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
      fill="#F7931A"
    />
    <path
      d="M17.0625 10.4375C17.3125 8.8125 16.0625 7.9375 14.375 7.375L14.9375 5.1875L13.625 4.875L13.0625 7C12.6875 6.9375 12.3125 6.8125 11.9375 6.75L12.5 4.625L11.1875 4.3125L10.625 6.5C10.3125 6.4375 10 6.375 9.6875 6.3125L9.6875 6.3125L7.875 5.875L7.5625 7.3125C7.5625 7.3125 8.5 7.5 8.4375 7.5C9 7.6875 9.0625 8.0625 9.0625 8.375L8.375 10.875C8.4375 10.875 8.5 10.9375 8.5625 10.9375C8.5 10.9375 8.4375 10.9375 8.375 10.9375L7.5 14.375C7.4375 14.5625 7.25 14.8125 6.875 14.75C6.9375 14.75 6 14.5 6 14.5L5.375 16.0625L7.0625 16.5C7.4375 16.5625 7.75 16.625 8.0625 16.6875L7.5 18.9375L8.8125 19.25L9.375 17.0625C9.75 17.125 10.125 17.25 10.5 17.3125L9.9375 19.5L11.25 19.8125L11.8125 17.5625C14.0625 17.9375 15.75 17.75 16.5 15.75C17.125 14.125 16.5 13.125 15.3125 12.5C16.1875 12.3125 16.875 11.625 17.0625 10.4375ZM14 14.75C13.5625 16.375 11.1875 15.5 10.3125 15.3125L11.125 12.375C12 12.5625 14.5 13.0625 14 14.75ZM14.5 10.375C14.0625 11.875 12.125 11.125 11.375 11L12.125 8.3125C12.875 8.4375 14.9375 8.8125 14.5 10.375Z"
      fill="white"
    />
  </svg>
);

const EthereumIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
      fill="#627EEA"
    />
    <path
      d="M12.3735 3V9.6525L17.9963 12.165L12.3735 3Z"
      fill="white"
      fillOpacity="0.602"
    />
    <path d="M12.3735 3L6.75 12.165L12.3735 9.6525V3Z" fill="white" />
    <path
      d="M12.3735 16.476V20.9963L18 13.212L12.3735 16.476Z"
      fill="white"
      fillOpacity="0.602"
    />
    <path
      d="M12.3735 20.9963V16.4753L6.75 13.212L12.3735 20.9963Z"
      fill="white"
    />
    <path
      d="M12.3735 15.4298L17.9963 12.165L12.3735 9.6543V15.4298Z"
      fill="white"
      fillOpacity="0.2"
    />
    <path
      d="M6.75 12.165L12.3735 15.4298V9.6543L6.75 12.165Z"
      fill="white"
      fillOpacity="0.602"
    />
  </svg>
);

export default SetupWizard;
