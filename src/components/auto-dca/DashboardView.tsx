"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Info, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DCAOrder {
  name: string;
  createdTime: string;
  lastOrderTime: string;
  amount: string;
  assets: Array<{
    symbol: string;
    allocation: string;
  }>;
  frequency: string;
  recurringTime: string;
  totalCost: string;
  accumulatedBuy: Array<{
    symbol: string;
    amount: string;
  }>;
  averagePrice: Array<{
    symbol: string;
    price: string;
  }>;
  pnl: Array<{
    symbol: string;
    percentage: string;
    isPositive: boolean;
  }>;
  pastRounds: number;
}

interface DashboardViewProps {
  onCreateNewDCA?: () => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({
  onCreateNewDCA = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("opening");

  // Mock data for demonstration
  const openingDcaOrders: DCAOrder[] = [
    {
      name: "BTC, ETH DCA",
      createdTime: "20 Feb 2024 14:00:23",
      lastOrderTime: "15 Apr 2024 17:00:00",
      amount: "1,000.00 THB",
      assets: [
        { symbol: "BTC", allocation: "60%" },
        { symbol: "ETH", allocation: "40%" },
      ],
      frequency: "Monthly",
      recurringTime: "15th at 17:00",
      totalCost: "2,000 THB",
      accumulatedBuy: [
        { symbol: "BTC", amount: "0.00056467 BTC" },
        { symbol: "ETH", amount: "0.00743835 ETH" },
      ],
      averagePrice: [
        { symbol: "BTC", price: "1,435,340.23" },
        { symbol: "ETH", price: "30,289.56" },
      ],
      pnl: [
        { symbol: "BTC", percentage: "1.26%", isPositive: true },
        { symbol: "ETH", percentage: "3.02%", isPositive: false },
      ],
      pastRounds: 2,
    },
    {
      name: "Accum BTC",
      createdTime: "1 Jan 2023 10:05:10",
      lastOrderTime: "28 Apr 2024 00:00:00",
      amount: "500.00 THB",
      assets: [{ symbol: "BTC", allocation: "100%" }],
      frequency: "Weekly",
      recurringTime: "Sunday at 20:00",
      totalCost: "34,500 THB",
      accumulatedBuy: [{ symbol: "BTC", amount: "0.04052379 BTC" }],
      averagePrice: [{ symbol: "BTC", price: "851,351.75" }],
      pnl: [{ symbol: "BTC", percentage: "49.61%", isPositive: true }],
      pastRounds: 69,
    },
  ];

  const closedDcaOrders: DCAOrder[] = [];

  return (
    <div className="w-full bg-background p-6 sm:p-8 md:p-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Auto DCA Dashboard
        </h1>
        <Button
          size="lg"
          className="flex items-center gap-2 w-full sm:w-auto"
          onClick={onCreateNewDCA}
        >
          <Plus className="h-4 w-4" />
          <span>Create New Auto DCA</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
        <Card className="hover:shadow-lg transition-shadow p-2 sm:p-4">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-base sm:text-lg text-muted-foreground">
              Total Invested
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
              36,500 THB
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
              Across all Auto DCA plans
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow p-2 sm:p-4">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-base sm:text-lg text-muted-foreground">
              Portfolio Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
              52,340 THB
            </div>
            <p className="text-sm sm:text-base text-green-500 mt-1 sm:mt-2">
              +43.4% overall
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1 p-2 sm:p-4">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="text-base sm:text-lg text-muted-foreground">
              Active Plans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold">2</div>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
              71 total purchase rounds
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="opening"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <div className="flex items-center gap-2 mb-4 overflow-x-auto">
          <TabsList className="flex-shrink-0">
            <TabsTrigger value="opening">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
                  1
                </span>
                <span className="text-sm">Opening Auto DCA</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="history">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
                  2
                </span>
                <span className="text-sm hidden sm:inline">
                  Auto DCA buy history
                </span>
                <span className="text-sm sm:hidden">History</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="closed">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
                  3
                </span>
                <span className="text-sm">Closed Auto DCA</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <TabsContent value="opening" className="m-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Auto DCA order name</TableHead>
                      <TableHead>Created time</TableHead>
                      <TableHead>Last order time</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Asset</TableHead>
                      <TableHead>Allocation</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Recurring time</TableHead>
                      <TableHead>Total cost</TableHead>
                      <TableHead>Accumulated buy</TableHead>
                      <TableHead>Average price</TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1">
                          <span>% PnL</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info size={14} />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Profit and Loss percentage</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableHead>
                      <TableHead>Past rounds</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {openingDcaOrders.map((order, index) => (
                      <React.Fragment key={index}>
                        {order.assets.map((asset, assetIndex) => (
                          <TableRow
                            key={`${index}-${assetIndex}`}
                            className={assetIndex > 0 ? "border-t-0" : ""}
                          >
                            {assetIndex === 0 && (
                              <TableCell rowSpan={order.assets.length}>
                                {order.name}
                              </TableCell>
                            )}
                            {assetIndex === 0 && (
                              <TableCell rowSpan={order.assets.length}>
                                {order.createdTime}
                              </TableCell>
                            )}
                            {assetIndex === 0 && (
                              <TableCell rowSpan={order.assets.length}>
                                {order.lastOrderTime}
                              </TableCell>
                            )}
                            {assetIndex === 0 && (
                              <TableCell rowSpan={order.assets.length}>
                                {order.amount}
                              </TableCell>
                            )}
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {asset.symbol === "BTC" ? (
                                  <div className="h-5 w-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">
                                    ₿
                                  </div>
                                ) : (
                                  <div className="h-5 w-5 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs">
                                    Ξ
                                  </div>
                                )}
                                {asset.symbol}
                              </div>
                            </TableCell>
                            <TableCell>{asset.allocation}</TableCell>
                            {assetIndex === 0 && (
                              <TableCell rowSpan={order.assets.length}>
                                {order.frequency}
                              </TableCell>
                            )}
                            {assetIndex === 0 && (
                              <TableCell rowSpan={order.assets.length}>
                                {order.recurringTime}
                              </TableCell>
                            )}
                            {assetIndex === 0 && (
                              <TableCell rowSpan={order.assets.length}>
                                {order.totalCost}
                              </TableCell>
                            )}
                            <TableCell>
                              {order.accumulatedBuy[assetIndex].amount}
                            </TableCell>
                            <TableCell>
                              {order.averagePrice[assetIndex].price}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  order.pnl[assetIndex].isPositive
                                    ? "default"
                                    : "destructive"
                                }
                              >
                                {order.pnl[assetIndex].isPositive ? "+" : "-"}
                                {order.pnl[assetIndex].percentage}
                              </Badge>
                            </TableCell>
                            {assetIndex === 0 && (
                              <TableCell rowSpan={order.assets.length}>
                                {order.pastRounds}
                              </TableCell>
                            )}
                            {assetIndex === 0 && (
                              <TableCell rowSpan={order.assets.length}>
                                <Button variant="destructive" size="sm">
                                  Cancel
                                </Button>
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                    {openingDcaOrders.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={14} className="text-center py-8">
                          <p className="text-muted-foreground">
                            No active Auto DCA plans found
                          </p>
                          <Button
                            variant="outline"
                            size="default"
                            className="mt-4"
                            onClick={onCreateNewDCA}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Create your first Auto DCA
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="history" className="m-0">
              <div className="p-4 sm:p-8 text-center">
                <h3 className="text-base sm:text-lg font-medium mb-2">
                  Auto DCA Purchase History
                </h3>
                <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                  View all your completed Auto DCA purchases
                </p>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Auto DCA Name</TableHead>
                        <TableHead>Asset</TableHead>
                        <TableHead>Amount (THB)</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>15 Apr 2024 17:00:00</TableCell>
                        <TableCell>BTC, ETH DCA</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs">
                              ₿
                            </div>
                            BTC
                          </div>
                        </TableCell>
                        <TableCell>600.00</TableCell>
                        <TableCell>0.00028234 BTC</TableCell>
                        <TableCell>1,435,340.23</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-600 border-green-200"
                          >
                            Completed
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>15 Apr 2024 17:00:00</TableCell>
                        <TableCell>BTC, ETH DCA</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-5 w-5 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs">
                              Ξ
                            </div>
                            ETH
                          </div>
                        </TableCell>
                        <TableCell>400.00</TableCell>
                        <TableCell>0.00371918 ETH</TableCell>
                        <TableCell>30,289.56</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-600 border-green-200"
                          >
                            Completed
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="closed" className="m-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Auto DCA order name</TableHead>
                      <TableHead>Created time</TableHead>
                      <TableHead>Last order time</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Asset</TableHead>
                      <TableHead>Allocation</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Recurring time</TableHead>
                      <TableHead>Total cost</TableHead>
                      <TableHead>Accumulated buy</TableHead>
                      <TableHead>Average price</TableHead>
                      <TableHead>% PnL</TableHead>
                      <TableHead>Past rounds</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {closedDcaOrders.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={14} className="text-center py-8">
                          <p className="text-muted-foreground">
                            No closed Auto DCA plans found
                          </p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default DashboardView;
