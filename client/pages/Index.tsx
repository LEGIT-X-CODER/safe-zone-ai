import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/Layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  Map,
  AlertTriangle,
  Smartphone,
  Star,
  MapPin,
  TrendingUp,
  Users,
  Search,
  ChevronRight,
  CheckCircle,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MotionWrapper, MotionContainer } from "@/components/animations/MotionWrapper";
import { TypewriterText, AnimatedText } from "@/components/animations/TypewriterText";
import { CountingNumber, AnimatedStatsCard } from "@/components/animations/CountingNumber";
import { HoverEffect, FloatingElement, PulseEffect } from "@/components/animations/InteractiveEffects";

export default function Index() {
  const [destinationQuery, setDestinationQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [zoomState, setZoomState] = useState<"in" | "out">("out");
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setZoomState(y > lastY ? "in" : "out");
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setHeroVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Indian cities with pincodes
  const indianCities = [
    {
      name: "Mumbai, Maharashtra",
      pincode: "400001",
      area: "Fort, South Mumbai",
    },
    {
      name: "Delhi",
      pincode: "110001",
      area: "Connaught Place, Central Delhi",
    },
    {
      name: "Bangalore, Karnataka",
      pincode: "560001",
      area: "Bangalore GPO, Central Bangalore",
    },
    {
      name: "Chennai, Tamil Nadu",
      pincode: "600001",
      area: "Anna Salai, Central Chennai",
    },
    {
      name: "Kolkata, West Bengal",
      pincode: "700001",
      area: "BBD Bagh, Central Kolkata",
    },
    {
      name: "Hyderabad, Telangana",
      pincode: "500001",
      area: "Abids, Central Hyderabad",
    },
    {
      name: "Pune, Maharashtra",
      pincode: "411001",
      area: "Pune Camp, Central Pune",
    },
    {
      name: "Ahmedabad, Gujarat",
      pincode: "380001",
      area: "Ellis Bridge, Central Ahmedabad",
    },
    {
      name: "Jaipur, Rajasthan",
      pincode: "302001",
      area: "Civil Lines, Central Jaipur",
    },
    {
      name: "Surat, Gujarat",
      pincode: "395001",
      area: "Ring Road, Central Surat",
    },
    {
      name: "Lucknow, Uttar Pradesh",
      pincode: "226001",
      area: "Hazratganj, Central Lucknow",
    },
    {
      name: "Kanpur, Uttar Pradesh",
      pincode: "208001",
      area: "Civil Lines, Central Kanpur",
    },
    {
      name: "Nagpur, Maharashtra",
      pincode: "440001",
      area: "Civil Lines, Central Nagpur",
    },
    {
      name: "Indore, Madhya Pradesh",
      pincode: "452001",
      area: "MG Road, Central Indore",
    },
    {
      name: "Thane, Maharashtra",
      pincode: "400601",
      area: "Thane West, Central Thane",
    },
    {
      name: "Bhopal, Madhya Pradesh",
      pincode: "462001",
      area: "MP Nagar, Central Bhopal",
    },
    {
      name: "Visakhapatnam, Andhra Pradesh",
      pincode: "530001",
      area: "Dwaraka Nagar, Central Visakhapatnam",
    },
    {
      name: "Patna, Bihar",
      pincode: "800001",
      area: "Fraser Road, Central Patna",
    },
    {
      name: "Vadodara, Gujarat",
      pincode: "390001",
      area: "Mandvi, Central Vadodara",
    },
    {
      name: "Ghaziabad, Uttar Pradesh",
      pincode: "201001",
      area: "Civil Lines, Central Ghaziabad",
    },
  ];

  const features = [
    {
      icon: Map,
      title: "Real-time Safety Heatmap",
      description:
        "Interactive map with color-coded risk zones updated in real-time",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2Fe75ca4bc41174c9585429f7e36dd82a1?format=webp&width=800",
    },
    {
      icon: AlertTriangle,
      title: "Incident Reporting",
      description: "Community-driven incident reports with instant map updates",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2F07ef52a5687544e8a01aff6f15675779?format=webp&width=800",
    },
    {
      icon: Shield,
      title: "AI Risk Assessment",
      description:
        "Advanced algorithms analyze multiple data sources for accurate risk scores",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2F92b066f27d48481f941755b0aa19cfc5?format=webp&width=800",
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description:
        "Seamless experience across all devices with offline capabilities",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2F6d2ddf07b8c04a2fa506fad532ca9347?format=webp&width=800",
    },
  ];

  const riskAreas = [
    {
      name: "Downtown",
      level: "High Risk",
      score: 85,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      name: "Tourist District",
      level: "Medium Risk",
      score: 45,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      name: "Business Center",
      level: "Medium Risk",
      score: 62,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      name: "Airport Area",
      level: "Low Risk",
      score: 38,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  const testimonials = [
    {
      name: "Tara G.",
      role: "Travel Blogger",
      rating: 5,
      comment:
        "SafeZone AI helped me avoid a dangerous area during my trip to Bangkok. The real time alerts are incredibly accurate and potentially life-saving.",
      category: "Frequent Traveler",
    },
    {
      name: "Dwayne R.",
      role: "Business Executive",
      rating: 5,
      comment:
        "As a business traveler, I rely on SafeZone AI for every trip. The incident reporting feature has made me feel much more secure in unfamiliar cities.",
      category: "Corporate Traveler",
    },
    {
      name: "April W.",
      role: "Solo Traveler",
      rating: 5,
      comment:
        "The heatmap visualization is brilliant! I can see exactly which areas to avoid and plan my routes accordingly. Essential for safe female travelers.",
      category: "Adventure Enthusiast",
    },
  ];

  const handleAnalyze = () => {
    const locationToAnalyze = selectedCity || destinationQuery;
    if (locationToAnalyze.trim()) {
      // Show analysis results
      alert(
        `Analyzing safety for: ${locationToAnalyze}\n\nRisk Score: ${Math.floor(Math.random() * 100)}\nRecommendation: ${getRandomRecommendation()}`,
      );
      // In a real app, this would call an API
      console.log("Analyzing destination:", locationToAnalyze);
    } else {
      alert("Please enter a destination or select from Indian cities");
    }
  };

  const handleCitySelect = (cityValue: string) => {
    const city = indianCities.find(
      (c) => `${c.name} - ${c.pincode}` === cityValue,
    );
    if (city) {
      setSelectedCity(`${city.name} - ${city.area} (${city.pincode})`);
      setDestinationQuery(`${city.name} - ${city.area} (${city.pincode})`);
    }
  };

  const getRandomRecommendation = () => {
    const recommendations = [
      "Low risk area - Safe for travel",
      "Medium risk - Exercise normal precautions",
      "High risk - Avoid if possible",
      "Very safe area - Enjoy your visit!",
    ];
    return recommendations[Math.floor(Math.random() * recommendations.length)];
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden min-h-screen">
        <div
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-transform duration-700 will-change-transform",
            zoomState === "in" ? "scale-110" : "scale-95",
          )}
          style={{
            backgroundImage:
              "url('https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2Fe5e854ef1b0446a786c54b8a4dfcc60d?format=webp&width=800')",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex items-center">
          <div className="grid grid-cols-1 gap-12 items-center">
            <MotionWrapper variant="slideUp" duration={0.8} className="space-y-8 max-w-2xl mr-auto text-left">
              <div className="space-y-4">
                <motion.h1 
                  className="text-4xl lg:text-5xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <TypewriterText 
                    text="Travel Safely with Real-Time Risk Intelligence"
                    speed={80}
                  />
                </motion.h1>
                <motion.p 
                  className="text-xl text-blue-100"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                >
                  Get instant safety insights, live risk assessments, and
                  community-driven alerts for any destination. Make informed
                  travel decisions with our advanced AI safety platform.
                </motion.p>
              </div>

              {/* Primary CTA Buttons */}
              <motion.div 
                className="flex space-x-3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.2 }}
              >
                <Link to="/safety-map">
                  <HoverEffect scale={1.1}>
                    <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                      Explore Safety Map
                    </Button>
                  </HoverEffect>
                </Link>
                <HoverEffect scale={1.1}>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black"
                  >
                    Learn More
                  </Button>
                </HoverEffect>
              </motion.div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2Fe75ca4bc41174c9585429f7e36dd82a1?format=webp&width=1600')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <MotionWrapper variant="fadeIn" className="text-center mb-16">
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <AnimatedText 
                text="Comprehensive safety intelligence at your fingertips"
                variant="slideUp"
              />
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-200 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our platform combines real-time data, AI analysis, and community
              insights to provide unparalleled travel safety intelligence.
            </motion.p>
          </MotionWrapper>

          <MotionContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" staggerChildren={0.2}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <MotionWrapper key={index} variant="slideUp" delay={index * 0.1}>
                  <HoverEffect scale={1.08} className="h-full">
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-white/5 text-white h-full">
                      <CardHeader className="text-center">
                        <FloatingElement duration={3} delay={index * 0.5} yOffset={5}>
                          <div className="w-full h-32 mb-4 rounded-lg overflow-hidden">
                            <img
                              src={feature.image}
                              alt={feature.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </FloatingElement>
                        <PulseEffect>
                          <Icon className="w-8 h-8 text-safezone-blue mx-auto mb-2" />
                        </PulseEffect>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-center">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </HoverEffect>
                </MotionWrapper>
              );
            })}
          </MotionContainer>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionWrapper variant="fadeIn" className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              <TypewriterText 
                text="Trusted by millions worldwide"
                speed={100}
              />
            </h2>
            <p className="text-xl text-gray-300">
              Real numbers from our global safety network
            </p>
          </MotionWrapper>

          <MotionContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" staggerChildren={0.2}>
            <AnimatedStatsCard
              title="Active Users"
              value={2500000}
              suffix="+"
              description="Travelers staying safe daily"
              icon={<Users className="w-8 h-8" />}
              delay={0}
            />
            <AnimatedStatsCard
              title="Safety Reports"
              value={1250000}
              suffix="+"
              description="Community-generated incident reports"
              icon={<AlertTriangle className="w-8 h-8" />}
              delay={0.2}
            />
            <AnimatedStatsCard
              title="Cities Covered"
              value={850}
              suffix="+"
              description="Major cities with real-time data"
              icon={<Globe className="w-8 h-8" />}
              delay={0.4}
            />
            <AnimatedStatsCard
              title="Incidents Prevented"
              value={95}
              suffix="%"
              description="Success rate in risk prediction"
              icon={<Shield className="w-8 h-8" />}
              delay={0.6}
            />
          </MotionContainer>
        </div>
      </section>

      {/* Safety Heatmap Section */}
      <section
        className="py-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2F6d2ddf07b8c04a2fa506fad532ca9347?format=webp&width=1600')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <MotionWrapper variant="slideUp" className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              <AnimatedText 
                text="Interactive safety heatmap with live incident tracking"
                variant="slideUp"
              />
            </h2>
            <p className="text-xl text-gray-200">
              Click on any incident marker to view details and safety
              recommendations
            </p>
          </MotionWrapper>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Risk Score Display */}
            <MotionWrapper variant="slideLeft" delay={0.2} className="space-y-6">
              <HoverEffect scale={1.05}>
                <Card className="p-6">
                  <div className="text-center">
                    <motion.div 
                      className="relative w-24 h-24 mx-auto mb-4"
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    >
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          fill="none"
                        />
                        <motion.circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="#f59e0b"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${(62 / 100) * 251.2} 251.2`}
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, delay: 0.8 }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CountingNumber 
                          end={62}
                          duration={2}
                          delay={1}
                          className="text-2xl font-bold text-white"
                        />
                      </div>
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white">
                      Risk Score
                    </h3>
                    <p className="text-yellow-400 font-medium">Medium Risk</p>
                    <p className="text-sm text-gray-300 mt-2">
                      Based on recent incidents, crowd density, and local
                      conditions
                    </p>
                  </div>
                </Card>
              </HoverEffect>

              <MotionWrapper variant="slideUp" delay={0.4}>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Risk by Area</h4>
                  <MotionContainer staggerChildren={0.1}>
                    {riskAreas.map((area, index) => (
                      <MotionWrapper key={index} variant="slideLeft" delay={index * 0.1}>
                        <HoverEffect scale={1.02}>
                          <div
                            className={`flex items-center justify-between p-3 rounded-lg ${area.bgColor}`}
                          >
                            <div className="flex items-center space-x-3">
                              <PulseEffect>
                                <div
                                  className={`w-3 h-3 rounded-full ${area.color.replace("text-", "bg-")}`}
                                ></div>
                              </PulseEffect>
                              <div>
                                <p className="font-medium text-white">{area.name}</p>
                                <p className={`text-sm ${area.color}`}>{area.level}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <CountingNumber 
                                end={area.score}
                                duration={1.5}
                                delay={0.5 + index * 0.1}
                                className="font-bold text-white"
                              />
                              <p className="text-xs text-gray-300">Risk</p>
                            </div>
                          </div>
                        </HoverEffect>
                      </MotionWrapper>
                    ))}
                  </MotionContainer>
                </div>
              </MotionWrapper>
            </MotionWrapper>

            {/* Interactive Map */}
            <MotionWrapper variant="slideRight" delay={0.3} className="lg:col-span-2">
              <HoverEffect scale={1.02}>
                <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-96 relative overflow-hidden">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2F6d2ddf07b8c04a2fa506fad532ca9347?format=webp&width=800"
                    alt="Interactive Safety Heatmap"
                    className="w-full h-full object-cover rounded-lg"
                  />

                  {/* Incident Markers */}
                  <PulseEffect>
                    <div className="absolute top-16 left-20 w-4 h-4 bg-red-500 rounded-full shadow-lg"></div>
                  </PulseEffect>
                  <PulseEffect>
                    <div className="absolute top-32 right-24 w-4 h-4 bg-red-500 rounded-full shadow-lg"></div>
                  </PulseEffect>
                  <PulseEffect>
                    <div className="absolute bottom-24 left-1/2 w-4 h-4 bg-yellow-500 rounded-full shadow-lg"></div>
                  </PulseEffect>
                  <PulseEffect>
                    <div className="absolute bottom-16 right-16 w-4 h-4 bg-green-500 rounded-full shadow-lg"></div>
                  </PulseEffect>

                  {/* Legend */}
                  <MotionWrapper variant="slideUp" delay={0.8}>
                    <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
                      <div className="flex items-center space-x-4 text-xs">
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span>High Risk</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span>Medium Risk</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Low Risk</span>
                        </div>
                      </div>
                    </div>
                  </MotionWrapper>
                </div>
              </HoverEffect>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="py-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2F3f2ac2ddc7544ae1b748719e2dd93a11?format=webp&width=1600')",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <MotionWrapper variant="slideUp" className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              <TypewriterText 
                text="Trusted by travelers worldwide"
                speed={80}
              />
            </h2>
            <motion.div 
              className="flex items-center justify-center space-x-2 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 2 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -20, rotate: -180 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 2.2 + i * 0.1 }}
                >
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                </motion.div>
              ))}
              <motion.span 
                className="text-lg font-semibold text-white ml-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 2.7 }}
              >
                <CountingNumber end={4.9} decimals={1} duration={1.5} delay={2.8} />\5
              </motion.span>
              <motion.span 
                className="text-gray-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 3 }}
              >
                based on <CountingNumber end={2500} suffix="+" duration={1.5} delay={3} /> reviews
              </motion.span>
            </motion.div>
            <motion.div 
              className="flex justify-center space-x-4 text-sm text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 3.2 }}
            >
              <span>App Store</span>
              <span>•</span>
              <span>Google Play</span>
            </motion.div>
          </MotionWrapper>

          <MotionContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerChildren={0.2}>
            {testimonials.map((testimonial, index) => (
              <MotionWrapper key={index} variant="slideUp" delay={index * 0.2}>
                <HoverEffect scale={1.05} rotateY={5}>
                  <Card className="border-0 shadow-lg bg-white/5 text-white h-full">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <FloatingElement duration={3} delay={index * 0.5} yOffset={3}>
                          <div className="w-12 h-12 bg-safezone-blue rounded-full flex items-center justify-center text-white font-bold">
                            {testimonial.name.charAt(0)}
                          </div>
                        </FloatingElement>
                        <div>
                          <CardTitle className="text-lg">
                            {testimonial.name}
                          </CardTitle>
                          <CardDescription>{testimonial.role}</CardDescription>
                        </div>
                      </div>
                      <motion.div 
                        className="flex space-x-1"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                      >
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0, rotate: -180 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.2 + 0.7 + i * 0.1 }}
                          >
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardHeader>
                    <CardContent>
                      <motion.p 
                        className="text-gray-300 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
                      >
                        "{testimonial.comment}"
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.2 + 1 }}
                      >
                        <Badge variant="secondary" className="bg-white/10 text-white">
                          {testimonial.category}
                        </Badge>
                      </motion.div>
                    </CardContent>
                  </Card>
                </HoverEffect>
              </MotionWrapper>
            ))}
          </MotionContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 bg-gradient-teal-blue text-white shadow-glow-teal bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2Fc64ff1e0b6934305a0e3bb64f3afbb95?format=webp&width=1600')",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MotionWrapper variant="slideUp">
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <TypewriterText 
                text="Travel smart, travel safe with AI-powered insights"
                speed={80}
              />
            </motion.h2>
            <motion.p 
              className="text-xl text-blue-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 2.5 }}
            >
              Join <CountingNumber end={50000} suffix="+" duration={2} delay={3} /> travelers who trust SafeZone AI for real-time
              safety intelligence and peace of mind on every journey.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 3.5 }}
            >
              <HoverEffect scale={1.1}>
                <PulseEffect>
                  <Button className="bg-gradient-teal-blue hover:bg-gradient-lime-cyan text-white font-semibold px-8 py-3 text-lg shadow-glow-teal hover:shadow-glow-blue transition-all duration-300">
                    Start Using SafeZone AI
                  </Button>
                </PulseEffect>
              </HoverEffect>
            </motion.div>
          </MotionWrapper>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        className="py-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2F0dd2b8b949b441ef88427284d5703901?format=webp&width=1600')",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Get in touch</h2>
            <p className="text-xl text-gray-300">
              Have questions about SafeZone AI? We'd love to hear from you.
            </p>
          </div>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <Input placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-safezone-blue focus:border-transparent"
                    rows={4}
                    placeholder="Tell us about your travel safety needs..."
                  />
                </div>
                <Button className="w-full bg-gradient-teal-blue hover:bg-gradient-lime-cyan text-white shadow-glow-teal hover:shadow-glow-blue transition-all duration-300">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
