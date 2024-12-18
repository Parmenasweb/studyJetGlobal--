import { cn } from "@/lib/utils";
import { 
  DollarSign, 
  GraduationCap, 
  Briefcase, 
  Users, 
  Clock, 
  CheckCircle 
} from "lucide-react";

export default function DashboardCards({ data }) {
  return (
    <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 lg:grid-cols-3">
      {/* Revenue Card */}
      <CardContainer>
        <section className="flex justify-between gap-2">
          <p className="text-sm text-muted-foreground">Total Revenue</p>
          <DollarSign className="h-4 w-4 text-muted-foreground"/>
        </section>
        <section className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold text-foreground">$45,231.89</h2>
          <p className="text-xs text-muted-foreground">Total commissions received</p>
        </section>
      </CardContainer>

      {/* Study Clients Card */}
      <CardContainer>
        <section className="flex justify-between gap-2">
          <p className="text-sm text-muted-foreground">Study Clients</p>
          <GraduationCap className="h-4 w-4 text-muted-foreground"/>
        </section>
        <section className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold text-foreground">156</h2>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Total study applications</p>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+12%</span>
          </div>
        </section>
      </CardContainer>

      {/* Work Clients Card */}
      <CardContainer>
        <section className="flex justify-between gap-2">
          <p className="text-sm text-muted-foreground">Work Clients</p>
          <Briefcase className="h-4 w-4 text-muted-foreground"/>
        </section>
        <section className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold text-foreground">89</h2>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Total work applications</p>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+8%</span>
          </div>
        </section>
      </CardContainer>

      {/* Active Applications */}
      <CardContainer>
        <section className="flex justify-between gap-2">
          <p className="text-sm text-muted-foreground">Active Applications</p>
          <Clock className="h-4 w-4 text-muted-foreground"/>
        </section>
        <section className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold text-foreground">45</h2>
          <div className="flex flex-col text-xs text-muted-foreground">
            <span>32 Study • 13 Work</span>
            <span>In progress</span>
          </div>
        </section>
      </CardContainer>

      {/* Completed Applications */}
      <CardContainer>
        <section className="flex justify-between gap-2">
          <p className="text-sm text-muted-foreground">Completed</p>
          <CheckCircle className="h-4 w-4 text-muted-foreground"/>
        </section>
        <section className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold text-foreground">200</h2>
          <div className="flex flex-col text-xs text-muted-foreground">
            <span>145 Study • 55 Work</span>
            <span>Successfully placed</span>
          </div>
        </section>
      </CardContainer>

      {/* Total Clients */}
      <CardContainer>
        <section className="flex justify-between gap-2">
          <p className="text-sm text-muted-foreground">Total Clients</p>
          <Users className="h-4 w-4 text-muted-foreground"/>
        </section>
        <section className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold text-foreground">245</h2>
          <div className="flex flex-col text-xs text-muted-foreground">
            <span>177 Study • 68 Work</span>
            <span>All time clients</span>
          </div>
        </section>
      </CardContainer>
    </section>
  );
}

export function CardContainer(props) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full flex-col gap-3 rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow",
        props.className
      )}
    />
  );
}