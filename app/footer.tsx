import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#f1f3fa] px-3 py-3 sm:px-5 sm:py-4 lg:px-8">
      {/* Main Footer Card */}
      <div className="mx-auto max-w-[1810px] rounded-[18px] bg-white px-5 py-8 sm:rounded-[22px] sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-[minmax(220px,0.8fr)_minmax(0,2fr)] lg:gap-10 xl:gap-16">

          {/* LEFT — LOGOS */}
          <div className="flex flex-col">
            <div className="flex flex-col items-start gap-7 sm:gap-8">
              {/* Sihat AI */}
              <div className="flex flex-col items-start">
                <Link href="/" className="inline-flex w-fit">
                  <Image
                    src="/SihatAILogo.png"
                    alt="Sihat AI"
                    width={150}
                    height={45}
                    priority
                    className="h-auto w-[130px] sm:w-[150px]"
                  />
                </Link>

                <p className="mt-2 text-sm leading-relaxed text-[#07156f] sm:text-[15px]">
                  Smart Wellness Ecosystem
                </p>
              </div>

              {/* Sihat Tech */}
              <div className="flex flex-col items-start">
                <Link href="/" className="inline-flex w-fit">
                  <Image
                    src="/SihatTechLogo.png"
                    alt="Sihat Tech"
                    width={150}
                    height={45}
                    className="h-auto w-[130px] sm:w-[150px]"
                  />
                </Link>

                <p className="mt-2 text-sm leading-relaxed text-[#07156f] sm:text-[15px]">
                  Preventive-Health Technology
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — NAVIGATION */}
          <div className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 md:grid-cols-4 md:gap-x-5 lg:gap-x-6 xl:gap-x-10">

            {/* Platform */}
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-[#06156f] sm:text-[18px]">
                Platform
              </h3>

              <div className="mt-4 flex flex-col items-start gap-3 sm:mt-5 sm:gap-4">
                <Link href="#platform" className="text-sm leading-relaxed text-[#071b9e] transition-opacity duration-200 hover:opacity-60 sm:text-[16px]">
                  Overview
                </Link>

                <Link href="#solutions" className="text-sm leading-relaxed text-[#071b9e] transition-opacity duration-200 hover:opacity-60 sm:text-[16px]">
                  Solutions
                </Link>

                <Link href="#protocols" className="text-sm leading-relaxed text-[#071b9e] transition-opacity duration-200 hover:opacity-60 sm:text-[16px]">
                  Protocols
                </Link>
              </div>
            </div>

            {/* About Us */}
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-[#06156f] sm:text-[18px]">
                About Us
              </h3>

              <div className="mt-4 flex flex-col items-start gap-3 sm:mt-5 sm:gap-4">
                <Link href="#company" className="text-sm leading-relaxed text-[#071b9e] transition-opacity duration-200 hover:opacity-60 sm:text-[16px]">
                  Our Company
                </Link>

                <Link href="#teams" className="text-sm leading-relaxed text-[#071b9e] transition-opacity duration-200 hover:opacity-60 sm:text-[16px]">
                  Our Teams
                </Link>

                <Link href="#partners" className="text-sm leading-relaxed text-[#071b9e] transition-opacity duration-200 hover:opacity-60 sm:text-[16px]">
                  Partners &amp; Impact
                </Link>
              </div>
            </div>

            {/* Resources */}
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-[#06156f] sm:text-[18px]">
                Resources
              </h3>

              <div className="mt-4 flex flex-col items-start gap-3 sm:mt-5 sm:gap-4">
                <Link href="#blog" className="text-sm leading-relaxed text-[#071b9e] transition-opacity duration-200 hover:opacity-60 sm:text-[16px]">
                  Blog
                </Link>

                <Link href="#news" className="text-sm leading-relaxed text-[#071b9e] transition-opacity duration-200 hover:opacity-60 sm:text-[16px]">
                  News
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-[#06156f] sm:text-[18px]">
                Contact
              </h3>

              <div className="mt-4 flex flex-col items-start gap-3 sm:mt-5">
                <Link
                  href="mailto:info@sihat-ai.com"
                  className="break-words text-sm leading-relaxed text-[#071b9e] transition-colors duration-200 hover:text-[#06156f] sm:text-[15px]"
                >
                  Email
                </Link>

                <Link
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm leading-relaxed text-[#071b9e] transition-colors duration-200 hover:text-[#06156f] sm:text-[15px]"
                >
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-10 border-t border-[#e5e7f0] pt-5 sm:mt-14 sm:pt-6">
          <p className="text-xs leading-relaxed text-[#07156f]/70 sm:text-[14px]">
            © {new Date().getFullYear()} Sihat AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}