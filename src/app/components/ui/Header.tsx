"use client";

import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import router from "next/router";
import { useSession, signOut } from "next-auth/react";
import {
  ForwardRefExoticComponent,
  Fragment,
  RefAttributes,
  SVGProps,
  useState
} from "react";
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
  BoltIcon
} from "@heroicons/react/24/outline";

const tests1 = [
  {
    name: "Mental Health Test",
    description: "How's your mental health today?",
    href: "../layout/psyTests/mentalHealthTest",
    icon: ArrowPathIcon
  },
  {
    name: "Self Esteem Test",
    description: "Get a better understanding of your self esteem",
    href: "../psyTests/selfEsteemTest",
    icon: ChartPieIcon
  },
  {
    name: "Depression Test",
    description: "Speak directly from your innervoice",
    href: "../psyTests/depressionTest",
    icon: CursorArrowRaysIcon
  },
  {
    name: "Anger Management Test",
    description: "Know your areas of anger",
    href: "../psyTests/angerManagementTest",
    icon: FingerPrintIcon
  },
  {
    name: "Narcissism Test",
    description: "See yourself clearly, beyond ego.",
    href: "../psyTests/narcissismTest",
    icon: SquaresPlusIcon
  }
];

const tests2 = [
  {
    name: "Social Anxiety Test",
    description: "Overcome anxiety and connect with others",
    href: "../psyTests/socialAnxietyTest",
    icon: ArrowPathIcon
  },
  {
    name: "Emotional Intelligence Test",
    description: "Strengthen bonds through emotional insight",
    href: "../psyTests/emotionalIntelligenceTest",
    icon: ChartPieIcon
  },
  {
    name: "Introversion/Extroversion Test",
    description: "Discover your social energy style",
    href: "../psyTests/introExtroTest",
    icon: CursorArrowRaysIcon
  },
  {
    name: "Post Traumatic Stress Disorder Test",
    description: "Understand your triggers effectively",
    href: "../psyTests/ptsdTest",
    icon: FingerPrintIcon
  },
  {
    name: "Optimism Test",
    description: "See the positive in challenges",
    href: "../psyTests/optimismTest",
    icon: SquaresPlusIcon
  }
];

const tests = tests1.concat(tests2);

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { status } = useSession();

  return (
    <header className="bg-white sticky top-0 z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 "
        aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className=" border-2 border-indigo-500 -m-1.5 p-1.5">
            <span className="sr-only ">Your Company</span>
            <p>NueroZen</p>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5  text-gray-700"
            onClick={() => setMobileMenuOpen(true)}>
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center  gap-x-1 text-lg font-serif leading-6 text-gray-900">
              Tests
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1">
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-3xl overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4">
                    {tests1.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-serif hover:bg-gray-50">
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon
                            className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex-auto">
                          <Link
                            href={item.href}
                            className="block font-semibold text-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4">
                    {tests2.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-serif hover:bg-gray-50">
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon
                            className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex-auto">
                          <Link
                            href={item.href}
                            className="block font-semibold text-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5  text-gray-700"
              onClick={() => setMobileMenuOpen(true)}>
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover className="relative">
            <Popover.Button className="flex items-center  gap-x-1 text-lg font-serif leading-6 text-gray-900">
              Journal
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1">
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-xs overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-serif hover:bg-gray-50">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <PlusIcon
                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-auto">
                      <Link
                        href="../journal/newPage"
                        className="block font-semibold text-gray-900">
                        {"New Page"}
                        <span className="absolute inset-0" />
                      </Link>
                      <p className="mt-1 text-gray-600">
                        {"Add new page to journal."}
                      </p>
                    </div>
                  </div>

                  <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-serif hover:bg-gray-50">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <BookmarkIcon
                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-auto">
                      <Link
                        href="../journal/gallery"
                        className="block font-semibold text-gray-900">
                        {"Saved Pages"}
                        <span className="absolute inset-0" />
                      </Link>
                      <p className="mt-1 text-gray-600">
                        {"View previous pages."}
                      </p>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <Link
            href="/"
            className="text-lg font-serif  leading-6 text-gray-900">
            Articles
          </Link>
          <Link
            href="../moodTracker"
            className="text-lg font-serif  leading-6 text-gray-900">
            Tracker
          </Link>
          <Link
            href="../layout/about-us"
            className="text-lg font-serif  leading-6 text-gray-900">
            About Us
          </Link>
        </Popover.Group>

        {status === "authenticated" ? (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
              className="bg-blue-800 hover:bg-blue-500 text-white font-serif py-2 px-4 rounded mr-4 mt-0">
              Log out
            </button>
          </div>
        ) : status === "loading" ? (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end mb-2">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin  fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="../registration"
              className="bg-blue-800 hover:bg-blue-500 text-white font-serif py-2 px-4 rounded mr-4 mt-0">
              Sign up
            </a>
            <a
              href="../login"
              className="text-lg font-serif  leading-6 text-gray-900 mt-2">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        )}
      </nav>
      <Dialog
        as="div"
        className="lg:hidden "
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="../../" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </Link>
            <button
              type="button"
              className="-m-1.5 rounded-md p-3.5  text-gray-700"
              onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y  divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Tests
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...tests].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-lg font-serif leading-7 text-gray-900 hover:bg-gray-50">
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Journal
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        <Disclosure.Button
                          key="1"
                          as="a"
                          href="../addPage"
                          className="block rounded-lg py-2 pl-6 pr-3 text-lg font-serif leading-7 text-gray-900 hover:bg-gray-50">
                          {"Add a new page"}
                        </Disclosure.Button>
                        <Disclosure.Button
                          key="2"
                          as="a"
                          href="../savedPages"
                          className="block rounded-lg py-2 pl-6 pr-3 text-lg font-serif leading-7 text-gray-900 hover:bg-gray-50">
                          {"Saved Pages"}
                        </Disclosure.Button>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                <a
                  href="../"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Tracker
                </a>
                <a
                  href="../Articles"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Articles
                </a>
                <a
                  href="../About-us"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  About Us
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
