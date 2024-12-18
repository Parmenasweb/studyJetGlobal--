import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount, currency = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(date, options = {}) {
  const defaultOptions = {
    dateStyle: "medium",
    timeStyle: undefined,
  }

  const mergedOptions = { ...defaultOptions, ...options }
  
  if (!date) return ""
  
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date
    return new Intl.DateTimeFormat("en-US", mergedOptions).format(dateObj)
  } catch (error) {
    console.error("Error formatting date:", error)
    return ""
  }
}
