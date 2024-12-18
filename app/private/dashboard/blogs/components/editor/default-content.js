export const defaultEditorContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Welcome to the Blog Editor" }]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "This is a rich text editor that supports various formatting options. Start writing your blog post here..."
        }
      ]
    },
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Features" }]
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Rich text formatting" }]
            }
          ]
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Image uploads" }]
            }
          ]
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Tables and lists" }]
            }
          ]
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Code blocks with syntax highlighting" }]
            }
          ]
        }
      ]
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Delete this content and start writing your blog post..."
        }
      ]
    }
  ]
}; 