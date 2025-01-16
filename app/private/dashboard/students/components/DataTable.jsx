import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function DataTable({ data }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20";
      case "lead":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      case "inactive":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  return (
    <div className="w-full overflow-auto rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[250px]">Client</TableHead>
            <TableHead className="min-w-[200px]">Contact</TableHead>
            <TableHead className="min-w-[200px]">Program</TableHead>
            <TableHead className="min-w-[200px]">University</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[120px]">Commission</TableHead>
            <TableHead className="w-[100px]">Documents</TableHead>
            <TableHead className="w-[80px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((client) => (
            <TableRow 
              key={client._id}
              className="hover:bg-muted/50 transition-colors"
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="border-2 border-primary/10">
                    <AvatarFallback className="bg-primary/5 text-primary">
                      {getInitials(client.personalInfo.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{client.personalInfo.fullName}</div>
                    <div className="text-sm text-muted-foreground">
                      {client.clientId || "Pending"}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm space-y-1">
                  <div className="text-primary">{client.personalInfo.email}</div>
                  <div className="text-muted-foreground">{client.personalInfo.phone}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm space-y-1">
                  <div>{client.academicInfo.program.name}</div>
                  <div className="text-muted-foreground capitalize">
                    {client.academicInfo.program.level} - {client.academicInfo.program.major}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm space-y-1">
                  <div>{client.academicInfo.university.name}</div>
                  <div className="text-muted-foreground">
                    {client.academicInfo.university.country}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={cn("capitalize", getStatusColor(client.status))}>
                  {client.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="font-medium text-primary">
                  ${client.commission.toLocaleString()}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-normal">
                  {client.documents?.length || 0} docs
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href={`/private/dashboard/students/${client._id}`} className="cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/private/dashboard/students/${client._id}/edit`} className="cursor-pointer">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Client
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 