import { Hero } from "@/components/Hero";
import { Philosophy } from "@/components/Philosophy";
import { Tools } from "@/components/Tools";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Philosophy />
      <Tools />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
