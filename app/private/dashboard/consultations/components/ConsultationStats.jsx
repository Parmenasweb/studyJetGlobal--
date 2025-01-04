import { Card } from "@/components/ui/card";

export default function ConsultationStats({ stats }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <div className="p-6">
          <div className="space-y-1">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-xs text-muted-foreground">
              Total Consultations
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="p-6">
          <div className="space-y-1">
            <p className="text-2xl font-bold">{stats.pending}</p>
            <p className="text-xs text-muted-foreground">
              Pending Consultations
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="p-6">
          <div className="space-y-1">
            <p className="text-2xl font-bold">{stats.confirmed}</p>
            <p className="text-xs text-muted-foreground">
              Confirmed Consultations
            </p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="p-6">
          <div className="space-y-1">
            <p className="text-2xl font-bold">{stats.completed}</p>
            <p className="text-xs text-muted-foreground">
              Completed Consultations
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
} 