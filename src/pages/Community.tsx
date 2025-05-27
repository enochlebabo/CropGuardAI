
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Users, MessageSquare, Heart, Share2, Search, Plus } from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';
import { Footer } from '@/components/Footer';

const Community = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'questions', 'tips', 'success-stories', 'events'];

  const posts = [
    {
      id: 1,
      author: 'Sarah Johnson',
      avatar: '👩‍🌾',
      title: 'How to deal with aphids on tomato plants?',
      content: 'I noticed small green insects on my tomato plants. They seem to be clustering on the undersides of leaves. What\'s the best organic treatment?',
      category: 'questions',
      likes: 15,
      comments: 8,
      timeAgo: '2 hours ago',
      tags: ['tomatoes', 'pests', 'organic']
    },
    {
      id: 2,
      author: 'Mike Rodriguez',
      avatar: '👨‍🌾',
      title: 'Successful corn harvest using CropGuard AI!',
      content: 'Just wanted to share that I increased my corn yield by 30% this season using the disease detection recommendations from CropGuard AI. Early detection saved my crops!',
      category: 'success-stories',
      likes: 42,
      comments: 12,
      timeAgo: '4 hours ago',
      tags: ['corn', 'success', 'yield', 'ai']
    },
    {
      id: 3,
      author: 'Emma Chen',
      avatar: '👩‍🌾',
      title: 'Natural fertilizer recipe that works wonders',
      content: 'Mix banana peels, coffee grounds, and eggshells. Compost for 2 weeks. This organic fertilizer has improved my soil quality dramatically!',
      category: 'tips',
      likes: 28,
      comments: 15,
      timeAgo: '6 hours ago',
      tags: ['fertilizer', 'organic', 'composting']
    },
    {
      id: 4,
      author: 'James Wilson',
      avatar: '👨‍🌾',
      title: 'Virtual Farming Workshop - June 15th',
      content: 'Join us for a free virtual workshop on "Sustainable Farming in the Digital Age". Learn about precision agriculture and AI tools. Register now!',
      category: 'events',
      likes: 22,
      comments: 6,
      timeAgo: '1 day ago',
      tags: ['workshop', 'education', 'digital-farming']
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            🤝 Farmer Community
          </h1>
          <p className="text-xl text-green-700 mb-8 max-w-2xl mx-auto">
            Connect with fellow farmers, share experiences, ask questions, and learn from each other.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">12,547</div>
                  <div className="text-sm text-gray-600">Active Farmers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">8,392</div>
                  <div className="text-sm text-gray-600">Questions Answered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">156</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['🏆 Dr. Priya Sharma', '🥈 Mark Thompson', '🥉 Lisa Garcia'].map((contributor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{contributor}</span>
                      <Badge variant="secondary">{150 - index * 20} pts</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search posts, tags, or users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="mr-2 h-4 w-4" />
                  New Post
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{post.avatar}</div>
                        <div>
                          <h3 className="font-semibold">{post.author}</h3>
                          <p className="text-sm text-gray-600">{post.timeAgo}</p>
                        </div>
                      </div>
                      <Badge variant={
                        post.category === 'questions' ? 'secondary' :
                        post.category === 'tips' ? 'default' :
                        post.category === 'success-stories' ? 'default' :
                        'outline'
                      }>
                        {post.category.replace('-', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-green-600">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-green-600">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-600 hover:text-green-600">
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </button>
                      </div>
                      <Button variant="outline" size="sm">
                        Reply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
