import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/homepagecomps/Footer";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="bg-gradient-to-r from-primary to-primary-foreground py-20 md:py-32 p-12">
        <div className="max-w-3xl mx-auto space-y-4 text-center text-primary-foreground">
          <h1 className="text-4xl font-bold pt-12 tracking-tight sm:text-5xl md:text-6xl">
            About StudyJetGlobal
          </h1>
          <p className="text-lg md:text-xl">Get to know StudyJetGlobal</p>
        </div>
      </section>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="w-[80%] mx-auto px-4 md:px-6">
            <div className="grid gap-8 sm:px-10 md:gap-16 md:grid-cols-2 w-full">
              <div className="space-y-4 w-full">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Our Mission
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  At studyJetGlobal, our mission is to empower students to
                  explore the world and broaden their perspectives through
                  transformative study abroad experiences. We believe that
                  international education is a powerful tool for personal
                  growth, cultural understanding, and global citizenship.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Our Vision
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our vision is to be the leading provider of innovative and
                  personalized study abroad programs that inspire students to
                  become global leaders and make a positive impact on the world.
                  We are committed to continuously expanding our network of
                  international partners, enhancing our program offerings, and
                  fostering a diverse and inclusive community of global
                  learners.
                </p>
              </div>
              {/* --------------------------- */}
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Our History
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  StudyJetGloal was founded in 2022 with the goal of making
                  study abroad accessible to students from all backgrounds. Over
                  the years, weve grown to become a leading provider of
                  transformative international education experiences, partnering
                  with universities and organizations around the world.
                </p>
              </div>
              {/* ------------------ */}
              <div>
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Our Values
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Empowering Global Citizens
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We are committed to providing accessible, inclusive, and
                  high-quality study abroad programs that empower students to
                  become global citizens, embrace diversity, and make a positive
                  impact in the world.
                </p>
              </div>
              {/* -------------------------------- */}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <div>
                <Image
                  src="/placeholder.svg"
                  width="550"
                  height="310"
                  alt="About Us"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  About Global Horizons
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  StudyJetGloal is a leading study abroad agency that has been
                  helping students explore the world for over a decade. We are a
                  team of passionate educators, travel enthusiasts, and global
                  citizens who are dedicated to providing transformative
                  international experiences that broaden perspectives, foster
                  personal growth, and prepare students for success in an
                  increasingly interconnected world.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
