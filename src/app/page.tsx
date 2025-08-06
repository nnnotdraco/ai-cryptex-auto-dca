"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Clock,
  DollarSign,
  LineChart,
  Menu,
  Plus,
  Repeat,
  Shield,
  X,
} from "lucide-react";
import SetupWizard from "@/components/auto-dca/SetupWizard";
import DashboardView from "@/components/auto-dca/DashboardView";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const [currentView, setCurrentView] = useState<
    "landing" | "setup" | "dashboard"
  >("landing");
  const [dcaPlans, setDcaPlans] = useState<any[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStartDCA = () => {
    setCurrentView("setup");
  };

  const handleDCAComplete = (dcaConfig: any) => {
    setDcaPlans((prev) => [...prev, { ...dcaConfig, id: Date.now() }]);
    setCurrentView("dashboard");
  };

  const handleViewDashboard = () => {
    setCurrentView("dashboard");
  };

  const handleBackToLanding = () => {
    setCurrentView("landing");
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 bg-gray-300 rounded"></div>
            <div className="h-6 w-20 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === "setup") {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
          <div className="container flex h-16 items-center justify-between">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleBackToLanding}
            >
              <LineChart className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Cryptex</span>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="outline"
                onClick={handleBackToLanding}
                className="hidden sm:flex"
              >
                Back to Home
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleBackToLanding}
                className="sm:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>
        <div className="container py-8">
          <SetupWizard onComplete={handleDCAComplete} />
        </div>
      </div>
    );
  }

  if (currentView === "dashboard") {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
          <div className="container flex h-16 items-center justify-between">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleBackToLanding}
            >
              <LineChart className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Cryptex</span>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <div className="hidden sm:flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentView("setup")}
                >
                  Create New DCA
                </Button>
                <Button variant="outline" onClick={handleBackToLanding}>
                  Back to Home
                </Button>
              </div>
              <div className="sm:hidden flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentView("setup")}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleBackToLanding}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>
        <DashboardView onCreateNewDCA={() => setCurrentView("setup")} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <LineChart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Cryptex</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              How it works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Desktop Auth Buttons */}
            <div className="hidden sm:flex items-center gap-4">
              <Button variant="outline" size="default">
                Sign In
              </Button>
              <Button size="default">Sign Up</Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-background/95 backdrop-blur">
            <div className="container py-4 space-y-4">
              <nav className="flex flex-col space-y-3">
                <Link
                  href="#features"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How it works
                </Link>
                <Link
                  href="#testimonials"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Testimonials
                </Link>
                <Link
                  href="#faq"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
              </nav>
              <div className="flex flex-col sm:hidden gap-2 pt-2 border-t">
                <Button variant="outline" size="default">
                  Sign In
                </Button>
                <Button size="default">Sign Up</Button>
              </div>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-8 space-y-6 sm:py-12 md:py-16 lg:py-24 xl:py-32">
          <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-5xl px-4">
              Automate Your Crypto Investments with{" "}
              <span className="text-primary">Cryptex</span>
            </h1>
            <p className="max-w-[700px] text-muted-foreground text-lg sm:text-xl md:text-2xl px-4 leading-relaxed">
              Set up automated, scheduled cryptocurrency purchases with
              customizable asset allocation and tracking features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center items-center">
              <Button
                size="xl"
                className="gap-2 w-full sm:w-auto"
                onClick={handleStartDCA}
              >
                Create Your First Auto DCA
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="w-full sm:w-auto"
                onClick={handleViewDashboard}
              >
                View Dashboard
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="container py-16 sm:py-20 md:py-24 space-y-12 sm:space-y-16"
        >
          <div className="text-center space-y-4 sm:space-y-6 px-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Key Features
            </h2>
            <p className="max-w-[800px] mx-auto text-muted-foreground text-lg sm:text-xl md:text-2xl leading-relaxed">
              Everything you need to automate your cryptocurrency investments
              and build wealth over time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            <Card className="bg-background hover:shadow-lg transition-shadow p-2 sm:p-4">
              <CardHeader className="pb-4 sm:pb-6">
                <DollarSign className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-primary mb-3 sm:mb-4" />
                <CardTitle className="text-xl sm:text-2xl md:text-3xl">
                  Dollar Cost Averaging
                </CardTitle>
                <CardDescription className="text-base sm:text-lg">
                  Reduce the impact of volatility by investing a fixed amount at
                  regular intervals.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-base sm:text-lg leading-relaxed">
                  Automatically buy crypto on your schedule regardless of market
                  conditions, helping you avoid emotional decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background hover:shadow-lg transition-shadow p-2 sm:p-4">
              <CardHeader className="pb-4 sm:pb-6">
                <Repeat className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-primary mb-3 sm:mb-4" />
                <CardTitle className="text-xl sm:text-2xl md:text-3xl">
                  Flexible Scheduling
                </CardTitle>
                <CardDescription className="text-base sm:text-lg">
                  Choose daily, weekly, or monthly investments that fit your
                  strategy.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-base sm:text-lg leading-relaxed">
                  Set your preferred frequency, date, time, and duration for
                  your automated purchases with just a few clicks.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1 p-2 sm:p-4">
              <CardHeader className="pb-4 sm:pb-6">
                <Clock className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-primary mb-3 sm:mb-4" />
                <CardTitle className="text-xl sm:text-2xl md:text-3xl">
                  Set & Forget
                </CardTitle>
                <CardDescription className="text-base sm:text-lg">
                  Create your plan once and let the system handle the rest.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-base sm:text-lg leading-relaxed">
                  No need to manually place orders - the system automatically
                  executes your strategy according to your preferences.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-16 sm:py-20 md:py-24 bg-muted/50"
        >
          <div className="container space-y-12 sm:space-y-16">
            <div className="text-center space-y-4 sm:space-y-6 px-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                How Auto DCA Works
              </h2>
              <p className="max-w-[800px] mx-auto text-muted-foreground text-lg sm:text-xl md:text-2xl leading-relaxed">
                Set up your automated investment plan in just 3 simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
              <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 p-4 sm:p-6">
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-primary text-primary-foreground text-2xl sm:text-3xl md:text-4xl font-bold">
                  1
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  Asset Allocation
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed max-w-sm">
                  Select cryptocurrencies and allocate percentages for each
                  asset in your portfolio.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 p-4 sm:p-6">
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-primary text-primary-foreground text-2xl sm:text-3xl md:text-4xl font-bold">
                  2
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  Recurring Schedule
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed max-w-sm">
                  Choose your investment frequency, date, time, and duration for
                  automated purchases.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 p-4 sm:p-6">
                <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-primary text-primary-foreground text-2xl sm:text-3xl md:text-4xl font-bold">
                  3
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  Investment Amount
                </h3>
                <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed max-w-sm">
                  Set your total investment amount per order and review your
                  Auto DCA plan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="container py-16 sm:py-20 md:py-24 space-y-12 sm:space-y-16">
          <div className="text-center space-y-4 sm:space-y-6 px-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Track Your Progress
            </h2>
            <p className="max-w-[800px] mx-auto text-muted-foreground text-lg sm:text-xl md:text-2xl leading-relaxed">
              Monitor your Auto DCA plans, purchase history, and performance
              metrics in one place.
            </p>
          </div>

          <Tabs defaultValue="active" className="w-full max-w-md mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">
                <span className="hidden sm:inline">Opening Auto DCA</span>
                <span className="sm:hidden">Active</span>
              </TabsTrigger>
              <TabsTrigger value="history">
                <span className="hidden sm:inline">Buy History</span>
                <span className="sm:hidden">History</span>
              </TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-6">
              <div className="text-center p-8 border rounded-lg">
                <p className="text-muted-foreground">
                  Your active Auto DCA plans will appear here once you create
                  them.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="history" className="mt-6">
              <div className="text-center p-8 border rounded-lg">
                <p className="text-muted-foreground">
                  Your purchase history will be displayed here.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="closed" className="mt-6">
              <div className="text-center p-8 border rounded-lg">
                <p className="text-muted-foreground">
                  Your closed Auto DCA plans will be shown here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-12 sm:py-16 bg-muted/50">
          <div className="container space-y-8 sm:space-y-12">
            <div className="text-center space-y-4 px-4">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                What Our Users Say
              </h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground text-sm sm:text-base">
                Join thousands of investors who are building their crypto
                portfolio with Cryptex.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <Card className="bg-background hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                      AT
                    </div>
                    <div>
                      <CardTitle className="text-base sm:text-lg">
                        Alex T.
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        Investing since 2021
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="italic text-sm sm:text-base">
                    &quot;Cryptex has completely transformed how I invest in
                    crypto. The automated purchases have helped me stay
                    consistent even during market downturns.&quot;
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                      SM
                    </div>
                    <div>
                      <CardTitle className="text-base sm:text-lg">
                        Sarah M.
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        Investing since 2022
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="italic text-sm sm:text-base">
                    &quot;I love how easy it is to set up multiple DCA plans
                    with different assets. The performance tracking helps me
                    understand my investment growth over time.&quot;
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                      DK
                    </div>
                    <div>
                      <CardTitle className="text-base sm:text-lg">
                        David K.
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        Investing since 2020
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="italic text-sm sm:text-base">
                    &quot;As someone who used to try timing the market,
                    switching to Auto DCA has reduced my stress and actually
                    improved my returns. Highly recommended!&quot;
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-16 sm:py-20 md:py-24 space-y-8">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Ready to Start Your Auto DCA Journey?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl max-w-[800px] mx-auto px-4 leading-relaxed text-muted-foreground">
              Join thousands of investors who are building their crypto
              portfolio consistently with Cryptex's automated dollar cost
              averaging.
            </p>
            <div className="pt-4 sm:pt-6">
              <Button
                size="xl"
                className="gap-2 w-full sm:w-auto"
                onClick={handleStartDCA}
              >
                Create Your First Auto DCA
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-12 sm:py-16 bg-muted/50">
          <div className="container space-y-8 sm:space-y-12">
            <div className="text-center space-y-4 px-4">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground text-sm sm:text-base">
                Find answers to common questions about Auto DCA and how it
                works.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4 px-4">
              <Card className="bg-background hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base sm:text-lg">
                    What is Dollar Cost Averaging (DCA)?
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm sm:text-base">
                    Dollar Cost Averaging is an investment strategy where you
                    invest a fixed amount at regular intervals, regardless of
                    the asset's price. This approach helps reduce the impact of
                    volatility and eliminates the need to time the market.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base sm:text-lg">
                    How does Auto DCA work?
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm sm:text-base">
                    Auto DCA automatically places market buy orders according to
                    your predefined schedule and conditions. You set up the
                    cryptocurrencies, allocation percentages, frequency, and
                    investment amount, and the system handles the rest.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base sm:text-lg">
                    What happens if I don&apos;t have enough funds?
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm sm:text-base">
                    If your wallet balance is insufficient when a scheduled
                    purchase is due, the system will skip that particular round
                    without affecting future scheduled orders.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-background hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base sm:text-lg">
                    Can I modify or cancel my Auto DCA plan?
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm sm:text-base">
                    Yes, you can cancel your Auto DCA plan at any time by going
                    to the Auto DCA page, selecting the Opening Auto DCA menu,
                    and clicking Cancel. The system will immediately stop
                    submitting orders.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="border-t py-6 sm:py-8 bg-background">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 px-4">
          <div className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">Cryptex</span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Cryptex. All rights reserved. Powered
            by advanced crypto investment technology.
          </p>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Shield className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
