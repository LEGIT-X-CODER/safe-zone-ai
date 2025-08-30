import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Map,
  AlertTriangle,
  Smartphone,
  Brain,
  Clock,
  Users,
  Globe,
  BarChart3,
  Bell,
  Navigation,
  Zap,
  CheckCircle,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Features() {
  const mainFeatures = [
    {
      icon: Map,
      title: "Real-time Safety Heatmap",
      description:
        "Interactive map with color-coded risk zones updated in real-time based on incidents, crowd density, and local conditions.",
      features: [
        "Live incident tracking",
        "Color-coded risk zones",
        "Historical data analysis",
        "Crowd density monitoring",
      ],
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F5d9ea8f2974646f7b075c8849f3fd9ab?format=webp&width=600",
    },
    {
      icon: AlertTriangle,
      title: "Community Incident Reporting",
      description:
        "Crowdsourced safety intelligence with instant map updates and community-driven alerts for real-time awareness.",
      features: [
        "Instant incident reporting",
        "Photo and location tagging",
        "Community verification",
        "Real-time notifications",
      ],
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F400e461dde3d44bebc2f433b0e527c0e?format=webp&width=600",
    },
    {
      icon: Brain,
      title: "AI Risk Assessment",
      description:
        "Advanced machine learning algorithms analyze multiple data sources to provide accurate, personalized risk scores.",
      features: [
        "Multi-source data analysis",
        "Predictive risk modeling",
        "Personalized recommendations",
        "Continuous learning",
      ],
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F454debd2cb5740d29a0d97806f0d6a93?format=webp&width=600",
    },
    {
      icon: Smartphone,
      title: "Mobile-First Experience",
      description:
        "Seamless experience across all devices with offline capabilities and push notifications for critical alerts.",
      features: [
        "Offline map access",
        "Push notifications",
        "Cross-device sync",
        "Emergency contacts",
      ],
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F2337ee8402c644b0b07074f9fb5864ce?format=webp&width=600",
    },
  ];

  const additionalFeatures = [
    {
      icon: Clock,
      title: "Real-time Alerts",
      description:
        "Instant notifications about incidents and safety updates in your area.",
      category: "Notifications",
    },
    {
      icon: Navigation,
      title: "Safe Route Planning",
      description:
        "AI-optimized routes that avoid high-risk areas and dangerous zones.",
      category: "Navigation",
    },
    {
      icon: Users,
      title: "Travel Community",
      description:
        "Connect with fellow travelers and share safety insights and experiences.",
      category: "Social",
    },
    {
      icon: BarChart3,
      title: "Personal Safety Score",
      description:
        "Track your safety awareness and get personalized safety recommendations.",
      category: "Analytics",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description:
        "Comprehensive safety data for major cities and destinations worldwide.",
      category: "Coverage",
    },
    {
      icon: Zap,
      title: "Emergency Response",
      description:
        "Quick access to local emergency services and safety resources.",
      category: "Emergency",
    },
  ];

  const stats = [
    {
      number: "2.5M+",
      label: "Active Users",
      description: "Travelers trust SafeZone AI",
    },
    {
      number: "50K+",
      label: "Incidents Reported",
      description: "Community-driven safety data",
    },
    {
      number: "150+",
      label: "Cities Covered",
      description: "Global safety intelligence",
    },
    {
      number: "99.9%",
      label: "Uptime",
      description: "Reliable safety monitoring",
    },
  ];

  const useCases = [
    {
      title: "Solo Travelers",
      description:
        "Enhanced safety for independent travelers with real-time alerts and community support.",
      icon: Users,
      benefits: [
        "Personal safety tracking",
        "Emergency contacts",
        "Solo travel tips",
        "Community support",
      ],
    },
    {
      title: "Business Travelers",
      description:
        "Professional travel safety with corporate reporting and risk management tools.",
      icon: BarChart3,
      benefits: [
        "Corporate dashboards",
        "Travel risk reports",
        "Policy compliance",
        "Team tracking",
      ],
    },
    {
      title: "Tourism Boards",
      description:
        "Destination safety monitoring and visitor protection with comprehensive analytics.",
      icon: Shield,
      benefits: [
        "Destination analytics",
        "Visitor safety",
        "Crisis management",
        "Reputation protection",
      ],
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen text-white bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2Fe75ca4bc41174c9585429f7e36dd82a1?format=webp&width=1600')" }}>
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="bg-blue-100 text-safezone-blue mb-4">
              <Shield className="w-4 h-4 mr-1" />
              Advanced Safety Intelligence
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Comprehensive Safety Features for Every Journey
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Discover how SafeZone AI's cutting-edge technology and
              community-driven insights keep travelers safe worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/safety-map">
                <Button className="bg-white text-safezone-blue hover:bg-gray-100 px-8 py-3">
                  Explore Safety Map
                </Button>
              </Link>
              <Link to="/report-incident">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-safezone-blue px-8 py-3"
                >
                  Report Incident
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white/5 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-safezone-blue mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-white mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-300">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-20 bg-white/5 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Core Safety Intelligence Features
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our platform combines cutting-edge AI technology with community
                insights to provide unparalleled travel safety intelligence.
              </p>
            </div>

            <div className="space-y-20">
              {mainFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-safezone-blue rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-lg text-gray-300 mb-6">
                        {feature.description}
                      </p>
                      <ul className="space-y-3 mb-8">
                        {feature.features.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-center space-x-3"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="bg-safezone-blue hover:bg-safezone-blue-dark">
                        Learn More
                      </Button>
                    </div>
                    <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-80 object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Additional Features Grid */}
        <section className="py-20 bg-white/5 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Additional Capabilities
              </h2>
              <p className="text-xl text-gray-300">
                Explore more features that make SafeZone AI the complete travel
                safety solution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {additionalFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={index}
                    className="border-0 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 bg-safezone-blue rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <Badge variant="secondary">{feature.category}</Badge>
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 bg-white/5 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Built for Every Type of Traveler
              </h2>
              <p className="text-xl text-gray-300">
                Whether you're traveling for business, leisure, or managing
                destinations, we have you covered.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => {
                const Icon = useCase.icon;
                return (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-safezone-blue rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{useCase.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 text-center mb-6">
                        {useCase.description}
                      </p>
                      <ul className="space-y-2">
                        {useCase.benefits.map((benefit, benefitIndex) => (
                          <li
                            key={benefitIndex}
                            className="flex items-center space-x-2"
                          >
                            <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                            <span className="text-sm text-gray-700">
                              {benefit}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-teal-blue text-white shadow-glow-teal">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Travel Safer?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of travelers who trust SafeZone AI for real-time
              safety intelligence and peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-safezone-blue hover:bg-gray-100 px-8 py-3">
                Start Free Trial
              </Button>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-safezone-blue px-8 py-3"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
