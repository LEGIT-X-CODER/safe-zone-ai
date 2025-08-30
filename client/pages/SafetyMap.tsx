import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Search,
  Filter,
  AlertTriangle,
  Shield,
  TrendingUp,
  Clock,
  Users,
  Navigation,
  Layers,
} from "lucide-react";

export default function SafetyMap() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const riskAreas = [
    {
      id: "downtown",
      name: "Downtown",
      level: "High Risk",
      score: 85,
      color: "text-red-600",
      bgColor: "bg-red-50",
      incidents: 12,
      lastUpdate: "2 mins ago",
    },
    {
      id: "tourist",
      name: "Tourist District",
      level: "Medium Risk",
      score: 45,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      incidents: 3,
      lastUpdate: "15 mins ago",
    },
    {
      id: "business",
      name: "Business Center",
      level: "Medium Risk",
      score: 62,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      incidents: 5,
      lastUpdate: "8 mins ago",
    },
    {
      id: "airport",
      name: "Airport Area",
      level: "Low Risk",
      score: 38,
      color: "text-green-600",
      bgColor: "bg-green-50",
      incidents: 1,
      lastUpdate: "1 hour ago",
    },
  ];

  const recentIncidents = [
    {
      id: 1,
      type: "Theft",
      location: "Downtown - 5th Street",
      time: "10 minutes ago",
      severity: "high",
      description: "Reported phone snatching near metro station",
    },
    {
      id: 2,
      type: "Traffic",
      location: "Business Center - Main Ave",
      time: "25 minutes ago",
      severity: "medium",
      description: "Heavy traffic due to accident, delays expected",
    },
    {
      id: 3,
      type: "Weather",
      location: "Tourist District - Park Area",
      time: "45 minutes ago",
      severity: "low",
      description: "Light rain reported, slippery conditions",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <Layout>
      <div
        className="min-h-screen text-white bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2F6d2ddf07b8c04a2fa506fad532ca9347?format=webp&width=1600')",
        }}
      >
        {/* Header */}
        <div className="bg-black/50 backdrop-blur-md border-b border-white/10 shadow-lg text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">
                  Safety Heatmap
                </h1>
                <p className="text-gray-300 mt-1">
                  Real-time safety intelligence and incident tracking
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Current Location Risk */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-safezone-blue" />
                    Current Location Risk
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <svg className="w-20 h-20 transform -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="30"
                          stroke="#e5e7eb"
                          strokeWidth="6"
                          fill="none"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="30"
                          stroke="#10b981"
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray={`${(6 / 100) * 188.4} 188.4`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-900">
                          6
                        </span>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-900">Risk Score</p>
                    <Badge className="bg-green-50 text-green-600 hover:bg-green-50">
                      Low Risk
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Risk by Area */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Risk by Area</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {riskAreas.map((area) => (
                    <div
                      key={area.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${area.bgColor} ${
                        selectedArea === area.id
                          ? "ring-2 ring-offset-2 ring-safezone-blue"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedArea(
                          selectedArea === area.id ? null : area.id,
                        )
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">
                            {area.name}
                          </p>
                          <p className={`text-sm ${area.color}`}>
                            {area.level}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {area.incidents} incidents • {area.lastUpdate}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">
                            {area.score}
                          </p>
                          <p className="text-xs text-gray-600">Risk</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Incidents */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                    Recent Incidents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentIncidents.map((incident) => (
                    <div
                      key={incident.id}
                      className="border-l-4 border-gray-200 pl-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={getSeverityColor(incident.severity)}
                            >
                              {incident.type}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            {incident.location}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {incident.description}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                          {incident.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Map Area */}
            <div className="lg:col-span-3">
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Interactive Safety Heatmap
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Layers className="w-4 h-4 mr-2" />
                        Layers
                      </Button>
                      <Button variant="outline" size="sm">
                        <Navigation className="w-4 h-4 mr-2" />
                        My Location
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Click on any incident marker to view details and safety
                    recommendations
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative h-96 lg:h-[600px]">
                    {/* Placeholder Map */}
                    <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg relative overflow-hidden">
                      {/* Map Grid */}
                      <div className="absolute inset-0">
                        <svg className="w-full h-full opacity-20">
                          <defs>
                            <pattern
                              id="grid"
                              width="40"
                              height="40"
                              patternUnits="userSpaceOnUse"
                            >
                              <path
                                d="M 40 0 L 0 0 0 40"
                                fill="none"
                                stroke="#6366f1"
                                strokeWidth="1"
                              />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                      </div>

                      {/* Risk Zones */}
                      <div className="absolute inset-0">
                        {/* High Risk Zone */}
                        <div className="absolute top-16 left-20 w-32 h-24 bg-red-400 opacity-40 rounded-lg animate-pulse">
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-red-500 text-white text-xs">
                              High Risk
                            </Badge>
                          </div>
                        </div>

                        {/* Medium Risk Zone */}
                        <div className="absolute top-32 right-24 w-40 h-32 bg-yellow-400 opacity-40 rounded-lg">
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-yellow-500 text-white text-xs">
                              Medium Risk
                            </Badge>
                          </div>
                        </div>

                        {/* Low Risk Zone */}
                        <div className="absolute bottom-20 left-32 w-36 h-28 bg-green-400 opacity-40 rounded-lg">
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-green-500 text-white text-xs">
                              Low Risk
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Incident Markers */}
                      <div className="absolute inset-0">
                        {/* Recent Incident 1 */}
                        <div className="absolute top-24 left-32 cursor-pointer">
                          <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute"></div>
                          <div className="w-4 h-4 bg-red-600 rounded-full relative flex items-center justify-center">
                            <AlertTriangle className="w-2 h-2 text-white" />
                          </div>
                        </div>

                        {/* Recent Incident 2 */}
                        <div className="absolute top-40 right-32 cursor-pointer">
                          <div className="w-4 h-4 bg-yellow-500 rounded-full animate-ping absolute"></div>
                          <div className="w-4 h-4 bg-yellow-600 rounded-full relative flex items-center justify-center">
                            <AlertTriangle className="w-2 h-2 text-white" />
                          </div>
                        </div>

                        {/* User Location */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full relative flex items-center justify-center border-4 border-white shadow-lg">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-blue-500 text-white text-xs">
                              You are here
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Map Legend */}
                      <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Legend
                        </h4>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded"></div>
                            <span>High Risk</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                            <span>Medium Risk</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded"></div>
                            <span>Low Risk</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-3 h-3 text-red-600" />
                            <span>Recent Incidents</span>
                          </div>
                        </div>
                      </div>

                      {/* Loading Overlay (initially hidden) */}
                      <div className="absolute inset-0 bg-white bg-opacity-90 hidden items-center justify-center">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-safezone-blue mx-auto mb-2"></div>
                          <p className="text-sm text-gray-600">
                            Loading map data...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Statistics Row */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">21</p>
                    <p className="text-sm text-gray-600">Active Incidents</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Users className="w-6 h-6 text-safezone-blue" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                    <p className="text-sm text-gray-600">Active Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">95%</p>
                    <p className="text-sm text-gray-600">Areas Safe</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-50 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">2m</p>
                    <p className="text-sm text-gray-600">Avg Response</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
