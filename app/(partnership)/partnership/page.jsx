import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Footer from "@/components/homepagecomps/Footer";
import Image from "next/image";
import ApplyButton from "@/components/Applybutton";
import PartnerCard from "./components/PartnerCard";
import { partners } from "@/lib/countrydetails";

export default function Partnership() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 sm:py-24 md:py-24 lg:py-32 xl:py-48 bg-[url('https://images.pexels.com/photos/21862234/pexels-photo-21862234/free-photo-of-aerial-view-of-jiujiang-city-above-hukou-jinshawan-school.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center">
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center text-center space-y-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg">
              <div className="flex items-center justify-center space-x-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    StudyJetGlobal Partnerships
                  </h1>
                  <p className="text-muted-foreground md:text-xl">
                    Connecting universities with global opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 grid gap-10 sm:grid-cols-1 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Expertise
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Trusted Partner for Universities
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our agency has over a decade of experience in facilitating
                successful study abroad partnerships with universities around
                the world. We are dedicated to providing personalized support
                and tailored solutions to meet your institutions needs.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Badge variant="secondary">NAFSA Accredited</Badge>
                <Badge variant="secondary">ISO 9001 Certified</Badge>
                <Badge variant="secondary">UKCISA Member</Badge>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 sm:w-[80%] mx-auto  gap-6">
              {partners.map((partner, ind) => {
                return (
                  <PartnerCard
                    key={ind}
                    name={partner.name}
                    imageUrl={partner.imageUrl}
                    date={partner.date}
                  />
                );
              })}
            </div>
          </div>
        </section>
        <section
          id="partnerships"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Partnerships
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Explore Partnership Opportunities
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our agency is dedicated to fostering meaningful partnerships
                with universities around the world. We would be honored to
                discuss how we can collaborate to provide exceptional study
                abroad experiences for your students.
              </p>
            </div>
            <div className="bg-background rounded-lg p-6 shadow-lg">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="university-name">University Name</Label>
                  <Input
                    id="university-name"
                    placeholder="Enter university name"
                  />
                </div>
                <div>
                  <Label htmlFor="contact-info">Contact Information</Label>
                  <Input
                    id="contact-info"
                    placeholder="Enter contact details"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message"
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit Inquiry
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function GlobeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function UniversityIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="10" r="1" />
      <path d="M22 20V8h-4l-6-4-6 4H2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2" />
      <path d="M6 17v.01" />
      <path d="M6 13v.01" />
      <path d="M18 17v.01" />
      <path d="M18 13v.01" />
      <path d="M14 22v-5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
