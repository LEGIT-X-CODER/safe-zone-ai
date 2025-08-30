import { useEffect, useState } from "react";
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

export default function Index() {
  const [destinationQuery, setDestinationQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [zoomState, setZoomState] = useState<"in" | "out">("out");
  useEffect(() => {
    const onWheel = (e: WheelEvent) => setZoomState(e.deltaY < 0 ? "in" : "out");
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // Indian cities with pincodes
  const indianCities = [
    { name: "Mumbai, Maharashtra", pincode: "400001", area: "Fort, South Mumbai" },
    { name: "Delhi", pincode: "110001", area: "Connaught Place, Central Delhi" },
    { name: "Bangalore, Karnataka", pincode: "560001", area: "Bangalore GPO, Central Bangalore" },
    { name: "Chennai, Tamil Nadu", pincode: "600001", area: "Anna Salai, Central Chennai" },
    { name: "Kolkata, West Bengal", pincode: "700001", area: "BBD Bagh, Central Kolkata" },
    { name: "Hyderabad, Telangana", pincode: "500001", area: "Abids, Central Hyderabad" },
    { name: "Pune, Maharashtra", pincode: "411001", area: "Pune Camp, Central Pune" },
    { name: "Ahmedabad, Gujarat", pincode: "380001", area: "Ellis Bridge, Central Ahmedabad" },
    { name: "Jaipur, Rajasthan", pincode: "302001", area: "Civil Lines, Central Jaipur" },
    { name: "Surat, Gujarat", pincode: "395001", area: "Ring Road, Central Surat" },
    { name: "Lucknow, Uttar Pradesh", pincode: "226001", area: "Hazratganj, Central Lucknow" },
    { name: "Kanpur, Uttar Pradesh", pincode: "208001", area: "Civil Lines, Central Kanpur" },
    { name: "Nagpur, Maharashtra", pincode: "440001", area: "Civil Lines, Central Nagpur" },
    { name: "Indore, Madhya Pradesh", pincode: "452001", area: "MG Road, Central Indore" },
    { name: "Thane, Maharashtra", pincode: "400601", area: "Thane West, Central Thane" },
    { name: "Bhopal, Madhya Pradesh", pincode: "462001", area: "MP Nagar, Central Bhopal" },
    { name: "Visakhapatnam, Andhra Pradesh", pincode: "530001", area: "Dwaraka Nagar, Central Visakhapatnam" },
    { name: "Patna, Bihar", pincode: "800001", area: "Fraser Road, Central Patna" },
    { name: "Vadodara, Gujarat", pincode: "390001", area: "Mandvi, Central Vadodara" },
    { name: "Ghaziabad, Uttar Pradesh", pincode: "201001", area: "Civil Lines, Central Ghaziabad" }
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
      alert(`Analyzing safety for: ${locationToAnalyze}\n\nRisk Score: ${Math.floor(Math.random() * 100)}\nRecommendation: ${getRandomRecommendation()}`);
      // In a real app, this would call an API
      console.log("Analyzing destination:", locationToAnalyze);
    } else {
      alert("Please enter a destination or select from Indian cities");
    }
  };

  const handleCitySelect = (cityValue: string) => {
    const city = indianCities.find(c => `${c.name} - ${c.pincode}` === cityValue);
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
      "Very safe area - Enjoy your visit!"
    ];
    return recommendations[Math.floor(Math.random() * recommendations.length)];
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2Feb3e34e99a9b4c59b134279ae535a885?format=webp&width=1600')" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-transform duration-700", zoomState === "in" ? "scale-105" : "scale-95")}>
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Travel Safely with Real-Time Risk Intelligence
                </h1>
                <p className="text-xl text-blue-100">
                  Get instant safety insights, live risk assessments, and
                  community-driven alerts for any destination. Make informed
                  travel decisions with our advanced AI safety platform.
                </p>
              </div>

              {/* Primary CTA Buttons */}
              <div className="flex space-x-3">
                <Link to="/safety-map">
                  <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">Explore Safety Map</Button>
                </Link>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">Learn More</Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2Feb3e34e99a9b4c59b134279ae535a885?format=webp&width=800"
                  alt="SafeZone emblem"
                  className="w-full h-64 object-contain rounded-lg bg-white/5"
                />
                <div className="absolute top-8 right-8 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>Live Tracking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url('https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2Fe75ca4bc41174c9585429f7e36dd82a1?format=webp&width=1600')" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive safety intelligence at your fingertips
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines real-time data, AI analysis, and community
              insights to provide unparalleled travel safety intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardHeader className="text-center">
                    <div className="w-full h-32 mb-4 rounded-lg overflow-hidden">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Icon className="w-8 h-8 text-safezone-blue mx-auto mb-2" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Safety Heatmap Section */}
      <section className="py-20 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url('https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2F6d2ddf07b8c04a2fa506fad532ca9347?format=webp&width=1600')" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Interactive safety heatmap with live incident tracking
            </h2>
            <p className="text-xl text-gray-600">
              Click on any incident marker to view details and safety
              recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Risk Score Display */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="#f59e0b"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(62 / 100) * 251.2} 251.2`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">
                        62
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Risk Score
                  </h3>
                  <p className="text-yellow-600 font-medium">Medium Risk</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Based on recent incidents, crowd density, and local
                    conditions
                  </p>
                </div>
              </Card>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Risk by Area</h4>
                {riskAreas.map((area, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${area.bgColor}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${area.color.replace("text-", "bg-")}`}
                      ></div>
                      <div>
                        <p className="font-medium text-gray-900">{area.name}</p>
                        <p className={`text-sm ${area.color}`}>{area.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{area.score}</p>
                      <p className="text-xs text-gray-600">Risk</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Map */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-96 relative overflow-hidden">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2F6d2ddf07b8c04a2fa506fad532ca9347?format=webp&width=800"
                  alt="Interactive Safety Heatmap"
                  className="w-full h-full object-cover rounded-lg"
                />

                {/* Incident Markers */}
                <div className="absolute top-16 left-20 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute top-32 right-24 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute bottom-24 left-1/2 w-4 h-4 bg-yellow-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute bottom-16 right-16 w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg"></div>

                {/* Legend */}
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url('https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2F3f2ac2ddc7544ae1b748719e2dd93a11?format=webp&width=1600')" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by travelers worldwide
            </h2>
            <div className="flex items-center justify-center space-x-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-current"
                />
              ))}
              <span className="text-lg font-semibold text-gray-900 ml-2">
                4.9/5
              </span>
              <span className="text-gray-600">based on 2,500+ reviews</span>
            </div>
            <div className="flex justify-center space-x-4 text-sm text-gray-600">
              <span>App Store</span>
              <span>•</span>
              <span>Google Play</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-safezone-blue rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                  <Badge
                    variant="secondary"
                    className="bg-blue-50 text-safezone-blue"
                  >
                    {testimonial.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-teal-blue text-white shadow-glow-teal bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2Fc64ff1e0b6934305a0e3bb64f3afbb95?format=webp&width=1600')" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Travel smart, travel safe with AI-powered insights
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of travelers who trust SafeZone AI for real-time
            safety intelligence and peace of mind on every journey.
          </p>
          <Button className="bg-gradient-teal-blue hover:bg-gradient-lime-cyan text-white font-semibold px-8 py-3 text-lg shadow-glow-teal hover:shadow-glow-blue transition-all duration-300 transform hover:scale-105">
            Start Using SafeZone AI
          </Button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url('https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2F0dd2b8b949b441ef88427284d5703901?format=webp&width=1600')" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get in touch
            </h2>
            <p className="text-xl text-gray-600">
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
