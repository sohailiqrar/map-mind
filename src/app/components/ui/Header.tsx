"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useSession, signOut } from "next-auth/react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
  PlusIcon,
  BookmarkIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

const tests1 = [
  {
    name: "Mental Health Test",
    description: "How's your mental health today?",
    href: "/components/layout/psyTests/mentalHealthTest",
    icon: ArrowPathIcon
  },
  {
    name: "Self Esteem Test",
    description: "Get a better understanding of your self esteem",
    href: "/components/layout/psyTests/selfEsteemTest",
    icon: ChartPieIcon
  },
  {
    name: "Depression Test",
    description: "Speak directly from your innervoice",
    href: "/components/layout/psyTests/depressionTest",
    icon: CursorArrowRaysIcon
  },
  {
    name: "Anger Management Test",
    description: "Know your areas of anger",
    href: "/components/layout/psyTests/angerManagementTest",
    icon: FingerPrintIcon
  },
  {
    name: "Narcissism Test",
    description: "See yourself clearly, beyond ego.",
    href: "/components/layout/psyTests/narcissismTest",
    icon: SquaresPlusIcon
  }
];

const tests2 = [
  {
    name: "Social Anxiety Test",
    description: "Overcome anxiety and connect with others",
    href: "/components/layout/psyTests/socialAnxietyTest",
    icon: ArrowPathIcon
  },
  {
    name: "Emotional Intelligence Test",
    description: "Strengthen bonds through emotional insight",
    href: "/components/layout/psyTests/emotionalIntelligenceTest",
    icon: ChartPieIcon
  },
  {
    name: "Introversion/Extroversion Test",
    description: "Discover your social energy style",
    href: "/components/layout/psyTests/introExtroTest",
    icon: CursorArrowRaysIcon
  },
  {
    name: "Post Traumatic Stress Disorder Test",
    description: "Understand your triggers effectively",
    href: "/components/layout/psyTests/ptsdTest",
    icon: FingerPrintIcon
  },
  {
    name: "Optimism Test",
    description: "See the positive in challenges",
    href: "/components/layout/psyTests/optimismTest",
    icon: SquaresPlusIcon
  }
];

const tests = tests1.concat(tests2);

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function getInitials(name?: string | null) {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return parts[0][0].toUpperCase();
}

const EegLogo = () => (
  <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
    <path
      d="M1 7 L4.5 7 L6 2 L8.5 12 L11 2 L13.5 12 L15 7 L21 7"
      stroke="white"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const routes = [
      ...tests1.map((t) => t.href),
      ...tests2.map((t) => t.href),
      "/components/layout/journal/newPage",
      "/components/layout/journal/gallery"
    ];
    routes.forEach((href) => router.prefetch(href));
  }, []);

  const navLinkClass =
    "text-sm font-medium leading-6 text-slate-600 hover:text-teal-600 transition-colors duration-200";

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-slate-100 shadow-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between py-4 px-6 lg:px-8"
        aria-label="Global">

        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center gap-2.5 -m-1.5 p-1.5 group">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center shadow-md shadow-teal-100 group-hover:bg-teal-700 transition-colors duration-200">
              <EegLogo />
            </div>
            <span className="font-bold text-slate-800 text-lg tracking-tight">
              NueroZen
            </span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-600 hover:text-teal-600 transition-colors"
            onClick={() => setMobileMenuOpen(true)}>
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop nav */}
        <Popover.Group className="hidden lg:flex lg:gap-x-10 items-center">

          {/* Tests dropdown */}
          <Popover className="relative">
            <Popover.Button className={classNames(navLinkClass, "flex items-center gap-x-1 outline-none")}>
              Tests
              <ChevronDownIcon className="h-4 w-4 flex-none text-slate-400" aria-hidden="true" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1">
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-900/5">
                {({ close }) => (
                  <div className="grid grid-cols-2 gap-2 p-3">
                    <div>
                      {tests1.map((item) => (
                        <div
                          key={item.name}
                          className="group relative flex items-center gap-x-4 rounded-xl p-3 text-sm hover:bg-teal-50 transition-colors duration-150">
                          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-slate-50 group-hover:bg-white group-hover:shadow-sm transition-all">
                            <item.icon className="h-5 w-5 text-slate-500 group-hover:text-teal-600 transition-colors" aria-hidden="true" />
                          </div>
                          <div className="flex-auto">
                            <Link href={item.href} onClick={() => close()} className="block font-semibold text-slate-800 text-sm">
                              {item.name}
                              <span className="absolute inset-0" />
                            </Link>
                            <p className="mt-0.5 text-xs text-slate-500">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>
                      {tests2.map((item) => (
                        <div
                          key={item.name}
                          className="group relative flex items-center gap-x-4 rounded-xl p-3 text-sm hover:bg-teal-50 transition-colors duration-150">
                          <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-slate-50 group-hover:bg-white group-hover:shadow-sm transition-all">
                            <item.icon className="h-5 w-5 text-slate-500 group-hover:text-teal-600 transition-colors" aria-hidden="true" />
                          </div>
                          <div className="flex-auto">
                            <Link href={item.href} onClick={() => close()} className="block font-semibold text-slate-800 text-sm">
                              {item.name}
                              <span className="absolute inset-0" />
                            </Link>
                            <p className="mt-0.5 text-xs text-slate-500">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Popover.Panel>
            </Transition>
          </Popover>

          {/* Journal dropdown */}
          <Popover className="relative">
            <Popover.Button className={classNames(navLinkClass, "flex items-center gap-x-1 outline-none")}>
              Journal
              <ChevronDownIcon className="h-4 w-4 flex-none text-slate-400" aria-hidden="true" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1">
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-64 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-900/5">
                {({ close }) => (
                  <div className="p-3">
                    <div className="group relative flex items-center gap-x-4 rounded-xl p-3 text-sm hover:bg-teal-50 transition-colors duration-150">
                      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-slate-50 group-hover:bg-white group-hover:shadow-sm transition-all">
                        <PlusIcon className="h-5 w-5 text-slate-500 group-hover:text-teal-600 transition-colors" aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <Link href="/components/layout/journal/newPage" onClick={() => close()} className="block font-semibold text-slate-800 text-sm">
                          New Page
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-0.5 text-xs text-slate-500">Add a new journal entry.</p>
                      </div>
                    </div>
                    <div className="group relative flex items-center gap-x-4 rounded-xl p-3 text-sm hover:bg-teal-50 transition-colors duration-150">
                      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-slate-50 group-hover:bg-white group-hover:shadow-sm transition-all">
                        <BookmarkIcon className="h-5 w-5 text-slate-500 group-hover:text-teal-600 transition-colors" aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <Link href="/components/layout/journal/gallery" onClick={() => close()} className="block font-semibold text-slate-800 text-sm">
                          Saved Pages
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-0.5 text-xs text-slate-500">View your previous entries.</p>
                      </div>
                    </div>
                  </div>
                )}
              </Popover.Panel>
            </Transition>
          </Popover>

          <Link href="/components/layout/articles" className={navLinkClass}>Articles</Link>
          <Link href="/components/layout/moodTracker" className={navLinkClass}>Tracker</Link>
          <Link href="/components/layout/about-us" className={navLinkClass}>About Us</Link>
        </Popover.Group>

        {/* Desktop auth section */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          {status === "loading" && (
            <div className="flex items-center gap-3 opacity-0 pointer-events-none select-none" aria-hidden="true">
              <div className="h-9 w-16 rounded-xl bg-slate-100" />
              <div className="h-9 w-28 rounded-xl bg-slate-100" />
            </div>
          )}

          {status === "unauthenticated" && (
            <>
              <Link
                href="/components/layout/login"
                className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors duration-200">
                Sign in
              </Link>
              <Link
                href="/components/layout/registration"
                className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors duration-200 shadow-sm shadow-teal-100">
                Get Started
              </Link>
            </>
          )}

          {status === "authenticated" && (
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1.5 border border-slate-200 hover:border-teal-200 hover:bg-teal-50 transition-all duration-200 outline-none">
                <div className="w-7 h-7 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {getInitials(session?.user?.name)}
                </div>
                <span className="text-sm font-medium text-slate-700 max-w-[120px] truncate">
                  {session?.user?.name?.split(" ")[0]}
                </span>
                <ChevronDownIcon className="h-4 w-4 text-slate-400 flex-shrink-0" />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="opacity-0 scale-95 translate-y-1"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100 translate-y-0"
                leaveTo="opacity-0 scale-95 translate-y-1">
                <Popover.Panel className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white shadow-xl ring-1 ring-slate-900/5 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {session?.user?.name}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      {session?.user?.email}
                    </p>
                  </div>
                  <div className="p-1.5">
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-150 font-medium">
                      <ArrowRightOnRectangleIcon className="h-4 w-4 flex-shrink-0" />
                      Sign out
                    </button>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10 bg-slate-900/20 backdrop-blur-sm" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-slate-900/10">

          {/* Mobile header */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 -m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                <EegLogo />
              </div>
              <span className="font-bold text-slate-800 text-base tracking-tight">NueroZen</span>
            </Link>
            <button
              type="button"
              className="-m-1.5 rounded-xl p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile nav links */}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-slate-100">
              <div className="space-y-1 py-6">

                {/* Tests accordion */}
                <Disclosure as="div">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-xl py-2.5 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                        Tests
                        <ChevronDownIcon className={classNames(open ? "rotate-180" : "", "h-4 w-4 text-slate-400 transition-transform duration-200")} />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-1 space-y-0.5 pl-3">
                        {tests.map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block rounded-lg py-2 px-3 text-sm text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition-colors">
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                {/* Journal accordion */}
                <Disclosure as="div">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-xl py-2.5 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                        Journal
                        <ChevronDownIcon className={classNames(open ? "rotate-180" : "", "h-4 w-4 text-slate-400 transition-transform duration-200")} />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-1 space-y-0.5 pl-3">
                        <a href="/components/layout/journal/newPage" onClick={() => setMobileMenuOpen(false)}
                          className="block rounded-lg py-2 px-3 text-sm text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition-colors">
                          New Page
                        </a>
                        <a href="/components/layout/journal/gallery" onClick={() => setMobileMenuOpen(false)}
                          className="block rounded-lg py-2 px-3 text-sm text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition-colors">
                          Saved Pages
                        </a>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                <a href="/components/layout/articles" onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl py-2.5 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                  Articles
                </a>
                <a href="/components/layout/moodTracker" onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl py-2.5 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                  Tracker
                </a>
                <a href="/components/layout/about-us" onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl py-2.5 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                  About Us
                </a>
              </div>

              {/* Mobile auth section */}
              <div className="py-6">
                {status === "authenticated" ? (
                  <div>
                    <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-slate-50 rounded-2xl">
                      <div className="w-10 h-10 rounded-full bg-teal-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                        {getInitials(session?.user?.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{session?.user?.name}</p>
                        <p className="text-xs text-slate-400 truncate">{session?.user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { signOut({ callbackUrl: "/" }); setMobileMenuOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                      <ArrowRightOnRectangleIcon className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/components/layout/registration"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white text-center font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors">
                      Get Started
                    </Link>
                    <Link
                      href="/components/layout/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center text-sm font-medium text-slate-600 hover:text-teal-600 py-2 transition-colors">
                      Sign in
                    </Link>
                  </div>
                )}
              </div>

            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
