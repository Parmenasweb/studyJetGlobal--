import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ConsultationForm from "./forms/consultationForm";
export default function ApplyButton({ value, className }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className} variant="outline">
          {value}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[90vh] ">
        <DialogTitle>Contact Information</DialogTitle>
        <ConsultationForm />
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
