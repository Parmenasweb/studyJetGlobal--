"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  GraduationCap,
  Handshake,
  MessageCircle,
  FileCheck,
  Plane,
  HelpCircle,
  DollarSign,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const INCOME_CATEGORIES = [
  {
    id: "application-fee",
    title: "Application Fee",
    description: "Student application processing fees",
    icon: FileText,
    color: "text-blue-500",
  },
  {
    id: "tuition-fee",
    title: "Tuition Fee",
    description: "Student tuition payments",
    icon: GraduationCap,
    color: "text-green-500",
  },
  {
    id: "commission",
    title: "Commission",
    description: "Partner university and agency commissions",
    icon: DollarSign,
    color: "text-purple-500",
  },
  {
    id: "service-fee",
    title: "Service Fee",
    description: "General service charges",
    icon: Handshake,
    color: "text-orange-500",
  },
  {
    id: "consultation-fee",
    title: "Consultation Fee",
    description: "Student consultation charges",
    icon: MessageCircle,
    color: "text-pink-500",
  },
  {
    id: "document-processing",
    title: "Document Processing",
    description: "Document handling and processing fees",
    icon: FileCheck,
    color: "text-yellow-600",
  },
  {
    id: "visa-assistance",
    title: "Visa Assistance",
    description: "Visa application support charges",
    icon: Plane,
    color: "text-sky-500",
  },
  {
    id: "other",
    title: "Other Income",
    description: "Other miscellaneous income",
    icon: HelpCircle,
    color: "text-gray-500",
  },
];

export function IncomeCategoryDialog({ isOpen, onClose, onCategorySelect }) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-4xl">
        <div className="flex justify-between items-center">
          <AlertDialogHeader className="flex-1">
            <AlertDialogTitle>Select Income Category</AlertDialogTitle>
            <AlertDialogDescription>
              Choose the category that best describes this income entry
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
          {INCOME_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className={cn(
                  "cursor-pointer transition-all hover:scale-[1.02]",
                  "border hover:border-primary",
                )}
                onClick={() => {
                  onCategorySelect(category.id);
                }}
              >
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className={cn(
                      "p-2 rounded-lg bg-gray-50",
                      category.color
                    )}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{category.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 