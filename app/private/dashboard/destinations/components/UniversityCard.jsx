"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Globe, Mail, Phone, Trophy } from "lucide-react";

export default function UniversityCard({ university }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              <Building2 className="mr-2 h-4 w-4" />
              {university.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{university.location}</p>
          </div>
          <Badge variant={university.type === "public" ? "secondary" : "outline"}>
            {university.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {university.ranking && (
            <div className="flex items-center text-sm">
              <Trophy className="mr-2 h-4 w-4 text-yellow-500" />
              World Ranking: #{university.ranking}
            </div>
          )}
          {university.website && (
            <div className="flex items-center text-sm">
              <Globe className="mr-2 h-4 w-4" />
              <a
                href={university.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Visit Website
              </a>
            </div>
          )}
          {university.contactEmail && (
            <div className="flex items-center text-sm">
              <Mail className="mr-2 h-4 w-4" />
              <a
                href={`mailto:${university.contactEmail}`}
                className="text-blue-500 hover:underline"
              >
                {university.contactEmail}
              </a>
            </div>
          )}
          {university.contactPhone && (
            <div className="flex items-center text-sm">
              <Phone className="mr-2 h-4 w-4" />
              {university.contactPhone}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 