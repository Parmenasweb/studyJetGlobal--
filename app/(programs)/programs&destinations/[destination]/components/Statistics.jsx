import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Computer, Database, ChartBar, Cog, Stethoscope, DollarSign, Baby, Shirt, PenTool } from "lucide-react"

export default function DestinationStatistics({name}) {
  const statistics = [
    { country: "India", percentage: 18 },
    { country: "Brazil", percentage: 2 },
    { country: "Canada", percentage: 3 },
    { country: "China", percentage: 35 },
    { country: "South Korea", percentage: 4 },
    { country: "Taiwan", percentage: 2 },
    { country: "UK", percentage: 10 },
    { country: "Vietnam", percentage: 2 },
  ]

  const studyAreas = [
    { name: "Stream Agnostic Specialised Research Programs", icon: GraduationCap },
    { name: "Computer Sciences & IT", icon: Computer },
    { name: "Data Sciences", icon: Database },
    { name: "Business Analytics", icon: ChartBar },
    { name: "Engineering in Multiple Streams", icon: Cog },
    { name: "Medicine & Biotechnology", icon: Stethoscope },
    { name: "Finance & Business Management", icon: DollarSign },
    { name: "Early Childhood, Health Care/Public Health", icon: Baby },
    { name: "Fashion and Merchandise", icon: Shirt },
    { name: "Graphic and Animation Design", icon: PenTool },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">Statistics ({name})</h1>
      <p className="text-center mb-8">learn the fundamentals of what to anticipate as an international student in {name}!</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {statistics.map((stat) => (
          <div key={stat.country} className="bg-purple-200 rounded-lg p-2 text-center">
            <span className="font-semibold">{stat.country}</span> {stat.percentage}%
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {studyAreas.map((area) => (
          <Card key={area.name} className="flex flex-col items-center p-4">
            <CardContent className="flex flex-col items-center text-center">
              <div className="bg-purple-100 rounded-full p-4 mb-4">
                <area.icon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-sm">{area.name}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}