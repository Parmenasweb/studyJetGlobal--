import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CardHeader, CardFooter, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StudentCard() {
  return (
    <Card className="w-full max-w-sm rounded-xl border">
      <CardHeader className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12 border">
            <AvatarImage
              alt="@shadcn"
              height={48}
              src="/placeholder.svg"
              width={48}
            />
            <AvatarFallback>@</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-lg font-bold">@shadcn</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              User interface by Vercel
            </p>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="p-4 flex justify-end gap-2">
        <Button size="sm" variant="outline">
          Follow
        </Button>
        <Button size="sm">Message</Button>
      </CardFooter>
    </Card>
  );
}
