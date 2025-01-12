"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countryCodes = [
  { code: "+1", country: "US/CA" },
  { code: "+44", country: "UK" },
  { code: "+91", country: "IN" },
  { code: "+234", country: "NG" },
  { code: "+254", country: "KE" },
  { code: "+255", country: "TZ" },
  { code: "+256", country: "UG" },
  { code: "+27", country: "ZA" },
  { code: "+251", country: "ET" },
  { code: "+250", country: "RW" },
  { code: "+233", country: "GH" },
  { code: "+20", country: "EG" },
  { code: "+971", country: "UAE" },
  { code: "+966", country: "SA" },
  { code: "+974", country: "QA" },
  { code: "+61", country: "AU" },
  { code: "+64", country: "NZ" },
  { code: "+86", country: "CN" },
  { code: "+81", country: "JP" },
  { code: "+82", country: "KR" },
];

export function PhoneInput({ value = "", onChange, className, disabled }) {
  const [countryCode, setCountryCode] = React.useState("+1");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  React.useEffect(() => {
    // Parse initial value if provided
    if (value) {
      const code = countryCodes.find(c => value.startsWith(c.code));
      if (code) {
        setCountryCode(code.code);
        setPhoneNumber(value.slice(code.code.length));
      } else {
        setPhoneNumber(value);
      }
    }
  }, []);

  const handlePhoneChange = (e) => {
    const newNumber = e.target.value.replace(/[^0-9]/g, "");
    setPhoneNumber(newNumber);
    onChange(countryCode + newNumber);
  };

  const handleCountryCodeChange = (newCode) => {
    setCountryCode(newCode);
    onChange(newCode + phoneNumber);
  };

  return (
    <div className="flex gap-2">
      <Select
        value={countryCode}
        onValueChange={handleCountryCodeChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Code" />
        </SelectTrigger>
        <SelectContent>
          {countryCodes.map(({ code, country }) => (
            <SelectItem key={code} value={code}>
              {code} ({country})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        className={className}
        disabled={disabled}
        placeholder="Phone number"
      />
    </div>
  );
}
