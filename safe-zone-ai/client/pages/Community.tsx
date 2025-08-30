import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MessageCircle,
  Heart,
  Share2,
  MapPin,
  Clock,
  Filter,
  Search,
  PlusCircle,
  AlertTriangle,
  ThumbsUp,
  Eye,
  Users,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Community() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Posts", count: 156 },
    { id: "theft", name: "Theft & Safety", count: 45 },
    { id: "travel-tips", name: "Travel Tips", count: 38 },
    { id: "weather", name: "Weather Alerts", count: 25 },
    { id: "local-insights", name: "Local Insights", count: 48 },
  ];

  const trendingTopics = [
    "#BangkokSafety",
    "#SoloTravel",
    "#NightSafety",
    "#PublicTransport",
    "#TouristScams",
  ];

  const communityPosts = [
    {
      id: 1,
      author: {
        name: "Sarah Chen",
        avatar: "SC",
        verified: true,
        location: "Bangkok, Thailand",
      },
      timestamp: "2 hours ago",
      location: "Khao San Road, Bangkok",
      category: "theft",
      title: "Phone Snatching Incident on Khao San Road - Stay Alert",
      content:
        "Had my phone snatched while walking down Khao San Road around 10 PM last night. Two guys on a motorcycle approached from behind. Thankfully, I had my backup phone and contacts. The local police were helpful and filed a report. Warning to other travelers - keep your valuables secure and stay aware of your surroundings, especially at night.",
      images: [
        "https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F400e461dde3d44bebc2f433b0e527c0e?format=webp&width=400",
      ],
      engagement: {
        likes: 23,
        comments: 8,
        shares: 5,
        views: 156,
      },
      tags: ["theft", "bangkok", "night-safety"],
      helpfulCount: 15,
    },
    {
      id: 2,
      author: {
        name: "Mike Rodriguez",
        avatar: "MR",
        verified: false,
        location: "Mexico City, Mexico",
      },
      timestamp: "5 hours ago",
      location: "Zocalo Area, Mexico City",
      category: "travel-tips",
      title: "Safe Transportation Tips for Mexico City First-Timers",
      content:
        "After 3 weeks in Mexico City, here are my top safety tips for getting around: 1) Use official taxi apps like Uber/Didi, 2) Avoid street taxis late at night, 3) Metro is generally safe during day hours, 4) Keep emergency contacts saved offline. The city is amazing but preparation is key!",
      engagement: {
        likes: 67,
        comments: 15,
        shares: 12,
        views: 342,
      },
      tags: ["mexico-city", "transportation", "travel-tips"],
      helpfulCount: 42,
    },
    {
      id: 3,
      author: {
        name: "Emma Thompson",
        avatar: "ET",
        verified: true,
        location: "London, UK",
      },
      timestamp: "1 day ago",
      location: "Central London",
      category: "local-insights",
      title: "Weather Alert: Heavy Flooding in Central London",
      content:
        "Currently experiencing severe flooding near Westminster and London Bridge stations. Several tube lines are suspended. If you're visiting London today, check TfL updates and consider alternative routes. Emergency services are on-site. Stay safe everyone!",
      engagement: {
        likes: 134,
        comments: 28,
        shares: 89,
        views: 1205,
      },
      tags: ["london", "weather", "emergency", "public-transport"],
      helpfulCount: 78,
    },
    {
      id: 4,
      author: {
        name: "Alex Kim",
        avatar: "AK",
        verified: false,
        location: "Seoul, South Korea",
      },
      timestamp: "2 days ago",
      location: "Hongdae District, Seoul",
      category: "travel-tips",
      title: "Solo Female Traveler Tips for Seoul Nightlife",
      content:
        "Spent an amazing month in Seoul as a solo female traveler. Hongdae is generally very safe, but here are some tips: stick to main streets, clubs have good security, locals are helpful, always share your location with someone. Seoul is one of the safest cities I've visited!",
      engagement: {
        likes: 89,
        comments: 22,
        shares: 18,
        views: 567,
      },
      tags: ["seoul", "solo-travel", "nightlife", "female-safety"],
      helpfulCount: 56,
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "theft":
        return "bg-red-50 text-red-600";
      case "travel-tips":
        return "bg-blue-50 text-blue-600";
      case "weather":
        return "bg-yellow-50 text-yellow-600";
      case "local-insights":
        return "bg-green-50 text-green-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  const getSeverityIcon = (category: string) => {
    switch (category) {
      case "theft":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Travel Safety Community
                </h1>
                <p className="text-gray-600 mt-1">
                  Share experiences, stay informed, travel safely together
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                </div>
                <Link to="/report-incident">
                  <Button className="bg-safezone-blue hover:bg-safezone-blue-dark">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Share Incident
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Categories */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? "bg-safezone-blue text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-sm">{category.count}</span>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
                    Trending
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {trendingTopics.map((topic, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-blue-50"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Community Stats */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-safezone-blue" />
                      <span className="text-sm text-gray-600">
                        Active Members
                      </span>
                    </div>
                    <span className="font-semibold">12,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4 text-safezone-blue" />
                      <span className="text-sm text-gray-600">Total Posts</span>
                    </div>
                    <span className="font-semibold">3,245</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-safezone-blue" />
                      <span className="text-sm text-gray-600">
                        Reports Today
                      </span>
                    </div>
                    <span className="font-semibold">18</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Filter Bar */}
              <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select className="text-sm border-0 focus:ring-0 text-gray-900 font-medium">
                    <option>Most Recent</option>
                    <option>Most Helpful</option>
                    <option>Most Viewed</option>
                  </select>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Posts */}
              <div className="space-y-6">
                {communityPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      {/* Post Header */}
                      <div className="flex items-start space-x-4 mb-4">
                        <Avatar>
                          <AvatarFallback className="bg-safezone-blue text-white">
                            {post.author.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">
                              {post.author.name}
                            </h3>
                            {post.author.verified && (
                              <Badge className="bg-blue-50 text-blue-600 text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                            <MapPin className="w-4 h-4" />
                            <span>{post.author.location}</span>
                            <span>•</span>
                            <Clock className="w-4 h-4" />
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                        <Badge className={getCategoryColor(post.category)}>
                          {getSeverityIcon(post.category)}
                          <span className="ml-1">
                            {post.category.replace("-", " ")}
                          </span>
                        </Badge>
                      </div>

                      {/* Post Content */}
                      <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                          {post.content}
                        </p>

                        {/* Location Badge */}
                        <div className="flex items-center space-x-2 mt-3">
                          <Badge variant="outline" className="text-xs">
                            <MapPin className="w-3 h-3 mr-1" />
                            {post.location}
                          </Badge>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {post.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Images */}
                      {post.images && (
                        <div className="mb-4">
                          <img
                            src={post.images[0]}
                            alt="Incident"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}

                      {/* Engagement */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-6">
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                            <Heart className="w-5 h-5" />
                            <span className="text-sm">
                              {post.engagement.likes}
                            </span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-sm">
                              {post.engagement.comments}
                            </span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                            <Share2 className="w-5 h-5" />
                            <span className="text-sm">
                              {post.engagement.shares}
                            </span>
                          </button>
                          <div className="flex items-center space-x-2 text-gray-500">
                            <Eye className="w-5 h-5" />
                            <span className="text-sm">
                              {post.engagement.views}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <ThumbsUp className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">
                            {post.helpfulCount} found helpful
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center">
                <Button variant="outline" className="w-full max-w-xs">
                  Load More Posts
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
