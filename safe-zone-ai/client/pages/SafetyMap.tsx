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
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-md border-b border-gradient-teal-blue shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Safety Heatmap
                </h1>
                <p className="text-gray-600 mt-1">
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
                    {/* Background Map */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 rounded-lg relative overflow-hidden">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2Ff116dbc7f543452ea2f7f1dc18376f9d?format=webp&width=800"
                        alt="Interactive Safety Heatmap"
                        className="w-full h-full object-cover"
                      />

                      {/* Heat zones overlay */}
                      <div className="absolute inset-0">
                        {/* High risk area - Downtown */}
                        <div className="absolute top-12 left-16 w-20 h-20 bg-red-500 rounded-full opacity-30"></div>
                        <div className="absolute top-16 left-20 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg cursor-pointer hover:scale-110 transition-transform"></div>

                        {/* Medium risk area - Business Center */}
                        <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-500 rounded-full opacity-20"></div>
                        <div className="absolute top-36 right-24 w-4 h-4 bg-yellow-500 rounded-full animate-pulse shadow-lg cursor-pointer hover:scale-110 transition-transform"></div>

                        {/* Tourist District */}
                        <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-yellow-500 rounded-full animate-pulse shadow-lg cursor-pointer hover:scale-110 transition-transform"></div>

                        {/* Low risk area - Airport */}
                        <div className="absolute bottom-20 right-20 w-12 h-12 bg-green-500 rounded-full opacity-15"></div>
                        <div className="absolute bottom-24 right-24 w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg cursor-pointer hover:scale-110 transition-transform"></div>
                      </div>

                      {/* Legend */}
                      <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">
                          Risk Levels
                        </h4>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span>High Risk (70-100)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span>Medium Risk (30-69)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span>Low Risk (0-29)</span>
                          </div>
                        </div>
                      </div>

                      {/* Live indicator */}
                      <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-lg">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium text-gray-900">
                            Live Updates
                          </span>
                        </div>
                      </div>

                      {/* Zoom controls */}
                      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg">
                        <div className="flex flex-col">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-b-none"
                          >
                            +
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-t-none border-t"
                          >
                            -
                          </Button>
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
