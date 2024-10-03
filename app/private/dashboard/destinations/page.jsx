"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MapPin,
  GraduationCap,
  Users,
  Calendar,
  DollarSign,
  Globe,
  Trash2,
  Edit,
  Plus,
} from "lucide-react";
import Image from "next/image";

// type Destination = {
//   id: number
//   name: string
//   country: string
//   description: string
//   universities: number
//   students: number
//   duration: string
//   cost: number
//   language: string
//   image: string
// }

const initialDestinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    description:
      "Experience the City of Light and its world-renowned educational institutions.",
    universities: 13,
    students: 250,
    duration: "1 Semester - 1 Year",
    cost: 15000,
    language: "French",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan",
    description:
      "Immerse yourself in Japanese culture while studying at top-tier universities.",
    universities: 15,
    students: 180,
    duration: "1 Semester - 1 Year",
    cost: 18000,
    language: "Japanese",
    image: "/placeholder.svg?height=100&width=200",
  },
];

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState(initialDestinations);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDestination, setCurrentDestination] = useState(null);

  const handleCreate = (newDestination) => {
    const id =
      destinations.length > 0
        ? Math.max(...destinations.map((d) => d.id)) + 1
        : 1;
    setDestinations([...destinations, { ...newDestination, id }]);
  };

  const handleUpdate = (updatedDestination) => {
    setDestinations(
      destinations.map((d) =>
        d.id === updatedDestination.id ? updatedDestination : d
      )
    );
  };

  const handleDelete = (id) => {
    setDestinations(destinations.filter((d) => d.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Destinations</h1>
      <div className="mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Destination
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit Destination" : "Add New Destination"}
              </DialogTitle>
              <DialogDescription>
                Enter the details for the new destination. Click save when
                you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <DestinationForm
              onSubmit={(destination) => {
                if (isEditing && currentDestination) {
                  handleUpdate({ ...destination, id: currentDestination.id });
                } else {
                  handleCreate(destination);
                }
                setIsEditing(false);
                setCurrentDestination(null);
              }}
              initialData={currentDestination}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {destinations.map((destination) => (
          <Card key={destination.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                {destination.name}, {destination.country}
              </CardTitle>
              <CardDescription>{destination.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={destination.image}
                alt={destination.name}
                width={200}
                height={100}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <GraduationCap className="inline mr-2" /> Universities
                    </TableCell>
                    <TableCell className="text-right">
                      {destination.universities}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Users className="inline mr-2" /> Students
                    </TableCell>
                    <TableCell className="text-right">
                      {destination.students}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Calendar className="inline mr-2" /> Duration
                    </TableCell>
                    <TableCell className="text-right">
                      {destination.duration}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <DollarSign className="inline mr-2" /> Cost
                    </TableCell>
                    <TableCell className="text-right">
                      ${destination.cost.toLocaleString()}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Globe className="inline mr-2" /> Language
                    </TableCell>
                    <TableCell className="text-right">
                      {destination.language}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(true);
                      setCurrentDestination(destination);
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Destination</DialogTitle>
                    <DialogDescription>
                      Make changes to the destination. Click save when
                      you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <DestinationForm
                    onSubmit={(updatedDestination) => {
                      handleUpdate({
                        ...updatedDestination,
                        id: destination.id,
                      });
                      setIsEditing(false);
                      setCurrentDestination(null);
                    }}
                    initialData={destination}
                  />
                </DialogContent>
              </Dialog>
              <Button
                variant="destructive"
                onClick={() => handleDelete(destination.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

// type DestinationFormProps = {
//   onSubmit: (destination: Omit<Destination, 'id'>) => void
//   initialData?: Destination | null
// }

function DestinationForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      country: "",
      description: "",
      universities: 0,
      students: 0,
      duration: "",
      cost: 0,
      language: "",
      image: "/placeholder.svg?height=100&width=200",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="country" className="text-right">
            Country
          </Label>
          <Input
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="universities" className="text-right">
            Universities
          </Label>
          <Input
            id="universities"
            name="universities"
            type="number"
            value={formData.universities}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="students" className="text-right">
            Students
          </Label>
          <Input
            id="students"
            name="students"
            type="number"
            value={formData.students}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="duration" className="text-right">
            Duration
          </Label>
          <Input
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="cost" className="text-right">
            Cost
          </Label>
          <Input
            id="cost"
            name="cost"
            type="number"
            value={formData.cost}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="language" className="text-right">
            Language
          </Label>
          <Input
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </form>
  );
}
