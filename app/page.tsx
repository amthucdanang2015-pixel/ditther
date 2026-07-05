import Effect from "@/components/Effect";
import Gallery from "@/components/Gallery";
import Nav from "@/components/Nav";
import HIW from "@/components/HIW";
import Pricing from "@/components/Pricing";
import Guides from "@/components/Guides";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer2";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white">
      <Nav />
      <Gallery />
      <Effect />
      <HIW />
      <Pricing />
      <Guides />
      <FAQ />
      <Footer />
    </div>
  );
}
