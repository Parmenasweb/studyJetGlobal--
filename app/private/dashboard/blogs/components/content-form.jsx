'use client'

import { useEffect, useState } from 'react'
// import { createBlogAction } from '@/lib/actions'
import { toast } from 'sonner'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import Editor from './editor/editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label';

export const defaultValue = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: []
    }
  ]
}

export default function ContentForm() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [pending, setPending] = useState(false)

  useEffect(() => {
    const name = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

    setSlug(name)
  }, [title])

  async function handleSubmit() {
    // TODO: validate the data

    console.log(title, slug, content,category)

    // setPending(true)

    // const result = await createBlogAction({ title, slug, content })

    // if (result?.error) {
    //   toast.error(result.error)
    // }

    // setPending(false)
  }

  return (
    <div className='mt-6 flex max-w-2xl flex-col gap-4'>
      <div className='flex gap-4'>
        <Input
          type='text'
          placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Input
          type='text'
          placeholder='Slug'
          value={slug}
          onChange={e => setSlug(e.target.value)}
        />
      </div>
      <div className="space-y-2">
              <Label htmlFor="duration">select blog category</Label>
              <Select
                // id="duration"
                // onChange={handleChange}
                onValueChange={(value) =>
                  setCategory(value)
                }
                name="category"
                value={category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Blog category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="study abroad guide">guide</SelectItem>
                  <SelectItem value="Reviews">Review</SelectItem>
                  <SelectItem value="Tips">tip</SelectItem>
                  <SelectItem value="Events">events and updates</SelectItem>
                  <SelectItem value="FAQS">FAQS</SelectItem>
                </SelectContent>
              </Select>
            </div>

      <Editor initialValue={defaultValue} onChange={setContent} />
      <Button onClick={handleSubmit} disabled={pending}>
        {pending ? 'Submitting...' : 'Create'}
      </Button>
    </div>
  )
}