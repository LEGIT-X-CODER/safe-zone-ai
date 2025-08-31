import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";
import L from "leaflet";
import "leaflet.heat";

// Extend Leaflet types for heatLayer
declare module 'leaflet' {
  function heatLayer(latlngs: Array<[number, number, number]>, options?: any): L.Layer;
}

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Incident {
  id: string;
  type: string;
  location: string;
  lat: number;
  lng: number;
  severity: "high" | "medium" | "low";
  description: string;
  timestamp: Date;
  intensity: number; // For heatmap intensity
}

interface SafetyZone {
  id: string;
  name: string;
  level: "High Risk" | "Medium Risk" | "Low Risk";
  score: number;
  color: string;
  bgColor: string;
  incidents: number;
  lastUpdate: string;
  center: [number, number];
  radius: number;
}

export default function SafetyMap() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [heatmapLayer, setHeatmapLayer] = useState<L.Layer | null>(null);
  const [incidentMarkers, setIncidentMarkers] = useState<L.Marker[]>([]);
  const [zoneCircles, setZoneCircles] = useState<L.Circle[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);

  // Kanpur incident data with real coordinates
  const dummyIncidents: Incident[] = [
    {
      id: "1",
      type: "Theft",
      location: "Civil Lines - Mall Road",
      lat: 26.4499,
      lng: 80.3319,
      severity: "high",
      description: "Reported phone snatching near shopping complex",
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      intensity: 0.9,
    },
    {
      id: "2",
      type: "Traffic",
      location: "Kakadeo - GT Road",
      lat: 26.4609,
      lng: 80.3496,
      severity: "medium",
      description: "Heavy traffic due to construction work",
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      intensity: 0.6,
    },
    {
      id: "3",
      type: "Weather",
      location: "Kidwai Nagar - Green Park",
      lat: 26.4738,
      lng: 80.3318,
      severity: "low",
      description: "Waterlogging reported after rain",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      intensity: 0.3,
    },
    {
      id: "4",
      type: "Assault",
      location: "Govind Nagar - Main Market",
      lat: 26.4478,
      lng: 80.3463,
      severity: "high",
      description: "Physical altercation reported",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      intensity: 0.95,
    },
    {
      id: "5",
      type: "Vandalism",
      location: "Swaroop Nagar - Commercial Area",
      lat: 26.4667,
      lng: 80.3498,
      severity: "medium",
      description: "Property damage at shop",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      intensity: 0.7,
    },
    {
      id: "6",
      type: "Harassment",
      location: "Arya Nagar - Bus Stand",
      lat: 26.4851,
      lng: 80.3289,
      severity: "medium",
      description: "Verbal harassment reported at public transport",
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      intensity: 0.5,
    },
    {
      id: "7",
      type: "Robbery",
      location: "Rawatpur - Railway Crossing",
      lat: 26.4434,
      lng: 80.3222,
      severity: "high",
      description: "Chain snatching incident reported",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      intensity: 1.0,
    },
    {
      id: "8",
      type: "Traffic",
      location: "Chakeri - Airport Road",
      lat: 26.4041,
      lng: 80.4098,
      severity: "low",
      description: "Minor traffic congestion near airport",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      intensity: 0.2,
    },
  ];

  const safetyZones: SafetyZone[] = [
    {
      id: "civil-lines",
      name: "Civil Lines",
      level: "High Risk",
      score: 75,
      color: "text-red-600",
      bgColor: "bg-red-50",
      incidents: 3,
      lastUpdate: "2 mins ago",
      center: [26.4499, 80.3319],
      radius: 1500,
    },
    {
      id: "kidwai-nagar",
      name: "Kidwai Nagar",
      level: "Medium Risk",
      score: 55,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      incidents: 2,
      lastUpdate: "15 mins ago",
      center: [26.4738, 80.3318],
      radius: 1200,
    },
    {
      id: "swaroop-nagar",
      name: "Swaroop Nagar",
      level: "Medium Risk",
      score: 62,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      incidents: 2,
      lastUpdate: "8 mins ago",
      center: [26.4667, 80.3498],
      radius: 1100,
    },
    {
      id: "chakeri",
      name: "Chakeri (Airport Area)",
      level: "Low Risk",
      score: 35,
      color: "text-green-600",
      bgColor: "bg-green-50",
      incidents: 1,
      lastUpdate: "1 hour ago",
      center: [26.4041, 80.4098],
      radius: 2000,
    },
    {
      id: "govind-nagar",
      name: "Govind Nagar",
      level: "High Risk",
      score: 78,
      color: "text-red-600",
      bgColor: "bg-red-50",
      incidents: 2,
      lastUpdate: "5 mins ago",
      center: [26.4478, 80.3463],
      radius: 1000,
    },
  ];

  useEffect(() => {
    if (mapRef.current && !mapInstance) {
      try {
        setIsMapLoading(true);
        setMapError(null);
        
        // Initialize map centered on Kanpur
        const map = L.map(mapRef.current).setView([26.4499, 80.3319], 12);
        
        // Add OpenStreetMap tiles with error handling
        const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 19,
        });
        
        tileLayer.on('tileerror', (e) => {
          console.warn('Tile loading error:', e);
        });
        
        tileLayer.on('load', () => {
          setIsMapLoading(false);
        });
        
        tileLayer.addTo(map);

        setMapInstance(map);

        // Add safety zone circles
        const circles: L.Circle[] = [];
        safetyZones.forEach((zone) => {
          const color = zone.level === "High Risk" ? "#ef4444" : 
                       zone.level === "Medium Risk" ? "#f59e0b" : "#10b981";
          
          const circle = L.circle(zone.center, {
            color: color,
            fillColor: color,
            fillOpacity: 0.1,
            radius: zone.radius,
          }).addTo(map).bindPopup(`
            <div class="p-2">
              <h3 class="font-bold text-lg">${zone.name}</h3>
              <p class="text-sm text-gray-600">${zone.level}</p>
              <p class="text-sm">Safety Score: ${zone.score}/100</p>
              <p class="text-sm">Recent Incidents: ${zone.incidents}</p>
            </div>
          `);
          circles.push(circle);
        });
        setZoneCircles(circles);

      } catch (error) {
        console.error('Error initializing map:', error);
        setMapError('Failed to initialize map. Please refresh the page.');
        setIsMapLoading(false);
      }
    }

    // Cleanup function
    return () => {
      if (mapInstance) {
        try {
          // Clean up markers
          incidentMarkers.forEach(marker => {
            mapInstance.removeLayer(marker);
          });
          
          // Clean up circles
          zoneCircles.forEach(circle => {
            mapInstance.removeLayer(circle);
          });
          
          // Clean up heatmap
          if (heatmapLayer) {
            mapInstance.removeLayer(heatmapLayer);
          }
          
          // Remove map instance
          mapInstance.remove();
          setMapInstance(null);
        } catch (error) {
          console.error('Error cleaning up map:', error);
        }
      }
    };
  }, []); // Empty dependency array for mount/unmount only

  useEffect(() => {
    if (!mapInstance) return;

    try {
      // Clean up existing layers
      if (heatmapLayer) {
        mapInstance.removeLayer(heatmapLayer);
        setHeatmapLayer(null);
      }

      // Clean up existing incident markers
      incidentMarkers.forEach(marker => {
        mapInstance.removeLayer(marker);
      });
      setIncidentMarkers([]);

      const newMarkers: L.Marker[] = [];

      // Add heatmap layer if enabled
      if (showHeatmap) {
        const heatmapData = dummyIncidents.map(incident => [
          incident.lat,
          incident.lng,
          incident.intensity
        ] as [number, number, number]);

        const heatmap = L.heatLayer(heatmapData, {
          radius: 25,
          blur: 15,
          maxZoom: 10,
          gradient: {
            0.4: '#10b981', // Green for low risk
            0.6: '#f59e0b', // Yellow for medium risk
            0.8: '#ef4444', // Red for high risk
            1.0: '#dc2626'  // Dark red for very high risk
          }
        }).addTo(mapInstance);

        setHeatmapLayer(heatmap);
      }

      // Add incident markers if enabled
      if (showIncidents) {
        dummyIncidents.forEach(incident => {
          const color = incident.severity === "high" ? "#ef4444" : 
                       incident.severity === "medium" ? "#f59e0b" : "#10b981";
          
          const icon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.3);"></div>`,
            iconSize: [12, 12],
            iconAnchor: [6, 6]
          });

          const marker = L.marker([incident.lat, incident.lng], { icon })
            .addTo(mapInstance)
            .bindPopup(`
              <div class="p-2">
                <h3 class="font-bold text-lg">${incident.type}</h3>
                <p class="text-sm text-gray-600">${incident.location}</p>
                <p class="text-sm">${incident.description}</p>
                <p class="text-sm text-gray-500">${incident.timestamp.toLocaleTimeString()}</p>
              </div>
            `);
          
          newMarkers.push(marker);
        });
        
        setIncidentMarkers(newMarkers);
      }
    } catch (error) {
      console.error('Error updating map layers:', error);
    }
  }, [mapInstance, showHeatmap, showIncidents]);

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

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case "medium":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "low":
        return <Shield className="w-4 h-4 text-green-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  // Memoize recent incidents calculation
  const recentIncidents = useMemo(() => {
    return dummyIncidents
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 5);
  }, []);

  // Callback for refresh functionality
  const handleRefresh = useCallback(() => {
    if (mapInstance) {
      // Force re-render of layers
      setShowHeatmap(prev => {
        const current = prev;
        setShowHeatmap(false);
        setTimeout(() => setShowHeatmap(current), 100);
        return current;
      });
    }
  }, [mapInstance]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Map Section */}
          <div className="lg:w-2/3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Safety Heatmap
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={showHeatmap ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowHeatmap(!showHeatmap)}
                    >
                      {showHeatmap ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      Heatmap
                    </Button>
                    <Button
                      variant={showIncidents ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowIncidents(!showIncidents)}
                    >
                      {showIncidents ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      Incidents
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleRefresh}>
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {mapError ? (
                    <div className="w-full h-[600px] rounded-lg border flex items-center justify-center bg-red-50">
                      <div className="text-center">
                        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-red-700 mb-2">Map Loading Error</h3>
                        <p className="text-red-600 mb-4">{mapError}</p>
                        <Button 
                          onClick={() => window.location.reload()}
                          variant="outline"
                          className="border-red-300 text-red-700 hover:bg-red-100"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Reload Page
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        ref={mapRef}
                        className="w-full h-[600px] rounded-lg border"
                        style={{ zIndex: 1 }}
                      />
                      {isMapLoading && (
                        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                          <div className="text-center">
                            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-primary" />
                            <p className="text-gray-600">Loading map...</p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-white p-3 rounded-lg shadow-lg">
                      <h4 className="font-semibold text-sm mb-2">Legend</h4>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span>Low Risk</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span>Medium Risk</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span>High Risk</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Area
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Search for location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button className="w-full">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Risk Areas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Risk Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {safetyZones.map((area) => (
                    <div
                      key={area.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedArea === area.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedArea(area.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{area.name}</h4>
                          <p className={`text-sm ${area.color}`}>{area.level}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{area.score}</div>
                          <div className="text-xs text-gray-500">Safety Score</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                        <span>{area.incidents} incidents</span>
                        <span>{area.lastUpdate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Incidents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Recent Incidents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentIncidents.map((incident) => (
                    <div key={incident.id} className="p-3 border rounded-lg">
                      <div className="flex items-start gap-3">
                        {getSeverityIcon(incident.severity)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{incident.type}</h4>
                          <p className="text-xs text-gray-600">{incident.location}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {incident.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                        <Badge className={getSeverityColor(incident.severity)}>
                          {incident.severity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
