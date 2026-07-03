import Gallery from "@/components/Gallery";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Nav />
      <Gallery />
      <main className="pt-24">
      </main>
    </div>
  );
}