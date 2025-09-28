import React, { useState } from 'react';
import { Star, User, MapPin, Calendar, ThumbsUp, Filter } from 'lucide-react';
import { Layout } from '@/components/Layout';

interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  location: string;
  date: string;
  helpful: number;
  verified: boolean;
  tripType: 'business' | 'leisure' | 'adventure' | 'family';
}

const mockReviews: Review[] = [
  {
    id: '1',
    userName: 'Sarah Johnson',
    rating: 5,
    title: 'TrekSure saved my trip to Bangkok!',
    content: 'I was traveling solo to Bangkok and TrekSure\'s real-time alerts helped me avoid a dangerous area during protests. The community reports were incredibly accurate and timely. Highly recommend for solo female travelers!',
    location: 'Bangkok, Thailand',
    date: '2024-01-15',
    helpful: 24,
    verified: true,
    tripType: 'leisure'
  },
  {
    id: '2',
    userName: 'Michael Chen',
    rating: 4,
    title: 'Great for business travel',
    content: 'As someone who travels frequently for work, TrekSure has become an essential tool. The risk assessment feature helps me plan safer routes and the incident reporting keeps me informed about local conditions.',
    location: 'Mumbai, India',
    date: '2024-01-10',
    helpful: 18,
    verified: true,
    tripType: 'business'
  },
  {
    id: '3',
    userName: 'Emma Rodriguez',
    rating: 5,
    title: 'Perfect for family adventures',
    content: 'Traveling with kids requires extra safety measures. TrekSure\'s family-friendly features and detailed safety maps gave us peace of mind during our European road trip. The emergency response feature is top-notch!',
    location: 'Barcelona, Spain',
    date: '2024-01-08',
    helpful: 31,
    verified: true,
    tripType: 'family'
  },
  {
    id: '4',
    userName: 'David Kumar',
    rating: 4,
    title: 'Excellent community support',
    content: 'The community aspect of TrekSure is what sets it apart. Real travelers sharing real experiences and safety tips. Helped me navigate through some challenging areas in my backpacking trip.',
    location: 'Nepal',
    date: '2024-01-05',
    helpful: 15,
    verified: true,
    tripType: 'adventure'
  },
  {
    id: '5',
    userName: 'Lisa Thompson',
    rating: 5,
    title: 'Comprehensive safety platform',
    content: 'TrekSure covers all aspects of travel safety. From pre-trip planning to real-time assistance during travel. The AI-powered recommendations are spot-on and have helped me make informed decisions.',
    location: 'Cairo, Egypt',
    date: '2024-01-03',
    helpful: 22,
    verified: true,
    tripType: 'leisure'
  },
  {
    id: '6',
    userName: 'James Wilson',
    rating: 4,
    title: 'Reliable and user-friendly',
    content: 'Clean interface, reliable data, and excellent customer support. TrekSure has made my business trips much more secure and stress-free. The offline features are particularly useful.',
    location: 'Lagos, Nigeria',
    date: '2024-01-01',
    helpful: 19,
    verified: true,
    tripType: 'business'
  }
];

const tripTypeColors = {
  business: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  leisure: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  adventure: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  family: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
};

export default function Reviews() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating' | 'helpful'>('newest');

  const filteredReviews = mockReviews.filter(review => 
    selectedFilter === 'all' || review.tripType === selectedFilter
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'rating':
        return b.rating - a.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-500 dark:text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length;
  const totalReviews = mockReviews.length;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Travelers Say
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Real reviews from real travelers who trust TrekSure for their safety
            </p>
            
            {/* Rating Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center mb-2">
                <span className="text-3xl font-bold text-treksure-blue mr-2">
                  {averageRating.toFixed(1)}
                </span>
                <div className="flex">
                  {renderStars(Math.round(averageRating))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Based on {totalReviews} verified reviews
              </p>
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Filter by trip type:</span>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-treksure-blue"
                >
                  <option value="all">All Types</option>
                  <option value="business">Business</option>
                  <option value="leisure">Leisure</option>
                  <option value="adventure">Adventure</option>
                  <option value="family">Family</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-treksure-blue"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="rating">Highest Rating</option>
                  <option value="helpful">Most Helpful</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedReviews.map((review) => (
              <div key={review.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-treksure-blue rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{review.userName}</h3>
                      {review.verified && (
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">✓ Verified Traveler</span>
                      )}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${tripTypeColors[review.tripType]}`}>
                    {review.tripType.charAt(0).toUpperCase() + review.tripType.slice(1)}
                  </span>
                </div>

                {/* Rating and Title */}
                <div className="mb-3">
                  <div className="flex items-center mb-2">
                    {renderStars(review.rating)}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {review.rating}/5
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{review.title}</h4>
                </div>

                {/* Review Content */}
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-4">
                  {review.content}
                </p>

                {/* Review Footer */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {review.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    {review.helpful} helpful
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-treksure-blue rounded-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Experience Safe Travel?
              </h2>
              <p className="text-blue-100 mb-6">
                Join thousands of travelers who trust TrekSure for their safety
              </p>
              <button className="bg-white text-treksure-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Your Safe Journey
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}