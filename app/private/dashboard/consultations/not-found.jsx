import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileQuestion } from "lucide-react";

export default function ConsultationsNotFound() {
  return (
    <div className="flex items-center justify-center h-full p-6">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <FileQuestion className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">
              No Consultations Found
            </h2>
            <p className="text-muted-foreground">
              We couldn&apos;t find the consultations you&apos;re looking for. They might have been moved or deleted.
            </p>
            <div className="flex gap-4 mt-4">
              <Button variant="outline" asChild>
                <Link href="/private/dashboard">Go to Dashboard</Link>
              </Button>
              <Button asChild>
                <Link href="/private/dashboard/consultations">
                  View All Consultations
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 