import React from "react";



export default function StudentsCard({ name, email, saleAmount }) {
  return (
    <div className="flex items-center justify-between space-x-4 rounded-md p-4 transition-all hover:bg-accent">
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
      <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
        {saleAmount}
      </div>
    </div>
  );
}