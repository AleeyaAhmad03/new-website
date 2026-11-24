import Navbar from "../navbar";
import Footer from "../footer";
import { SihatChatSection } from "../components/SihatChatSection";

export default function SihatChatPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      <SihatChatSection />

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
