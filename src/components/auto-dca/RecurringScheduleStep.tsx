"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface RecurringScheduleStepProps {
  onNext?: () => void;
  onBack?: () => void;
  onUpdateSchedule?: (scheduleData: RecurringScheduleData) => void;
  initialData?: RecurringScheduleData;
}

export interface RecurringScheduleData {
  frequency: "Daily" | "Weekly" | "Monthly";
  date?: string | number;
  time?: string;
  duration?: string;
  startDate?: Date;
  endDate?: Date;
}

const RecurringScheduleStep: React.FC<RecurringScheduleStepProps> = ({
  onNext = () => {},
  onBack = () => {},
  onUpdateSchedule = () => {},
  initialData = {
    frequency: "Monthly",
    date: "15th",
    time: "17:00",
    duration: "12 months",
    startDate: new Date(),
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  },
}) => {
  const [scheduleData, setScheduleData] =
    useState<RecurringScheduleData>(initialData);
  const [date, setDate] = useState<Date | undefined>(initialData.startDate);

  const handleFrequencyChange = (value: "Daily" | "Weekly" | "Monthly") => {
    setScheduleData((prev) => {
      const updated = { ...prev, frequency: value };
      onUpdateSchedule(updated);
      return updated;
    });
  };

  const handleDateChange = (value: string) => {
    setScheduleData((prev) => {
      const updated = { ...prev, date: value };
      onUpdateSchedule(updated);
      return updated;
    });
  };

  const handleTimeChange = (value: string) => {
    setScheduleData((prev) => {
      const updated = { ...prev, time: value };
      onUpdateSchedule(updated);
      return updated;
    });
  };

  const handleDurationChange = (value: string) => {
    setScheduleData((prev) => {
      const updated = { ...prev, duration: value };
      onUpdateSchedule(updated);
      return updated;
    });
  };

  const handleCalendarSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setScheduleData((prev) => {
        const updated = { ...prev, startDate: selectedDate };
        onUpdateSchedule(updated);
        return updated;
      });
    }
  };

  return (
    <Card className="w-full bg-background border rounded-lg shadow-sm">
      <CardContent className="p-6 sm:p-8 md:p-10">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">2. Recurring period</h2>
            <p className="text-muted-foreground mb-6">
              Choose how often you want to invest and set your schedule
            </p>
          </div>

          {/* Frequency Selection */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={
                scheduleData.frequency === "Daily" ? "default" : "outline"
              }
              className="w-full"
              onClick={() => handleFrequencyChange("Daily")}
            >
              Daily
            </Button>
            <Button
              variant={
                scheduleData.frequency === "Weekly" ? "default" : "outline"
              }
              className="w-full"
              onClick={() => handleFrequencyChange("Weekly")}
            >
              Weekly
            </Button>
            <Button
              variant={
                scheduleData.frequency === "Monthly" ? "default" : "outline"
              }
              className="w-full"
              onClick={() => handleFrequencyChange("Monthly")}
            >
              Monthly
            </Button>
          </div>

          {/* Date Selection - changes based on frequency */}
          <div className="space-y-4">
            {scheduleData.frequency === "Monthly" && (
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="date"
                    value={scheduleData.date || ""}
                    onChange={(e) => handleDateChange(e.target.value)}
                    placeholder="15th"
                    className="w-full"
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon">
                        <CalendarIcon className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleCalendarSelect}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}

            {scheduleData.frequency === "Weekly" && (
              <div className="space-y-2">
                <Label htmlFor="day">Day of week</Label>
                <Select
                  value={scheduleData.date?.toString() || "Sunday"}
                  onValueChange={handleDateChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sunday">Sunday</SelectItem>
                    <SelectItem value="Monday">Monday</SelectItem>
                    <SelectItem value="Tuesday">Tuesday</SelectItem>
                    <SelectItem value="Wednesday">Wednesday</SelectItem>
                    <SelectItem value="Thursday">Thursday</SelectItem>
                    <SelectItem value="Friday">Friday</SelectItem>
                    <SelectItem value="Saturday">Saturday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Time Selection */}
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="time"
                  value={scheduleData.time || ""}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  placeholder="17:00"
                  className="w-full"
                />
                <Button variant="outline" size="icon">
                  <Clock className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Duration Selection */}
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select
                value={scheduleData.duration || "12 months"}
                onValueChange={handleDurationChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3 months">3 months</SelectItem>
                  <SelectItem value="6 months">6 months</SelectItem>
                  <SelectItem value="12 months">12 months</SelectItem>
                  <SelectItem value="24 months">24 months</SelectItem>
                  <SelectItem value="36 months">36 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button onClick={onNext}>Next</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecurringScheduleStep;
