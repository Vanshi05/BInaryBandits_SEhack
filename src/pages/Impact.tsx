
import { NavHeader } from "@/components/nav-header";
import { Earth, Leaf, Wind, Recycle } from "lucide-react";
import { Counter } from "@/components/ui/counter-animation";

const Impact = () => {
  return (
    <div className="min-h-screen bg-soft-white">
      <NavHeader />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold font-plus-jakarta text-navy text-center mb-8">
            Our Story & Impact
          </h1>
          
          <div className="max-w-3xl mx-auto text-lg text-sage mb-16">
            <p className="mb-6">
              ShareForward began with a simple idea: what if we could build a community where sharing 
              resources became the norm, not the exception? Founded in 2024, we set out to create a 
              platform that would make borrowing and lending as easy as buying new.
            </p>
            <p className="mb-6">
              Our mission is to reduce waste, build community connections, and make sustainable 
              living accessible to everyone. Every shared item represents one less item that needs 
              to be produced, packaged, and eventually discarded.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Earth className="w-12 h-12 text-sage mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-navy mb-2">Carbon Footprint</h3>
              <Counter end={1250} className="text-4xl font-bold text-sage mb-2" />
              <p className="text-gray-600">Metric Tons of CO₂ Saved</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Recycle className="w-12 h-12 text-sage mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-navy mb-2">Waste Reduction</h3>
              <Counter end={850} className="text-4xl font-bold text-sage mb-2" />
              <p className="text-gray-600">Tons of Waste Prevented</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Leaf className="w-12 h-12 text-sage mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-navy mb-2">Plastic Saved</h3>
              <Counter end={75} className="text-4xl font-bold text-sage mb-2" />
              <p className="text-gray-600">Metric Tons of Plastic Reduced</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Wind className="w-12 h-12 text-sage mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-navy mb-2">Community Impact</h3>
              <Counter end={15000} className="text-4xl font-bold text-sage mb-2" />
              <p className="text-gray-600">Successful Shares</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-navy mb-6">Looking Forward</h2>
            <p className="text-lg text-sage mb-6">
              Our vision extends beyond just sharing items. We're building a future where 
              communities are more connected, resources are used more efficiently, and 
              sustainable living is the default choice.
            </p>
            <p className="text-lg text-sage">
              Every item shared on our platform contributes to a larger movement of conscious 
              consumption and community building. Together, we're creating a more sustainable 
              and connected world, one share at a time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;
