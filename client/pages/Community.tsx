import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  ThumbsDown,
  Eye,
  Users,
  TrendingUp,
  Send,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { CommunityService, type CommunityPost } from "@/lib/firestore";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";

export default function Community() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "discussion",
    tags: []
  });
  const [tagInput, setTagInput] = useState("");
  
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();

  const categories = [
    { id: "all", name: "All Posts", count: 0 },
    { id: "discussion", name: "Discussions", count: 0 },
    { id: "question", name: "Questions", count: 0 },
    { id: "tip", name: "Travel Tips", count: 0 },
    { id: "warning", name: "Warnings", count: 0 },
    { id: "local-insights", name: "Local Insights", count: 0 },
  ];

  const trendingTopics = [
    "#SafeTravel",
    "#SoloTravel",
    "#NightSafety",
    "#PublicTransport",
    "#TouristTips",
  ];

  // Fetch posts from Firebase
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError("");
        console.log('Starting fetch for category:', selectedCategory);
        console.log('Current user:', currentUser ? 'Logged in' : 'Not logged in');
        console.log('User profile:', userProfile);
        console.log('Firestore DB available:', !!db);
        
        let fetchedPosts;
        
        if (selectedCategory === 'all') {
          console.log('Fetching all posts...');
          fetchedPosts = await CommunityService.getPosts();
        } else {
          console.log('Fetching posts for category:', selectedCategory);
          fetchedPosts = await CommunityService.getPosts(selectedCategory);
        }
        
        console.log('Fetched posts result:', fetchedPosts);
        console.log('Number of posts fetched:', fetchedPosts.length);
        
        // Log each post for debugging
        fetchedPosts.forEach((post, index) => {
          console.log(`Post ${index + 1}:`, {
            id: post.id,
            title: post.title,
            category: post.category,
            author: post.authorName,
            createdAt: post.createdAt
          });
        });
        
        setPosts(fetchedPosts);
        
        // Update category counts
        const categoryCounts = categories.map(category => {
          if (category.id === 'all') {
            return { ...category, count: fetchedPosts.length };
          } else {
            const count = fetchedPosts.filter(post => post.category === category.id).length;
            return { ...category, count };
          }
        });
        
        console.log('Category counts updated:', categoryCounts);
        setLoading(false);
        
      } catch (err) {
        console.error('Error fetching posts:', err);
        console.error('Error details:', {
          message: err.message,
          code: err.code,
          stack: err.stack
        });
        
        // Try one more fallback with direct collection access
        try {
          console.log('Attempting direct collection access...');
          const directQuery = await getDocs(collection(db, 'community_posts'));
          console.log('Direct query result size:', directQuery.size);
          
          const directPosts = directQuery.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as CommunityPost[];
          
          console.log('Direct posts:', directPosts);
          setPosts(directPosts);
          setError('');
          
        } catch (directErr) {
          console.error('Direct query also failed:', directErr);
          setError(`Failed to load community posts: ${err.message}`);
          setPosts([]);
        }
        
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory, currentUser, db]);
  
  // Filter posts based on search query
  const filteredPosts = posts.filter(post => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      (post.title && post.title.toLowerCase().includes(query)) ||
      (post.content && post.content.toLowerCase().includes(query)) ||
      (post.authorName && post.authorName.toLowerCase().includes(query)) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  });

  // Handle creating a new post
  const handleCreatePost = async () => {
    if (!currentUser || !userProfile) {
      alert('You must be logged in to create a post');
      return;
    }

    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    try {
      const postData = {
        authorId: currentUser.uid,
        authorName: userProfile.displayName || currentUser.email?.split('@')[0] || 'Anonymous',
        authorAvatar: userProfile.photoURL,
        title: newPost.title.trim(),
        content: newPost.content.trim(),
        category: newPost.category as CommunityPost['category'],
        tags: newPost.tags,
        upvotes: 0,
        downvotes: 0,
        votedBy: [],
        commentCount: 0,
        viewCount: 0,
        isPinned: false
      };

      await CommunityService.createPost(postData);
      
      // Reset form and close dialog
      setNewPost({
        title: "",
        content: "",
        category: "discussion",
        tags: []
      });
      setIsCreateDialogOpen(false);
      
      // Refresh posts
      const refreshedPosts = await CommunityService.getPosts(selectedCategory === 'all' ? undefined : selectedCategory);
      setPosts(refreshedPosts);
    } catch (err) {
      console.error('Error creating post:', err);
      alert('Failed to create post. Please try again.');
    }
  };

  // Handle adding tags
  const handleAddTag = () => {
    if (tagInput.trim() && !newPost.tags.includes(tagInput.trim())) {
      setNewPost({
        ...newPost,
        tags: [...newPost.tags, tagInput.trim()]
      });
      setTagInput("");
    }
  };

  // Handle removing tags
  const handleRemoveTag = (tagToRemove: string) => {
    setNewPost({
      ...newPost,
      tags: newPost.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Format timestamp
  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return "";
    
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (err) {
      console.error('Error formatting timestamp:', err);
      return "";
    }
  };

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
      <div
        className="min-h-screen text-foreground bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('https://cdn.builder.io/api/v1/image/assets%2F5bd1553efac94655a6a311a554d81a53%2F6d2ddf07b8c04a2fa506fad532ca9347?format=webp&width=1600')",
        }}
      >
        {/* Create Post Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-[600px] bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Create a New Post</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Title</label>
                <Input 
                  placeholder="Enter post title" 
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  className="bg-background border-border text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Content</label>
                <Textarea 
                  placeholder="Share your experience or question..." 
                  className="min-h-[120px] bg-background border-border text-foreground"
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Category</label>
                <Select 
                  value={newPost.category}
                  onValueChange={(value) => setNewPost({...newPost, category: value})}
                >
                  <SelectTrigger className="bg-background border-border text-foreground">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discussion">Discussion</SelectItem>
                    <SelectItem value="question">Question</SelectItem>
                    <SelectItem value="tip">Travel Tip</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="local-insights">Local Insight</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-foreground">Tags</label>
                <div className="flex items-center space-x-2">
                  <Input 
                    placeholder="Add a tag" 
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                    className="bg-background border-border text-foreground"
                  />
                  <Button type="button" onClick={handleAddTag} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Add</Button>
                </div>
                {newPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newPost.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="px-2 py-1">
                        {tag}
                        <button 
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 text-xs hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="border-border text-foreground">Cancel</Button>
              <Button onClick={handleCreatePost} className="bg-primary text-primary-foreground hover:bg-primary/90">Create Post</Button>
            </div>
          </DialogContent>
        </Dialog>
        {/* Header */}
        <div className="bg-card/50 backdrop-blur-md border-b border-border text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white">
                  Travel Safety Community
                </h1>
                <p className="text-white/70 mt-1">
                  Share experiences, stay informed, travel safely together
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-5 h-5 text-white/70" />
                  <Input
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 bg-white/10 border-white/20 text-white placeholder-white/70"
                  />
                </div>
                <Link to="/report-incident">
                  <Button className="bg-primary hover:bg-primary/90">
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
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent"
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
                    <TrendingUp className="w-5 h-5 mr-2 text-orange-500 dark:text-orange-400" />
                    Trending
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <TrendingUp className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{topic}</p>
                        <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 50) + 10} posts</p>
                      </div>
                    </div>
                  ))}
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
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Active Members
                      </span>
                    </div>
                    <span className="font-semibold text-primary">12,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Total Posts</span>
                    </div>
                    <span className="font-semibold text-primary">3,245</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-400" />
                      <span className="text-sm text-muted-foreground">
                        Reports Today
                      </span>
                    </div>
                    <span className="font-semibold text-red-500 dark:text-red-400">18</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Filter Bar */}
              <div className="bg-card/5 backdrop-blur-sm rounded-lg p-4 mb-6">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-white/70" />
                    <span className="text-sm font-medium text-white/70">Filter by:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => {
                        if (!currentUser) {
                          alert('You must be logged in to create a post');
                          return;
                        }
                        setIsCreateDialogOpen(true);
                      }}
                      variant="default"
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Create Post
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                </div>
              </div>

              {/* Posts */}
              <div className="space-y-6">
                {loading ? (
                  <div className="text-center py-10">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
                    <p className="text-white">Loading posts...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-10 text-destructive">
                    <AlertTriangle className="mx-auto h-8 w-8 mb-2" />
                    <p>{error}</p>
                  </div>
                ) : filteredPosts.length === 0 ? (
                   <div className="text-center py-10 text-white">
                     {searchQuery.trim() ? (
                       <>
                         <p>No posts found matching "{searchQuery}".</p>
                         <Button 
                           onClick={() => setSearchQuery('')}
                           className="mt-4"
                         >
                           Clear search
                         </Button>
                       </>
                     ) : (
                       <>
                         <p>No posts found in this category.</p>
                         <Button 
                           onClick={() => {
                             if (!currentUser) {
                               alert('You must be logged in to create a post');
                               return;
                             }
                             setIsCreateDialogOpen(true);
                           }}
                           className="mt-4"
                         >
                           Create the first post
                         </Button>
                       </>
                     )}
                   </div>
                 ) : (
                  filteredPosts.map((post, index) => (
                    <Card
                      key={post.id}
                      className="border-white/10 bg-card/5 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow animate-fade-up"
                      style={{ animationDelay: `${index * 120}ms` }}
                      onClick={async () => {
                        // Increment view count when post is viewed
                        if (post.id) {
                          try {
                            await CommunityService.incrementViewCount(post.id);
                            // Update local post view count
                            setPosts(prevPosts => 
                              prevPosts.map(p => 
                                p.id === post.id ? {...p, viewCount: (p.viewCount || 0) + 1} : p
                              )
                            );
                          } catch (err) {
                            console.error('Error incrementing view count:', err);
                          }
                        }
                      }}
                    >
                      <CardContent className="p-6">

                      {/* Post Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            {post.authorAvatar ? (
                              <AvatarImage src={post.authorAvatar} alt={post.authorName || 'User'} />
                            ) : (
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {post.authorName ? post.authorName.substring(0, 2).toUpperCase() : 'U'}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-1">
                              <h3 className="font-medium text-white">{post.authorName || 'Anonymous User'}</h3>
                            </div>
                            <div className="text-sm text-white/60">
                              {formatTimestamp(post.createdAt)}
                            </div>
                          </div>
                        </div>
                        <Badge
                          className={getCategoryColor(post.category)}
                        >
                          {getSeverityIcon(post.category)}
                          <span className="ml-1">
                            {post.category === "discussion"
                              ? "Discussion"
                              : post.category === "question"
                                ? "Question"
                                : post.category === "tip"
                                  ? "Travel Tip"
                                  : post.category === "warning"
                                    ? "Warning"
                                    : "Local Insight"}
                          </span>
                        </Badge>
                      </div>

                      {/* Post Content */}
                      <div className="mb-4">
                        <h2 className="text-lg font-semibold text-white mb-2">
                          {post.title}
                        </h2>
                        <p className="text-white/80 leading-relaxed whitespace-pre-line">
                          {post.content}
                        </p>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {post.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs bg-white/10 text-white/70 border-white/20"
                              >
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Engagement */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center space-x-6">
                          <button
                            className="flex items-center space-x-2 text-white/60 hover:text-blue-400 transition-colors"
                            onClick={async () => {
                              if (!currentUser) {
                                alert('You must be logged in to vote');
                                return;
                              }
                              try {
                                await CommunityService.voteOnPost(post.id!, currentUser.uid, 'up');
                                // Refresh posts after voting
                                const refreshedPosts = await CommunityService.getPosts(
                                  selectedCategory === 'all' ? undefined : selectedCategory
                                );
                                setPosts(refreshedPosts);
                              } catch (err) {
                                console.error('Error voting on post:', err);
                              }
                            }}
                          >
                            <ThumbsUp className="w-5 h-5" />
                            <span className="text-sm">
                              {post.upvotes || 0}
                            </span>
                          </button>
                          <button className="flex items-center space-x-2 text-white/60 hover:text-blue-400 transition-colors">
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-sm">
                              {post.commentCount || 0}
                            </span>
                          </button>
                          <button 
                            className="flex items-center space-x-2 text-white/60 hover:text-red-400 transition-colors"
                            onClick={async () => {
                              if (!currentUser) {
                                alert('You must be logged in to vote');
                                return;
                              }
                              try {
                                await CommunityService.voteOnPost(post.id!, currentUser.uid, 'down');
                                // Refresh posts after voting
                                const refreshedPosts = await CommunityService.getPosts(
                                  selectedCategory === 'all' ? undefined : selectedCategory
                                );
                                setPosts(refreshedPosts);
                              } catch (err) {
                                console.error('Error voting on post:', err);
                              }
                            }}
                          >
                            <ThumbsDown className="w-5 h-5" />
                            <span className="text-sm">
                              {post.downvotes || 0}
                            </span>
                          </button>
                          <div className="flex items-center space-x-2 text-white/60">
                            <Eye className="w-5 h-5" />
                            <span className="text-sm">
                              {post.viewCount || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
              </div>

              {/* Create Sample Data Button */}
              {posts.length === 0 && !loading && !error && (
                <div className="text-center py-4 space-y-4">
                  {!currentUser ? (
                    <div className="space-y-2">
                      <p className="text-gray-600">You need to be logged in to see or create posts</p>
                      <Button 
                        onClick={() => navigate('/login')}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        Login to Continue
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={async () => {
                        try {
                          // Import dynamically to avoid loading this in production
                          const { createSampleData } = await import('@/utils/createSampleData');
                          await createSampleData(currentUser, userProfile);
                          // Refresh posts
                          const refreshedPosts = await CommunityService.getPosts(selectedCategory === 'all' ? undefined : selectedCategory);
                          setPosts(refreshedPosts);
                          alert('Sample data created successfully!');
                        } catch (err) {
                          console.error('Error creating sample data:', err);
                          alert('Failed to create sample data. Please try again.');
                        }
                      }}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Create Sample Data
                    </Button>
                  )}
                </div>
              )}
              
              {/* Load More */}
              <div className="text-center">
                <Button 
                  variant="outline" 
                  className="w-full max-w-xs"
                  onClick={async () => {
                    try {
                      setLoading(true);
                      const morePosts = await CommunityService.getPosts(
                        selectedCategory === 'all' ? undefined : selectedCategory,
                        posts.length + 10
                      );
                      setPosts(morePosts);
                      setLoading(false);
                    } catch (err) {
                      console.error('Error loading more posts:', err);
                      setError('Failed to load more posts');
                      setLoading(false);
                    }
                  }}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Load More Posts'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
