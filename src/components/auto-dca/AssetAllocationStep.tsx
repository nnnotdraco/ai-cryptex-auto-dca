"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent } from "../ui/card";
import { PlusCircle } from "lucide-react";

interface Asset {
  symbol: string;
  allocation: number;
  icon: React.ReactNode;
}

interface AssetAllocationStepProps {
  onNext?: () => void;
  onUpdateAllocations?: (assets: Asset[]) => void;
}

const AssetAllocationStep = ({
  onNext = () => {},
  onUpdateAllocations = () => {},
}: AssetAllocationStepProps) => {
  const [assets, setAssets] = useState<Asset[]>([
    { symbol: "BTC", allocation: 60, icon: <BitcoinIcon /> },
    { symbol: "ETH", allocation: 40, icon: <EthereumIcon /> },
  ]);

  const [totalAllocation, setTotalAllocation] = useState<number>(100);
  const [error, setError] = useState<string>("");

  const handleAllocationChange = (index: number, value: string) => {
    const newValue = parseInt(value) || 0;
    const newAssets = [...assets];
    newAssets[index].allocation = newValue;
    setAssets(newAssets);

    // Calculate total allocation
    const total = newAssets.reduce((sum, asset) => sum + asset.allocation, 0);
    setTotalAllocation(total);

    if (total !== 100) {
      setError("Total allocation must equal 100%");
    } else {
      setError("");
      onUpdateAllocations(newAssets);
    }
  };

  const handleAddCrypto = () => {
    setAssets([
      ...assets,
      { symbol: "", allocation: 0, icon: <DefaultCryptoIcon /> },
    ]);
  };

  const handleCryptoChange = (index: number, symbol: string) => {
    const newAssets = [...assets];
    newAssets[index].symbol = symbol;

    // Set appropriate icon based on symbol
    if (symbol === "BTC") {
      newAssets[index].icon = <BitcoinIcon />;
    } else if (symbol === "ETH") {
      newAssets[index].icon = <EthereumIcon />;
    } else {
      newAssets[index].icon = <DefaultCryptoIcon />;
    }

    setAssets(newAssets);
    onUpdateAllocations(newAssets);
  };

  const handleNext = () => {
    if (totalAllocation === 100) {
      onNext();
    } else {
      setError("Please ensure total allocation equals 100% before proceeding");
    }
  };

  return (
    <div className="w-full bg-background p-6 sm:p-8 md:p-10 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">1. Asset allocation</h2>

      <div className="space-y-4">
        {assets.map((asset, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-full max-w-[350px]">
              <Select
                value={asset.symbol}
                onValueChange={(value) => handleCryptoChange(index, value)}
              >
                <SelectTrigger className="w-full">
                  <div className="flex items-center gap-2">
                    {asset.icon}
                    <SelectValue placeholder="Select cryptocurrency" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BTC">
                    <div className="flex items-center gap-2">
                      <BitcoinIcon />
                      <span>BTC</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="ETH">
                    <div className="flex items-center gap-2">
                      <EthereumIcon />
                      <span>ETH</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="SOL">
                    <div className="flex items-center gap-2">
                      <DefaultCryptoIcon />
                      <span>SOL</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-[150px]">
              <Input
                type="number"
                value={asset.allocation.toString()}
                onChange={(e) => handleAllocationChange(index, e.target.value)}
                className="text-right"
                min="0"
                max="100"
              />
            </div>
            <span className="text-sm">%</span>
          </div>
        ))}

        <div className="flex items-center mt-4">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-primary"
            onClick={handleAddCrypto}
          >
            <PlusCircle size={20} />
            <span>Add more crypto</span>
          </Button>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm">
          <span>Total allocation:</span>
          <span
            className={
              totalAllocation === 100 ? "text-green-500" : "text-red-500"
            }
          >
            {totalAllocation}/100%
          </span>
        </div>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        <div className="mt-8 flex justify-end">
          <Button onClick={handleNext} disabled={totalAllocation !== 100}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

// Icon components
const BitcoinIcon = () => (
  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
    ₿
  </div>
);

const EthereumIcon = () => (
  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="18"
      viewBox="0 0 12 18"
      fill="none"
    >
      <path d="M6 0L0 9L6 12L12 9L6 0Z" fill="white" />
      <path d="M6 12L0 9L6 18L12 9L6 12Z" fill="white" />
    </svg>
  </div>
);

const DefaultCryptoIcon = () => (
  <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white">
    $
  </div>
);

export default AssetAllocationStep;
