import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-helia-blue/30 to-white pt-16 pb-24">
        <div className="helia-container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Start with 100 free credits. Upgrade only when you're ready.
            </p>

            <div className="bg-white p-4 rounded-full inline-flex items-center space-x-4 mb-6">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-2 rounded-full ${
                  !isAnnual
                    ? "bg-primary text-white"
                    : "bg-transparent text-gray-600"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-2 rounded-full ${
                  isAnnual
                    ? "bg-primary text-white"
                    : "bg-transparent text-gray-600"
                }`}
              >
                Annual <span className="text-xs font-medium">Save 20%</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Credit System Explanation */}
      <section className="helia-section bg-white">
        <div className="helia-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">How Credits Work</h2>
            <p className="text-lg text-gray-700">
              Helia Chat uses a simple credit system, making it easy to
              understand exactly what you're using.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="helia-card text-center">
              <div className="w-16 h-16 bg-helia-blue rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">
                One Conversation = 1 Credit
              </h3>
              <p className="text-gray-700">
                Each time you chat with any of Helia's parenting specialists, it
                counts as just one credit.
              </p>
            </div>

            <div className="helia-card text-center">
              <div className="w-16 h-16 bg-helia-blue rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">No Hidden Fees</h3>
              <p className="text-gray-700">
                Your subscription includes access to all four specialists with
                no extra charges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="helia-section bg-helia-soft-gray">
        <div className="helia-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="helia-card flex flex-col h-full">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
                <p className="text-gray-700">Perfect for trying Helia</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold">100</span>
                  <span className="text-lg text-gray-600 ml-2">credits</span>
                </div>
                <p className="text-gray-500 mt-2">
                  One-time offer for new users
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Check className="text-primary mr-2 h-5 w-5 mt-0.5" />
                  <p>Access to all 4 parenting specialists</p>
                </div>
                <div className="flex items-start">
                  <Check className="text-primary mr-2 h-5 w-5 mt-0.5" />
                  <p>Personalized onboarding</p>
                </div>
                <div className="flex items-start">
                  <Check className="text-primary mr-2 h-5 w-5 mt-0.5" />
                  <p>Basic parenting resources</p>
                </div>
              </div>

              <div className="mt-auto">
                <Link to="/chat">
                  <Button className="w-full helia-btn-primary">
                    Start Free
                  </Button>
                </Link>
                <p className="text-center text-sm text-gray-500 mt-4">
                  No credit card required
                </p>
              </div>
            </div>

            {/* Monthly/Annual Plan */}
            <div className="helia-card flex flex-col h-full relative border-primary">
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">
                  {isAnnual ? "Annual Plan" : "Monthly Plan"}
                </h3>
                <p className="text-gray-700">Best for active parents</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold">
                    ${isAnnual ? "99" : "9.99"}
                  </span>
                  <span className="text-lg text-gray-600 ml-2">
                    /{isAnnual ? "year" : "month"}
                  </span>
                </div>
                {isAnnual && (
                  <p className="text-green-600 mt-2">
                    Save 20% with annual billing
                  </p>
                )}
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Check className="text-primary mr-2 h-5 w-5 mt-0.5" />
                  <p>
                    <strong>Unlimited</strong> conversations with all parenting
                    specialists
                  </p>
                </div>
                <div className="flex items-start">
                  <Check className="text-primary mr-2 h-5 w-5 mt-0.5" />
                  <p>Personalized recommendations</p>
                </div>
                <div className="flex items-start">
                  <Check className="text-primary mr-2 h-5 w-5 mt-0.5" />
                  <p>Premium parenting resources</p>
                </div>
                <div className="flex items-start">
                  <Check className="text-primary mr-2 h-5 w-5 mt-0.5" />
                  <p>Conversation history</p>
                </div>
                <div className="flex items-start">
                  <Check className="text-primary mr-2 h-5 w-5 mt-0.5" />
                  <p>Priority support</p>
                </div>
              </div>

              <div className="mt-auto">
                <Link to="/chat">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>

            {/* Family Plan */}
            <div className="helia-card flex flex-col h-full">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Family Plan</h3>
                <p className="text-gray-700">Perfect for extended family</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold">
                    ${isAnnual ? "149" : "14.99"}
                  </span>
                  <span className="text-lg text-gray-600 ml-2">
                    /{isAnnual ? "year" : "month"}
                  </span>
                </div>
                {isAnnual && (
                  <p className="text-green-600 mt-2">
                    Save 20% with annual billing
                  </p>
                )}
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Check className="text-primary mr-2 h-5 w-5 mt-0.5" />
                  <p>Everything in the standard plan</p>
                </div>
                <div className="flex items-start">
                  <Check className="text-primary mr-2 h-5 w-5 mt-0.5" />
                  <p>
                    <strong>5 user accounts</strong> for caregivers
                  </p>
                </div>
                <div className="flex items-start">
                  <Check className="text-primary mr-2 h-5 w-5 mt-0.5" />
                  <p>Shared conversation history</p>
                </div>
                <div className="flex items-start">
                  <Check className="text-primary mr-2 h-5 w-5 mt-0.5" />
                  <p>Family consistency guidance</p>
                </div>
              </div>

              <div className="mt-auto">
                <Link to="/chat">
                  <Button className="w-full helia-btn-outline">
                    Choose Family Plan
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="helia-section bg-white">
        <div className="helia-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-2">
                What can I do with 100 free credits?
              </h3>
              <p className="text-gray-700">
                100 credits lets you have 100 full conversations with Helia's
                specialists. That's enough for several months of occasional use,
                or a few weeks of daily conversations.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">
                Can I switch between specialists?
              </h3>
              <p className="text-gray-700">
                Yes! You can speak with any of our four parenting specialists
                (Digital Guide for tech/internet safety, Emotional Coach for
                handling tantrums and feelings, Growth Mentor for development
                and confidence, or Parent Mindfulness for your own growth) at
                any time without using extra credits.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-gray-700">
                Absolutely. You can cancel your subscription at any time. If you
                cancel, you'll still have access to Helia until the end of your
                billing period.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">
                Is my family's information private?
              </h3>
              <p className="text-gray-700">
                Yes. We take privacy seriously. Your conversations with Helia
                are confidential and secure. We never share your personal
                information with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="helia-section bg-gradient-to-b from-helia-blue/30 to-white">
        <div className="helia-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Parenting Journey?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Start with 100 free credits and experience how Helia can support
              your family.
            </p>
            <Link to="/chat">
              <Button className="helia-btn-primary text-lg">
                Get Started Free
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required for free plan
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Pricing;
