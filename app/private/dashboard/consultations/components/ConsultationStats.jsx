"use client";

import { Card } from "@/components/ui/card";
import { 
  CalendarClock, 
  CheckCircle2, 
  Clock, 
  Users,
  XCircle
} from "lucide-react";

const statConfigs = [
  {
    key: "total",
    label: "Total Consultations",
    icon: Users,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    key: "pending",
    label: "Pending Consultations",
    icon: Clock,
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    key: "confirmed",
    label: "Confirmed Consultations",
    icon: CalendarClock,
    iconColor: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    key: "completed",
    label: "Completed Consultations",
    icon: CheckCircle2,
    iconColor: "text-green-500",
    bgColor: "bg-green-500/10",
  },
];

export default function ConsultationStats({ stats }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statConfigs.map((config) => {
        const Icon = config.icon;
        return (
          <Card key={config.key} className="relative overflow-hidden">
            <div className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-2xl font-bold">{stats[config.key]}</p>
                <p className="text-xs text-muted-foreground">
                  {config.label}
                </p>
              </div>
              <div className={`p-3 rounded-full ${config.bgColor}`}>
                <Icon className={`h-5 w-5 ${config.iconColor}`} />
              </div>
            </div>
            <div className={`absolute inset-0 pointer-events-none ${config.bgColor} opacity-[0.08] blur-[2px]`} />
          </Card>
        );
      })}
    </div>
  );
} 