import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  MapPin,
  Camera,
  Clock,
  Shield,
  CheckCircle,
  Upload,
  Navigation,
} from "lucide-react";

export default function ReportIncident() {
  const [formData, setFormData] = useState({
    incidentType: "",
    severityLevel: "",
    location: "",
    description: "",
    yourName: "",
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const incidentTypes = [
    "Theft/Robbery",
    "Assault",
    "Harassment",
    "Fraud/Scam",
    "Traffic Incident",
    "Natural Disaster",
    "Medical Emergency",
    "Suspicious Activity",
    "Infrastructure Issue",
    "Other",
  ];

  const severityLevels = [
    { value: "low", label: "Low - Minor incident", color: "text-green-600" },
    {
      value: "medium",
      label: "Medium - Moderate concern",
      color: "text-yellow-600",
    },
    { value: "high", label: "High - Serious incident", color: "text-red-600" },
    {
      value: "critical",
      label: "Critical - Immediate danger",
      color: "text-red-800",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prev) => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
        },
      );
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Report Submitted
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for helping keep the community safe. Your incident
                report has been submitted and will be reviewed by our team.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full bg-safezone-blue hover:bg-safezone-blue-dark"
                >
                  Submit Another Report
                </Button>
                <Button variant="outline" className="w-full">
                  View Safety Map
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-mesh-gradient">
        {/* Header Section */}
        <div className="bg-gradient-purple-pink text-white py-12 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-safezone-blue" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Report a safety incident
            </h1>
            <p className="text-xl text-blue-100">
              Help keep the community safe by reporting incidents in real-time
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="relative -mt-8">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Incident Type */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="incident-type"
                      className="text-base font-medium"
                    >
                      Incident Type *
                    </Label>
                    <Select
                      value={formData.incidentType}
                      onValueChange={(value) =>
                        handleInputChange("incidentType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select incident type" />
                      </SelectTrigger>
                      <SelectContent>
                        {incidentTypes.map((type) => (
                          <SelectItem
                            key={type}
                            value={type
                              .toLowerCase()
                              .replace(/[^a-z0-9]/g, "-")}
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Severity Level */}
                  <div className="space-y-2">
                    <Label htmlFor="severity" className="text-base font-medium">
                      Severity Level *
                    </Label>
                    <Select
                      value={formData.severityLevel}
                      onValueChange={(value) =>
                        handleInputChange("severityLevel", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity level" />
                      </SelectTrigger>
                      <SelectContent>
                        {severityLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            <span className={level.color}>{level.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-base font-medium">
                      Location *
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="location"
                        placeholder="Street address or landmark"
                        value={formData.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                        className="flex-1"
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={getCurrentLocation}
                        className="px-3"
                      >
                        <Navigation className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Click the location icon to use your current location
                    </p>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="description"
                      className="text-base font-medium"
                    >
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what happened..."
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      rows={4}
                      className="resize-none"
                      required
                    />
                    <p className="text-sm text-gray-500">
                      Please provide as much detail as possible to help others
                      stay safe
                    </p>
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium">
                      Photos (Optional)
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload photos or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG up to 10MB each
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Contact Information (Optional)
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name (Optional)</Label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={formData.yourName}
                          onChange={(e) =>
                            handleInputChange("yourName", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email (Optional)</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      Providing contact information helps us follow up if needed
                      and improves report accuracy
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-orange-pink hover:bg-gradient-purple-pink text-white py-3 text-lg font-semibold shadow-glow hover:shadow-glow-pink transition-all duration-300"
                      disabled={
                        isSubmitting ||
                        !formData.incidentType ||
                        !formData.severityLevel ||
                        !formData.location ||
                        !formData.description
                      }
                    >
                      {isSubmitting ? "Submitting Report..." : "Submit Report"}
                    </Button>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      By submitting, you agree to our community guidelines and
                      data policy
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="bg-white py-16 mt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Live risk assessment for your location
              </h2>
              <p className="text-gray-600">
                AI-powered risk scores updated in real-time based on multiple
                data sources
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Current Location Risk */}
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <MapPin className="w-5 h-5 mr-2 text-safezone-blue" />
                    Current Location Risk
                  </CardTitle>
                </CardHeader>
                <CardContent>
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
                        stroke="#10b981"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(6 / 100) * 251.2} 251.2`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">
                        6
                      </span>
                    </div>
                  </div>
                  <Badge className="bg-green-50 text-green-600">Low Risk</Badge>
                </CardContent>
              </Card>

              {/* Risk by Area */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk by Area</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-red-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">Downtown</p>
                        <p className="text-sm text-red-600">High Risk</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900">85</p>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Tourist District
                        </p>
                        <p className="text-sm text-yellow-600">Medium Risk</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900">45</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
