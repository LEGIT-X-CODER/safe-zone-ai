import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Edit3, 
  Save, 
  X, 
  Shield, 
  LogOut, 
  Camera,
  Phone,
  ArrowLeft,
  CheckCircle,
  Clock
} from 'lucide-react';

const Profile = () => {
  const { currentUser, userProfile, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [editData, setEditData] = useState({
    displayName: userProfile?.displayName || '',
    bio: userProfile?.bio || '',
    location: userProfile?.location || '',
    phoneNumber: userProfile?.phoneNumber || ''
  });

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      displayName: userProfile?.displayName || '',
      bio: userProfile?.bio || '',
      location: userProfile?.location || '',
      phoneNumber: userProfile?.phoneNumber || ''
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setMessage('');
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage('');
      await updateUserProfile(editData);
      setIsEditing(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setMessage(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  if (!currentUser || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
          <p className="text-muted-foreground mb-6">Please log in to view your profile</p>
          <Link to="/login">
            <Button className="bg-gradient-teal-blue">Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 backdrop-blur-sm bg-white/80">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-teal-blue rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SafeZone AI
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Success Message */}
        {message && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-700">{message}</AlertDescription>
          </Alert>
        )}

        {/* Profile Header Card */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src={currentUser.photoURL || ''} />
                  <AvatarFallback className="bg-gradient-teal-blue text-white text-xl font-semibold">
                    {getInitials(userProfile.displayName)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-white border-2 border-white shadow-md"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {userProfile.displayName}
                  </h1>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
                
                <div className="flex items-center text-muted-foreground space-x-4">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{userProfile.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Joined {formatDate(userProfile.joinedAt)}</span>
                  </div>
                </div>

                {userProfile.bio && (
                  <p className="text-gray-600 max-w-md">{userProfile.bio}</p>
                )}
                
                {userProfile.location && (
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{userProfile.location}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                {!isEditing ? (
                  <Button
                    onClick={handleEdit}
                    variant="outline"
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleSave}
                      disabled={loading}
                      className="bg-gradient-teal-blue"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {loading ? 'Saving...' : 'Save'}
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription>
                  Manage your personal information and preferences
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Full Name</Label>
                      <Input
                        id="displayName"
                        name="displayName"
                        value={editData.displayName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={editData.bio}
                        onChange={handleChange}
                        placeholder="Tell us about yourself..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={editData.location}
                        onChange={handleChange}
                        placeholder="Enter your location"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        value={editData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">Full Name</Label>
                        <p className="font-medium">{userProfile.displayName}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Email</Label>
                        <p className="font-medium">{userProfile.email}</p>
                      </div>
                    </div>

                    {userProfile.phoneNumber && (
                      <div>
                        <Label className="text-sm text-muted-foreground">Phone Number</Label>
                        <p className="font-medium">{userProfile.phoneNumber}</p>
                      </div>
                    )}

                    {userProfile.bio && (
                      <div>
                        <Label className="text-sm text-muted-foreground">Bio</Label>
                        <p className="font-medium">{userProfile.bio}</p>
                      </div>
                    )}

                    {userProfile.location && (
                      <div>
                        <Label className="text-sm text-muted-foreground">Location</Label>
                        <p className="font-medium">{userProfile.location}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Stats */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Account Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Account Type</span>
                  <Badge className="bg-gradient-teal-blue">Premium</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Member Since</span>
                  <span className="text-sm font-medium">
                    {formatDate(userProfile.joinedAt)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Login</span>
                  <span className="text-sm font-medium">
                    {formatDate(userProfile.lastLoginAt)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  Activity History
                </Button>
                <Separator />
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full justify-start"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;