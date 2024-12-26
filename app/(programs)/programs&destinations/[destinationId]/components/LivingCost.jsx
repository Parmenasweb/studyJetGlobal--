"use client";

import { useParams } from "next/navigation";

// ... rest of the imports ...

export default function LivingCost() {
  const params = useParams();
  const destinationId = params.destinationId;
  
  // ... rest of the component code ...
} 