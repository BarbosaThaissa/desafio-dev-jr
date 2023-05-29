import Footer from "@/components/Footer";
import HomeComponent from "@/components/HomeComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <HomeComponent />
      <Footer />
    </main>
  );
}
