"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const PhoneInput = React.forwardRef(({ className, ...props }, ref) => {
  const handleKeyPress = (e) => {
    // Allow: backspace, delete, tab, escape, enter, decimal point, and numbers
    if (
      [8, 9, 13, 27, 46, 110, 190].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode >= 35 && e.keyCode <= 39) ||
      // Allow: home, end, left, right
      (e.ctrlKey === true && [65, 67, 86, 88].indexOf(e.keyCode) !== -1)
    ) {
      return;
    }
    // Allow: +, numbers, and space
    if (!/^[0-9+\s]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text");
    if (!/^[0-9+\s]*$/.test(pastedData)) {
      e.preventDefault();
    }
  };

  return (
    <Input
      type="tel"
      className={cn("font-mono", className)}
      onKeyDown={handleKeyPress}
      onPaste={handlePaste}
      ref={ref}
      {...props}
    />
  );
});

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
