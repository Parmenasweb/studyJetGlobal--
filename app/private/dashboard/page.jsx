// import { redirect } from "next/navigation";
// import React from "react";
// import { auth } from "@/auth";
// import { useState } from "react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// const Dashboard = async () => {
//   const session = await auth();
//   const user = session?.user;
//   if (!user) return redirect("/auth/login");

//   // role based authorization
//   // if (user.role !== "admin") return redirect("/private/dashboard");

//   const [programs, setPrograms] = useState([
//     {
//       id: 1,
//       name: "Study in London",
//       description: "Experience the rich history and culture of London",
//       image: "/placeholder.svg?height=200&width=300",
//       status: "Active",
//     },
//     {
//       id: 2,
//       name: "Explore Tokyo",
//       description:
//         "Immerse yourself in the captivating blend of modern and traditional Japanese culture",
//       image: "/placeholder.svg?height=200&width=300",
//       status: "Active",
//     },
//     {
//       id: 3,
//       name: "Discover Sydney",
//       description:
//         "Discover the vibrant city life and stunning natural beauty of Sydney",
//       image: "/placeholder.svg?height=200&width=300",
//       status: "Active",
//     },
//   ]);
//   const [newProgram, setNewProgram] = useState({
//     name: "",
//     description: "",
//     image: "",
//     status: "Active",
//   });
//   const handleCreate = () => {
//     setPrograms([...programs, { ...newProgram, id: programs.length + 1 }]);
//     setNewProgram({ name: "", description: "", image: "", status: "Active" });
//   };
//   const handleUpdate = (id, updatedProgram) => {
//     setPrograms(
//       programs.map((program) =>
//         program.id === id ? { ...program, ...updatedProgram } : program
//       )
//     );
//   };
//   const handleDelete = (id) => {
//     setPrograms(programs.filter((program) => program.id !== id));
//   };
//   return (
//     <div className="flex flex-col min-h-screen">
//       <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
//         <Link href="#" className="flex items-center gap-2" prefetch={false}>
//           <GlobeIcon className="w-6 h-6" />
//           <span className="text-lg font-bold">Study Abroad Agency</span>
//         </Link>
//         <nav className="hidden md:flex items-center gap-6">
//           <Link href="#" className="hover:underline" prefetch={false}>
//             Programs
//           </Link>
//           <Link href="#" className="hover:underline" prefetch={false}>
//             Destinations
//           </Link>
//           <Link href="#" className="hover:underline" prefetch={false}>
//             About
//           </Link>
//           <Link href="#" className="hover:underline" prefetch={false}>
//             Contact
//           </Link>
//         </nav>
//         <Button variant="outline" size="icon" className="md:hidden">
//           <MenuIcon className="w-6 h-6" />
//         </Button>
//       </header>
//       <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//         <Card>
//           <CardHeader className="flex items-center justify-between">
//             <CardTitle>Active Programs</CardTitle>
//             <BookIcon className="w-6 h-6 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-4xl font-bold">{programs.length}</div>
//             <p className="text-muted-foreground">
//               Offering study abroad opportunities in 10 countries.
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex items-center justify-between">
//             <CardTitle>Enrolled Students</CardTitle>
//             <UsersIcon className="w-6 h-6 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-4xl font-bold">1,256</div>
//             <p className="text-muted-foreground">
//               Students from 15 different countries.
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex items-center justify-between">
//             <CardTitle>Total Revenue</CardTitle>
//             <DollarSignIcon className="w-6 h-6 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-4xl font-bold">$2.3M</div>
//             <p className="text-muted-foreground">
//               Increased by 15% from last year.
//             </p>
//           </CardContent>
//         </Card>
//         <div className="col-span-1 md:col-span-2 lg:col-span-3">
//           <Card>
//             <CardHeader>
//               <CardTitle>Featured Destinations</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {programs.map((program) => (
//                   <div key={program.id} className="flex flex-col gap-2">
//                     <Image
//                       src="/placeholder.svg"
//                       alt={program.name}
//                       className="rounded-lg"
//                     />
//                     <div>
//                       <h3 className="text-lg font-bold">{program.name}</h3>
//                       <p className="text-muted-foreground">
//                         {program.description}
//                       </p>
//                       <div className="flex items-center gap-2 mt-2">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() =>
//                             handleUpdate(program.id, {
//                               name: `Updated ${program.name}`,
//                               description: `Updated ${program.description}`,
//                               status: "Inactive",
//                             })
//                           }
//                         >
//                           Update
//                         </Button>
//                         <Button
//                           variant="destructive"
//                           size="sm"
//                           onClick={() => handleDelete(program.id)}
//                         >
//                           Delete
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//         <div className="col-span-1 md:col-span-2 lg:col-span-3">
//           <Card>
//             <CardHeader>
//               <CardTitle>Add New Program</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-4">
//                 <div className="grid gap-2">
//                   <Label htmlFor="name">Name</Label>
//                   <Input
//                     id="name"
//                     type="text"
//                     value={newProgram.name}
//                     onChange={(e) =>
//                       setNewProgram({ ...newProgram, name: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="description">Description</Label>
//                   <Textarea
//                     id="description"
//                     value={newProgram.description}
//                     onChange={(e) =>
//                       setNewProgram({
//                         ...newProgram,
//                         description: e.target.value,
//                       })
//                     }
//                     className="min-h-32"
//                   />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="image">Image</Label>
//                   <Input
//                     id="image"
//                     type="text"
//                     value={newProgram.image}
//                     onChange={(e) =>
//                       setNewProgram({ ...newProgram, image: e.target.value })
//                     }
//                   />
//                 </div>
//                 <Button onClick={handleCreate}>Create Program</Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>
//       <footer className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
//         <p className="text-sm">&copy; 2024 Study Abroad Agency</p>
//         <nav className="hidden md:flex items-center gap-6">
//           <Link href="#" className="hover:underline" prefetch={false}>
//             Privacy
//           </Link>
//           <Link href="#" className="hover:underline" prefetch={false}>
//             Terms
//           </Link>
//           <Link href="#" className="hover:underground" prefetch={false}>
//             Contact
//           </Link>
//         </nav>
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;

// // ? all svgs in the project

// function BookIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
//     </svg>
//   );
// }

// function DollarSignIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <line x1="12" x2="12" y1="2" y2="22" />
//       <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
//     </svg>
//   );
// }

// function GlobeIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="12" r="10" />
//       <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
//       <path d="M2 12h20" />
//     </svg>
//   );
// }

// function MenuIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <line x1="4" x2="20" y1="12" y2="12" />
//       <line x1="4" x2="20" y1="6" y2="6" />
//       <line x1="4" x2="20" y1="18" y2="18" />
//     </svg>
//   );
// }

// function UsersIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//       <circle cx="9" cy="7" r="4" />
//       <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
//       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//     </svg>
//   );
// }

// function XIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   );
// }
