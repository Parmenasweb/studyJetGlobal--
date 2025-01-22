import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, GraduationCap, School, Clock } from "lucide-react";

function MetricsCard({ title, value, icon: Icon, iconColor }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`rounded-full p-3 ${iconColor}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </CardContent>
    </Card>
  );
}

export function MetricsCards({ programs }) {
  // Calculate metrics
  const totalPrograms = programs.length;
  const activePrograms = programs.filter(p => p.status === "active").length;
  const bachelorPrograms = programs.filter(p => p.level === "Bachelor's").length;
  const masterPrograms = programs.filter(p => p.level === "Master's").length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricsCard
        title="Total Programs"
        value={totalPrograms}
        icon={BookOpen}
        iconColor="bg-blue-500"
      />
      <MetricsCard
        title="Active Programs"
        value={activePrograms}
        icon={Clock}
        iconColor="bg-green-500"
      />
      <MetricsCard
        title="Bachelor's Programs"
        value={bachelorPrograms}
        icon={GraduationCap}
        iconColor="bg-purple-500"
      />
      <MetricsCard
        title="Master's Programs"
        value={masterPrograms}
        icon={School}
        iconColor="bg-orange-500"
      />
    </div>
  );
} 