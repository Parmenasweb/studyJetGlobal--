"use client";

import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogClose,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
import ConsultationForm from "@/components/forms/consultationForm";
import { signOut, signIn, useSession } from "next-auth/react";
import { useState } from "react";

// /create the navigation links
const navigation = [
  {
    name: "programs & destination",
    href: "/programs&destinations",
  },
  {
    name: "schorlarships",
    href: "/schorlarship",
  },
  {
    name: "Blogs",
    href: "/blogs",
  },
  {
    name: "about us",
    href: "/about",
  },
  {
    name: "contact us",
    href: "/contactUs",
  },
  // {
  //   name: "partnership",
  //   href: "/partnership",
  // },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  // const session = await auth();
  // const user = session?.user;

  // const hrefName = usePathname();
  return (
    <header className=" inset-x-0 fixed bg-primary-foreground top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">StudyJetGlobal</span>
            <Image
              width={100}
              height={50}
              alt=""
              src="/logotrans.jpeg"
              className=" w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-md font-semibold leading-6 hover:border-b-2 hover:text-primary text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* partnership and consultation buttons goes here */}
          <div className="flex items-center mx-auto justify-between space-x-2">
            <Button asChild>
              <Link
                href="/partnership"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Partnerships
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                href="/onBoarding/consultationForm"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Book consultation
              </Link>
            </Button>
          </div>
          {session?.user ? (
            <Link
              href="/auth/login"
              onClick={() => {
                signOut();
              }}
              className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >
              LogOut
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >
              Log in
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">studyJetGlobal</span>
              <Image
                width={100}
                height={50}
                alt=""
                src="/logotrans.jpeg"
                className=" w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className=" hover:border-b-2 hover:text-secondary -m-2.5 rounded-md p-2.5 text-gray-900"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <div className="flex items-center justify-between ">
                  <Button asChild>
                    <Link
                      href="/partnership"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Partnerships
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link
                      href="/onBoarding/consultationForm"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Book a consultation
                    </Link>
                  </Button>
                </div>
                {session?.user ? (
                  <Link
                    href="/auth/login"
                    onClick={() => {
                      signOut();
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    LogOut
                  </Link>
                ) : (
                  <Link
                    href="/auth/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

// --------------------------------------------
