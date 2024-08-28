"use client";

import ContentForm from './components/content-form';
import DataTable from '../students/components/data-table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { SquarePen } from 'lucide-react';

const columns = [
  {
    accessorKey: "title",
    header: "Blog Title"
  },
  {
    accessorKey: "slug",
    header: "Slug"
  },
  {
    accessorKey: "category",
    header: "Category"
  },
  {
    accessorKey: "date",
    header: "Date"
  }
];

const data = [
  {
    title: "How to travel abroad",
    slug: "how-to-travel-abroad",
    category: "Events and Updates",
    date: "2023-02-15"
  },
  {
    title: "How to travel abroad",
    slug: "how-to-travel-abroad",
    category: "Events and Updates",
    date: "2023-02-15"
  },
  {
    title: "How to travel abroad",
    slug: "how-to-travel-abroad",
    category: "Events and Updates",
    date: "2023-02-15"
  },
  {
    title: "How to travel abroad",
    slug: "how-to-travel-abroad",
    category: "Events and Updates",
    date: "2023-02-15"
  },
  {
    title: "How to travel abroad",
    slug: "how-to-travel-abroad",
    category: "Events and Updates",
    date: "2023-02-15"
  },
  {
    title: "How to travel abroad",
    slug: "how-to-travel-abroad",
    category: "Events and Updates",
    date: "2023-02-15"
  },
  {
    title: "How to travel abroad",
    slug: "how-to-travel-abroad",
    category: "Events and Updates",
    date: "2023-02-15"
  },
  {
    title: "How to travel abroad",
    slug: "how-to-travel-abroad",
    category: "Events and Updates",
    date: "2023-02-15"
  },
  {
    title: "How to travel abroad",
    slug: "how-to-travel-abroad",
    category: "Events and Updates",
    date: "2023-02-15"
  },
  {
    title: "How to travel abroad",
    slug: "how-to-travel-abroad",
    category: "Events and Updates",
    date: "2023-02-15"
  },
  {
    title: "How to travel abroad",
    slug: "how-to-travel-abroad",
    category: "Events and Updates",
    date: "2023-02-15"
  },
  {
    title: "How to travel abroad",
    slug: "how-to-travel-abroad",
    category: "Events and Updates",
    date: "2023-02-15"
  },
]

export default function BlogPage() {
  return (
    <section className='py-24'>
      <div className='container'>
        <h1 className='text-3xl font-bold'>Blog page</h1>
        <Dialog>
      <DialogTrigger asChild>
        <Button className="flex "><SquarePen />  Compose Blog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:w-[50%]">
        <DialogHeader>
          <DialogTitle>Write a blog post</DialogTitle>
        </DialogHeader>
          <ContentForm />
      </DialogContent>
    </Dialog>
        <DataTable columns={columns} data={data} />

        
      </div>
    </section>
  )
}