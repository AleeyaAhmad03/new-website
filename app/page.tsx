import { Inter } from "next/font/google";
import Navbar from "./navbar";
import Footer from "./footer";
import SihatAIEcosystem from "./main";

// Bold condensed display font, similar to the headline in the reference image
const display = Inter({
  weight: "600",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      {/* Hero */}
      <section
        id="platform"
        className="relative z-10 flex min-h-[calc(100vh-80px)] scroll-mt-24 items-center justify-center overflow-hidden bg-white px-5 sm:px-8 lg:px-[60px]"
      >
        {/* Animated GIF background with white overlay for readability */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <img
            src="/project_animation.gif"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-white/65" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col items-center py-16 text-center sm:py-20 lg:py-28">
          <h1
            className={`${display.className} text-[clamp(2.75rem,8vw,6.5rem)] uppercase leading-[0.98] tracking-[-0.01em] text-[#0047AB]`}
          >
            AI Health Tech
            <br />
            Solution
          </h1>

          <p className="mt-6 max-w-[640px] text-sm leading-relaxed text-[#0047AB] sm:mt-8 sm:text-base lg:text-lg">
            A Malaysian technology company advancing AI, Extended Reality
            (XR) and Digital Transformation, building AI-powered healthtech
            solutions that enhance healthcare, preventive wellness, and
            digital experiences.
          </p>

          {/* CTA */}
          <a
            href="#video"
            className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-md border border-[#E8321E] bg-[#E8321E] px-7 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-white hover:text-[#E8321E] sm:mt-10 sm:text-sm"
          >
            Learn More
          </a>
        </div>
      </section>

      <div className="relative z-10 bg-white">
        <SihatAIEcosystem />
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}