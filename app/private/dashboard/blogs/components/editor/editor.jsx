"use client";

import { useState, useEffect } from "react";
import { defaultEditorContent } from "./default-content";

export default function BlogEditor({ initialValue, onChange }) {
  const [EditorComponent, setEditorComponent] = useState(null);

  useEffect(() => {
    import("novel").then((module) => {
      setEditorComponent(() => module.default);
    });
  }, []);

  if (!EditorComponent) {
    return (
      <div className="relative min-h-[500px] w-full max-w-screen-lg border border-stone-200 bg-white rounded-lg animate-pulse" />
    );
  }

  return (
    <div className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg">
      <EditorComponent
        defaultValue={initialValue || defaultEditorContent}
        onDebouncedUpdate={(editor) => {
          if (editor) {
            const html = editor.getHTML();
            onChange?.(html);
          }
        }}
        className="min-h-[500px] p-4"
        disableLocalStorage={true}
        extensions={[]}
      />
    </div>
  );
}