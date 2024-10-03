import {
  FileText,
  Briefcase,
  FileSignature,
  UserCircle2,
  Folder,
  GraduationCap,
  Award,
  Briefcase as WorkIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AdmissionRequirements({ name }) {
  const requirements = [
    {
      icon: <FileText className="w-12 h-12 text-blue-500" />,
      title: "Educational Transcripts",
    },
    {
      icon: <Briefcase className="w-12 h-12 text-blue-500" />,
      title: "Employer / Academic LOR",
    },
    {
      icon: <FileSignature className="w-12 h-12 text-blue-500" />,
      title: "Self Drafted SOP",
    },
    {
      icon: <UserCircle2 className="w-12 h-12 text-blue-500" />,
      title: "Updated CV (with complete dates)",
    },
    {
      icon: <Folder className="w-12 h-12 text-blue-500" />,
      title: "Valid Passport",
    },
    {
      icon: <GraduationCap className="w-12 h-12 text-blue-500" />,
      title: "English Proficiency Test Score",
    },
    {
      icon: <Award className="w-12 h-12 text-blue-500" />,
      title: "Experience Letter (if any)",
    },
    {
      icon: <WorkIcon className="w-12 h-12 text-blue-500" />,
      title: "Work Portfolio (specialized courses)",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2 text-blue-800">
        Admission Requirements ({name})
      </h1>
      <p className="text-center mb-8 text-gray-600">
        The fundamentals of what to anticipate as an international student in{" "}
        {name}!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {requirements.map((req, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              {req.icon}
              <h2 className="mt-4 text-lg font-semibold text-center">
                {req.title}
              </h2>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
