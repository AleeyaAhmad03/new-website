"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type DropdownType = | "overview" | "solutions" | "about" | "resources" | "contact" | null;

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] =
    useState<DropdownType>(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDropdown = (dropdown: DropdownType) => {
    setActiveDropdown(
      activeDropdown === dropdown ? null : dropdown
    );
  };

  return (
    <>
      {/* Navigation Bar */}
      <header className="relative z-50 w-full bg-white">
        <nav className="mx-auto flex h-[96px] max-w-[1810px] items-center justify-between px-8 lg:px-[60px]">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setActiveDropdown(null)}
          >
            <Image
              src="/SihatAILogo.png"
              alt="Sihat AI"
              width={150}
              height={45}
              priority
              className="h-auto w-[150px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-10 lg:flex">

            {/*Overview */}
            <button
              onClick={() => toggleDropdown("overview")}
              className={`flex items-center gap-2 text-[16px] font-medium transition-colors ${
                activeDropdown === "overview"
                  ? "text-[#071b9e]"
                  : "text-[#07156f] hover:text-[#071b9e]"
              }`}
            >
              Overview

              <svg
                className={`h-4 w-4 transition-transform duration-300 ${
                  activeDropdown === "overview"
                    ? "rotate-180"
                    : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {/* Solutions */}
            <button
              onClick={() => toggleDropdown("solutions")}
              className={`flex items-center gap-2 text-[16px] font-medium transition-colors ${
                activeDropdown === "solutions"
                  ? "text-[#071b9e]"
                  : "text-[#07156f] hover:text-[#071b9e]"
              }`}
            >
              Solutions

              <svg
                className={`h-4 w-4 transition-transform duration-300 ${
                  activeDropdown === "solutions"
                    ? "rotate-180"
                    : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {/* About Us */}
            <button
              onClick={() => toggleDropdown("about")}
              className={`flex items-center gap-2 text-[16px] font-medium transition-colors ${
                activeDropdown === "about"
                  ? "text-[#071b9e]"
                  : "text-[#07156f] hover:text-[#071b9e]"
              }`}
            >
              About Us

              <svg
                className={`h-4 w-4 transition-transform duration-300 ${
                  activeDropdown === "about"
                    ? "rotate-180"
                    : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {/* Resources */}
            <button
              onClick={() => toggleDropdown("resources")}
              className={`flex items-center gap-2 text-[16px] font-medium transition-colors ${
                activeDropdown === "resources"
                  ? "text-[#071b9e]"
                  : "text-[#07156f] hover:text-[#071b9e]"
              }`}
            >
              Resources

              <svg
                className={`h-4 w-4 transition-transform duration-300 ${
                  activeDropdown === "resources"
                    ? "rotate-180"
                    : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {/* Contact */}
            <button
              onClick={() => toggleDropdown("contact")}
              className={`flex items-center gap-2 text-[16px] font-medium transition-colors ${
                activeDropdown === "contact"
                  ? "text-[#071b9e]"
                  : "text-[#07156f] hover:text-[#071b9e]"
              }`}
            >
              Contact

              <svg
                className={`h-4 w-4 transition-transform duration-300 ${
                  activeDropdown === "contact"
                    ? "rotate-180"
                    : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>

          {/* CTA */}
          <Link
            href="#contact"
            className="hidden rounded-md bg-[#CC310E] px-7 py-3 text-[15px] font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0924d5] lg:block"
          >
            Get Started
          </Link>

          {/* Mobile Menu Button*/}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#07156f] lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <span className="text-2xl">×</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>
        </nav>

        {/* Dropdown */}
        <div
          className={`absolute left-0 right-0 top-full hidden lg:block ${
            activeDropdown
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          } transition-opacity duration-200`}
        >
          <div className="border-t border-[#edf0f7] bg-white shadow-[0_20px_50px_rgba(7,21,111,0.08)]">
            <div className="mx-auto max-w-[1810px] px-8 py-10 lg:px-[60px]">

              {/* Overview Dropdown*/}
              {activeDropdown === "overview" && (
                <div className="grid grid-cols-[1fr_2fr] gap-16">

                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#071b9e]">
                      Overview
                    </p>

                    <h2 className="mt-3 max-w-[350px] text-3xl font-semibold tracking-tight text-[#06156f]">
                      Intelligent healthcare, connected.
                    </h2>

                    <p className="mt-4 max-w-[390px] text-[15px] leading-7 text-[#64709b]">
                      Discover Sihat AI and the protocols that
                      connect health data, AI and preventive care.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-5">

                    <MegaMenuCard
                      href="/#platform"
                      title="Overview"
                      description="Discover the Sihat AI platform and ecosystem."
                    />

                    <MegaMenuCard
                      href="#protocols"
                      title="Sihat Protocols"
                      description="Explore our closed-loop healthcare protocols."
                    />

                  </div>
                </div>
              )}

              {/* Solutions Dropdown */}
              {activeDropdown === "solutions" && (
                <div className="grid grid-cols-[1fr_2fr] gap-16">

                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#071b9e]">
                      Solutions
                    </p>

                    <h2 className="mt-3 max-w-[350px] text-3xl font-semibold tracking-tight text-[#06156f]">
                      Smarter solutions for better health.
                    </h2>

                    <p className="mt-4 max-w-[390px] text-[15px] leading-7 text-[#64709b]">
                      Explore the Sihat AI ecosystem and
                      innovative solutions for preventive
                      healthcare and mental wellness.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-5">

                    <MegaMenuCard
                      href="/sihat-ecosystem"
                      title="Sihat AI Ecosystem"
                      description="Discover the connected Sihat AI healthcare ecosystem."
                    />

                    <MegaMenuCard
                      href="#vhealth"
                      title="VHealth"
                      description="Explore VR-powered mental wellness experiences."
                    />

                  </div>
                </div>
              )}

              {/* About Us Dropdown */}
              {activeDropdown === "about" && (
                <div className="grid grid-cols-[1fr_2fr] gap-16">

                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#071b9e]">
                      About Us
                    </p>

                    <h2 className="mt-3 max-w-[350px] text-3xl font-semibold tracking-tight text-[#06156f]">
                      Building a healthier future.
                    </h2>

                    <p className="mt-4 max-w-[390px] text-[15px] leading-7 text-[#64709b]">
                      Learn more about Sihat Tech, our people,
                      partners and impact.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-5">

                    <MegaMenuCard
                      href="#about"
                      title="Our Company"
                      description="Learn about Sihat Tech and our mission."
                    />

                    <MegaMenuCard
                      href="#teams"
                      title="Our Teams"
                      description="Meet the people building Sihat AI."
                    />

                    <MegaMenuCard
                      href="#partners"
                      title="Partners & Impact"
                      description="Our collaborations and healthcare impact."
                    />

                  </div>
                </div>
              )}

              {/* Resources Dropdown */}
              {activeDropdown === "resources" && (
                <div className="grid grid-cols-[1fr_2fr] gap-16">

                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#071b9e]">
                      Resources
                    </p>

                    <h2 className="mt-3 max-w-[350px] text-3xl font-semibold tracking-tight text-[#06156f]">
                      Explore Sihat AI.
                    </h2>

                    <p className="mt-4 max-w-[390px] text-[15px] leading-7 text-[#64709b]">
                      News, insights and opportunities from
                      the Sihat AI ecosystem.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-5">

                    <MegaMenuCard
                      href="#news"
                      title="News"
                      description="The latest Sihat AI updates and milestones."
                    />

                    <MegaMenuCard
                      href="#blog"
                      title="Blog"
                      description="Insights, stories and healthcare innovation."
                    />

                    <MegaMenuCard
                      href="#careers"
                      title="Careers"
                      description="Join us in transforming healthcare."
                    />

                  </div>
                </div>
              )}

              {/* Contact Dropdown */}
              {activeDropdown === "contact" && (
                <div className="grid grid-cols-[1fr_2fr] gap-16">

                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#071b9e]">
                      Contact
                    </p>

                    <h2 className="mt-3 max-w-[350px] text-3xl font-semibold tracking-tight text-[#06156f]">
                      Let&apos;s connect.
                    </h2>

                    <p className="mt-4 max-w-[390px] text-[15px] leading-7 text-[#64709b]">
                      Have a question or want to learn more
                      about Sihat AI? Get in touch with our team.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-5">

                    <MegaMenuCard
                      href="#contact"
                      title="Contact Us"
                      description="Get in touch with the Sihat AI team."
                    />

                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t border-[#edf0f7] bg-white px-8 py-8 lg:hidden">
            <div className="flex flex-col gap-6">

              {/* Overview */}
              <div>
                <button
                  onClick={() => toggleDropdown("overview")}
                  className="flex w-full items-center justify-between text-left text-[17px] font-medium text-[#07156f]"
                >
                  Overview

                  <span>
                    {activeDropdown === "overview" ? "−" : "+"}
                  </span>
                </button>

                {activeDropdown === "overview" && (
                  <div className="mt-4 flex flex-col gap-4 pl-4">
                    <Link href="/#platform">
                      Overview
                    </Link>

                    <Link href="#protocols">
                      Sihat Protocols
                    </Link>
                  </div>
                )}
              </div>

              {/* Solutions */}
              <div>
                <button
                  onClick={() => toggleDropdown("solutions")}
                  className="flex w-full items-center justify-between text-left text-[17px] font-medium text-[#07156f]"
                >
                  Solutions

                  <span>
                    {activeDropdown === "solutions" ? "−" : "+"}
                  </span>
                </button>

                {activeDropdown === "solutions" && (
                  <div className="mt-4 flex flex-col gap-4 pl-4">
                    <Link href="#ecosystem">
                      Sihat AI Ecosystem
                    </Link>

                    <Link href="/sihat-ecosystem">
                      Sihat Chat
                    </Link>

                    <Link href="#vhealth">
                      VHealth
                    </Link>
                  </div>
                )}
              </div>

              {/* About Us */}
              <div>
                <button
                  onClick={() => toggleDropdown("about")}
                  className="flex w-full items-center justify-between text-left text-[17px] font-medium text-[#07156f]"
                >
                  About Us

                  <span>
                    {activeDropdown === "about" ? "−" : "+"}
                  </span>
                </button>

                {activeDropdown === "about" && (
                  <div className="mt-4 flex flex-col gap-4 pl-4">
                    <Link href="#about">
                      About Us
                    </Link>

                    <Link href="#teams">
                      Teams
                    </Link>

                    <Link href="#partners">
                      Partners & Impact
                    </Link>
                  </div>
                )}
              </div>

              {/* Resources */}
              <div>
                <button
                  onClick={() => toggleDropdown("resources")}
                  className="flex w-full items-center justify-between text-left text-[17px] font-medium text-[#07156f]"
                >
                  Resources

                  <span>
                    {activeDropdown === "resources" ? "−" : "+"}
                  </span>
                </button>

                {activeDropdown === "resources" && (
                  <div className="mt-4 flex flex-col gap-4 pl-4">
                    <Link href="#news">
                      News
                    </Link>

                    <Link href="#blog">
                      Blog
                    </Link>

                    <Link href="#careers">
                      Careers
                    </Link>
                  </div>
                )}
              </div>

              {/* Contact */}
              <div>
                <button
                  onClick={() => toggleDropdown("contact")}
                  className="flex w-full items-center justify-between text-left text-[17px] font-medium text-[#07156f]"
                >
                  Contact

                  <span>
                    {activeDropdown === "contact" ? "−" : "+"}
                  </span>
                </button>

                {activeDropdown === "contact" && (
                  <div className="mt-4 flex flex-col gap-4 pl-4">
                    <Link href="#contact">
                      Contact Us
                    </Link>
                  </div>
                )}
              </div>

              {/* CTA */}
              <Link
                href="#contact"
                className="mt-2 inline-flex w-fit rounded-full bg-[#071b9e] px-7 py-3 text-[15px] font-medium text-white"
              >
                Get Started
              </Link>

            </div>
          </div>
        )}
      </header>

      {/* Backdrop */}
      {activeDropdown && (
        <button
          aria-label="Close dropdown"
          onClick={() => setActiveDropdown(null)}
          className="fixed inset-0 z-40 hidden bg-[#06156f]/5 lg:block"
        />
      )}
    </>
  );
}

/* Mega Menu Card */

function MegaMenuCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-[#e8ebf5] bg-[#fafbff] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#cdd4f4] hover:bg-white hover:shadow-[0_12px_30px_rgba(7,21,111,0.07)]"
    >
      <div className="flex items-center justify-between">

        <h3 className="text-[17px] font-semibold text-[#06156f]">
          {title}
        </h3>

        <span className="text-[#071b9e] transition-transform duration-200 group-hover:translate-x-1">
          ↗
        </span>

      </div>

      <p className="mt-3 text-[14px] leading-6 text-[#64709b]">
        {description}
      </p>
    </Link>
  );
}
