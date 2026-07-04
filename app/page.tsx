import Effect from "@/components/Effect";
import Gallery from "@/components/Gallery";
import Nav from "@/components/Nav";
import HIW from "@/components/HIW";
import Pricing from "@/components/Pricing";
import Guides from "@/components/Guides";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Nav />
      <Gallery />
      <Effect />
      <HIW />
      <Pricing />
      <FAQ />
      <Guides />
      <main className="pt-24">
      </main>
    </div>
  );
}