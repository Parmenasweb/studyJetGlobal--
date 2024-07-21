import ApplyButton from "@/components/Applybutton";
import Image from "next/image";

export default function PartnerCard({ name, imageUrl, date }) {
  return (
    <div className="flex flex-col items-start gap-1 rounded-lg bg-muted p-4">
      <Image
        src={imageUrl}
        width={300}
        height={200}
        alt="study abroad Destination Image"
        className="mb-4 rounded-lg object-cover"
      />
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-muted-foreground">
        Successful partnership since ,{" "}
        <span className="font-semibold">{date}</span>
      </p>
      <ApplyButton value="Apply Now" />
    </div>
  );
}
