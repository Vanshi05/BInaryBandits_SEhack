
import { NavHeader } from "@/components/nav-header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, HandHelping, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-soft-green to-soft-yellow py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold font-plus-jakarta mb-6">
            Empowering Communities Through Sharing
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-10">
            ShareForward is more than a platform – it's a movement towards sustainable, 
            collaborative consumption that brings communities closer together.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-plus-jakarta mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 mb-6">
                We believe in the power of community and shared resources. 
                ShareForward was created to reduce waste, save money, and 
                build stronger neighborhood connections by making sharing 
                easy, safe, and rewarding.
              </p>
              <Button asChild>
                <Link to="/how-it-works">Learn How We Work</Link>
              </Button>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
              alt="Community Sharing" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-plus-jakarta mb-12">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Users className="mx-auto mb-4 text-primary" size={64} />
              <h3 className="text-xl font-semibold mb-4">Community First</h3>
              <p className="text-gray-600">
                We prioritize building strong, supportive networks that 
                empower individuals through shared resources.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <HandHelping className="mx-auto mb-4 text-primary" size={64} />
              <h3 className="text-xl font-semibold mb-4">Trust & Safety</h3>
              <p className="text-gray-600">
                We've built robust verification and rating systems 
                to ensure safe and reliable sharing experiences.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Globe className="mx-auto mb-4 text-primary" size={64} />
              <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
              <p className="text-gray-600">
                By promoting resource sharing, we reduce waste and 
                contribute to a more sustainable future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-plus-jakarta mb-8">
            Join Our Sharing Community Today
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Whether you're looking to borrow, lend, or simply connect 
            with neighbors, ShareForward is your platform for collaborative living.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/browse">Browse Items</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/share">Share an Item</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
