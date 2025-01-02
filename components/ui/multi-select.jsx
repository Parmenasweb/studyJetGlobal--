"use client";

import * as React from "react";
import { X, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder,
  creatable = false,
  className,
  ...props
}) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (item) => {
    onChange(selected.filter((i) => i !== item));
  };

  const handleSelect = (value) => {
    if (selected.includes(value)) {
      handleUnselect(value);
    } else {
      onChange([...selected, value]);
    }
    setInputValue("");
  };

  const handleCreateOption = () => {
    if (inputValue && !options.find((opt) => opt.value === inputValue)) {
      const newOption = { label: inputValue, value: inputValue };
      handleSelect(newOption.value);
    }
  };

  const availableOptions = React.useMemo(() => {
    const defaultOptions = options.map((opt) => ({
      label: opt.label || opt.value,
      value: opt.value,
    }));

    if (
      creatable &&
      inputValue &&
      !defaultOptions.find((opt) => opt.value === inputValue)
    ) {
      return [
        ...defaultOptions,
        {
          label: `Create &quot;${inputValue}&quot;`,
          value: inputValue,
          isCreateOption: true,
        },
      ];
    }

    return defaultOptions;
  }, [options, inputValue, creatable]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "min-h-[2.5rem] h-auto w-full justify-between",
            className
          )}
          onClick={() => setOpen(!open)}
        >
          <div className="flex flex-wrap gap-1">
            {selected.length === 0 && (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            {selected.map((item) => (
              <Badge
                key={item}
                variant="secondary"
                className="mr-1 mb-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnselect(item);
                }}
              >
                {options.find((opt) => opt.value === item)?.label || item}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleUnselect(item);
                  }}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ))}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="w-full">
          <CommandInput
            placeholder="Search..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandEmpty className="py-2 px-4 text-sm">
            {creatable ? (
              <button
                className="text-blue-500 hover:underline"
                onClick={handleCreateOption}
              >
                Create &quot;{inputValue}&quot;
              </button>
            ) : (
              "No results found."
            )}
          </CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {availableOptions.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => {
                  if (option.isCreateOption) {
                    handleCreateOption();
                  } else {
                    handleSelect(option.value);
                  }
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.includes(option.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
