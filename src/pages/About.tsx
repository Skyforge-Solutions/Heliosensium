import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Lightbulb, Mic, Flower } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-helia-blue/30 to-white pt-16 pb-24">
        <div className="helia-container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Heliosensium
            </h1>
            <p className="text-xl text-gray-700">
              Discover how Heliosensium's Helia Chat helps parents navigate the
              challenges of modern parenthood with AI-powered, personalized
              guidance.
            </p>
          </div>
        </div>
      </section>

      {/* What is HeliaSensium */}
      <section className="helia-section bg-white">
        <div className="helia-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/placeholder.svg"
                alt="About Heliosensium"
                className="w-full max-w-lg rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">What is Heliosensium?</h2>
              <p className="text-lg text-gray-700 mb-4">
                Heliosensium is a cutting-edge parenting assistant designed to
                support parents through the complex journey of raising children
                in the digital age.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Unlike generic parenting advice, Helia offers personalized
                guidance that adapts to your family's unique needs, values, and
                parenting style.
              </p>
              <p className="text-lg text-gray-700">
                Whether you're struggling with screen time management, emotional
                development, building confidence, or reducing family stress,
                Helia provides research-backed strategies tailored specifically
                to your situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Personalization Works */}
      <section className="helia-section bg-helia-soft-gray">
        <div className="helia-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">
              How Helia Personalizes Advice
            </h2>
            <p className="text-lg text-gray-700">
              Helia uses advanced technology to understand your family dynamics
              and deliver guidance that's uniquely relevant to you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="helia-card">
              <div className="w-12 h-12 bg-helia-blue rounded-full flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Learning Your Family</h3>
              <p className="text-gray-700">
                Through conversation, Helia learns about your children's ages,
                personalities, your parenting style, and your specific
                challenges.
              </p>
            </div>

            <div className="helia-card">
              <div className="w-12 h-12 bg-helia-blue rounded-full flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Adapting to Your Needs</h3>
              <p className="text-gray-700">
                As you interact with Helia, it refines its understanding of what
                works for your family and adjusts recommendations accordingly.
              </p>
            </div>

            <div className="helia-card">
              <div className="w-12 h-12 bg-helia-blue rounded-full flex items-center justify-center mb-4">
                <span className="text-lg font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Research-Backed Advice</h3>
              <p className="text-gray-700">
                All guidance is grounded in child development research and
                positive parenting practices, customized to your situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Specialized Bots */}
      <section className="helia-section bg-white">
        <div className="helia-container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-6">
              Meet Your Team of Parenting Experts
            </h2>
            <p className="text-lg text-gray-700">
              Helia consists of four specialized assistants, each focusing on a
              critical aspect of modern parenting.
            </p>
          </div>

          <div className="space-y-12">
            {/* Digital Safety */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Shield className="text-primary mr-2" />
                  Helia Sun Shield 🛡️
                </h3>
                <h4 className="text-xl text-primary mb-3">
                  Digital Safety Expert
                </h4>
                <p className="text-lg text-gray-700 mb-4">
                  In today's connected world, protecting children online is more
                  challenging than ever. Sun Shield provides practical
                  strategies for:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Age-appropriate screen time limits</li>
                  <li>Online safety education for children</li>
                  <li>Managing social media exposure</li>
                  <li>Preventing cyberbullying</li>
                  <li>Fostering healthy digital habits</li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-helia-blue rounded-lg p-8 text-center">
                  <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto flex items-center justify-center mb-4">
                    <Shield className="h-12 w-12 text-primary" />
                  </div>
                  <p className="italic">
                    "I'll help you create a safer digital environment for your
                    children while teaching them to navigate online spaces
                    responsibly."
                  </p>
                </div>
              </div>
            </div>

            {/* Emotional Growth */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2">
                <div className="bg-helia-blue rounded-lg p-8 text-center">
                  <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto flex items-center justify-center mb-4">
                    <Lightbulb className="h-12 w-12 text-primary" />
                  </div>
                  <p className="italic">
                    "I'll guide you in nurturing your child's emotional
                    intelligence, helping them understand and express their
                    feelings in healthy ways."
                  </p>
                </div>
              </div>
              <div className="order-1">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Lightbulb className="text-primary mr-2" />
                  Helia Growth Ray 💡
                </h3>
                <h4 className="text-xl text-primary mb-3">
                  Emotional Development Specialist
                </h4>
                <p className="text-lg text-gray-700 mb-4">
                  Emotional intelligence is crucial for lifelong success and
                  happiness. Growth Ray helps parents:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Teach children to identify and express emotions</li>
                  <li>Develop empathy and social skills</li>
                  <li>Handle tantrums and emotional outbursts</li>
                  <li>Build resilience and coping mechanisms</li>
                  <li>Create emotionally supportive family environments</li>
                </ul>
              </div>
            </div>

            {/* Confidence Boosting */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Mic className="text-primary mr-2" />
                  Helia Sunbeam 🎙️
                </h3>
                <h4 className="text-xl text-primary mb-3">
                  Confidence Building Coach
                </h4>
                <p className="text-lg text-gray-700 mb-4">
                  Self-confidence is foundational to a child's success and
                  happiness. Sunbeam specializes in:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Fostering growth mindset and perseverance</li>
                  <li>
                    Building self-esteem through age-appropriate challenges
                  </li>
                  <li>Offering constructive feedback that empowers</li>
                  <li>Helping children overcome self-doubt</li>
                  <li>Supporting kids through performance anxiety</li>
                </ul>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-helia-blue rounded-lg p-8 text-center">
                  <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto flex items-center justify-center mb-4">
                    <Mic className="h-12 w-12 text-primary" />
                  </div>
                  <p className="italic">
                    "I'll show you how to boost your child's self-confidence,
                    helping them believe in themselves and their abilities."
                  </p>
                </div>
              </div>
            </div>

            {/* Mindfulness */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2">
                <div className="bg-helia-blue rounded-lg p-8 text-center">
                  <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto flex items-center justify-center mb-4">
                    <Flower className="h-12 w-12 text-primary" />
                  </div>
                  <p className="italic">
                    "I'll help your family reduce stress and find calm through
                    mindfulness practices designed for parents and children."
                  </p>
                </div>
              </div>
              <div className="order-1">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Flower className="text-primary mr-2" />
                  Helia Inner Dawn 🧘
                </h3>
                <h4 className="text-xl text-primary mb-3">
                  Mindfulness & Stress Management Guide
                </h4>
                <p className="text-lg text-gray-700 mb-4">
                  Modern families face unprecedented levels of stress and
                  anxiety. Inner Dawn focuses on:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Age-appropriate mindfulness exercises for children</li>
                  <li>Stress reduction techniques for the whole family</li>
                  <li>Creating peaceful bedtime routines</li>
                  <li>Managing parental burnout</li>
                  <li>Cultivating gratitude and presence</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="helia-section bg-gradient-to-b from-helia-blue/30 to-white">
        <div className="helia-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Start Your Parenting Journey with Helia Today
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Begin with 100 free credits and experience personalized parenting
              guidance from our team of experts.
            </p>
            <Link to="/chat">
              <Button className="helia-btn-primary text-lg">
                Open HeliaChat
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
