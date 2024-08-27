import { cn } from "@/lib/utils";
import { DollarSign, Users, CreditCard, Activity, NotebookPen, UserPen, MessageSquareText   } from "lucide-react";

export default function DashboardCards () {
  return (
    <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all md:grid-cols-2 lg:grid-cols-4">
          <CardContainer>
            <section className="flex justify-between gap-2">
            {/* label */}
            <p className="text-sm">Total Revenue</p>
            {/* icon */}
                <DollarSign className="h-4 w-4 text-gray-500"/>
           </section>
            <section className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold">$45,231.89</h2>
            <p className="text-xs text-gray-500">amount received in commissions</p>
            </section>
      </CardContainer>
          <CardContainer>
            <section className="flex justify-between gap-2">
            {/* label */}
            <p className="text-sm">Total Applications</p>
            {/* icon */}
                <NotebookPen className="h-4 w-4 text-gray-500"/>
           </section>
            <section className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold">+200</h2>
            <p className="text-xs text-gray-500">total application processed</p>
            </section>
      </CardContainer>
          <CardContainer>
            <section className="flex justify-between gap-2">
            {/* label */}
            <p className="text-sm">Enrolled Students </p>
            {/* icon */}
                <UserPen  className="h-4 w-4 text-gray-500"/>
           </section>
            <section className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold">+25</h2>
            <p className="text-xs text-gray-500">total students enrolled under studyJet</p>
            </section>
      </CardContainer>
          <CardContainer>
            <section className="flex justify-between gap-2">
            {/* label */}
            <p className="text-sm">Consultations/Inquiries</p>
            {/* icon */}
                <MessageSquareText  className="h-4 w-4 text-gray-500"/>
           </section>
            <section className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold">+350</h2>
            <p className="text-xs text-gray-500">Number of new inquiries</p>
            </section>
      </CardContainer>
      </section>
  )
}






export function CardContainer(props) {
    return (
      <div
        {...props}
        className={cn(
          "flex w-full flex-col gap-3 rounded-xl border p-5 shadow",
          props.className
        )}
      />
    );
  }