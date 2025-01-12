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

export function DataTable({ data }) {
  // Function to get initials from full name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Function to get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "lead":
        return "bg-blue-500";
      case "inactive":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Program</TableHead>
          <TableHead>University</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Commission</TableHead>
          <TableHead>Documents</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((client) => (
          <TableRow key={client._id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {getInitials(client.personalInfo.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{client.personalInfo.fullName}</div>
                  <div className="text-sm text-gray-500">
                    {client.clientId || "Pending"}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="text-sm">
                <div>{client.personalInfo.email}</div>
                <div className="text-gray-500">{client.personalInfo.phone}</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="text-sm">
                <div>{client.academicInfo.program.name}</div>
                <div className="text-gray-500 capitalize">
                  {client.academicInfo.program.level} - {client.academicInfo.program.major}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="text-sm">
                <div>{client.academicInfo.university.name}</div>
                <div className="text-gray-500">
                  {client.academicInfo.university.country}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge className={getStatusColor(client.status)}>
                {client.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="font-medium">
                ${client.commission.toLocaleString()}
              </div>
            </TableCell>
            <TableCell>
              <div className="text-sm">
                {client.documents?.length || 0} documents
              </div>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href={`/private/dashboard/students/${client._id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/private/dashboard/students/${client._id}/edit`}>
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
  );
} 