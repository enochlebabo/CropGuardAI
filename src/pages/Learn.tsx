
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Play, Clock, Star, ChevronRight } from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';
import { Footer } from '@/components/Footer';

const Learn = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Courses', count: 45 },
    { id: 'basics', name: 'Farming Basics', count: 12 },
    { id: 'diseases', name: 'Disease Management', count: 15 },
    { id: 'organic', name: 'Organic Farming', count: 8 },
    { id: 'technology', name: 'AgTech', count: 10 }
  ];

  const courses = [
    {
      id: 1,
      title: 'Introduction to Plant Disease Identification',
      description: 'Learn the fundamentals of identifying common plant diseases through visual inspection.',
      duration: '2 hours',
      lessons: 8,
      rating: 4.9,
      level: 'Beginner',
      category: 'diseases',
      image: '🔬'
    },
    {
      id: 2,
      title: 'Sustainable Farming Practices',
      description: 'Discover eco-friendly farming methods that protect the environment and boost yields.',
      duration: '3 hours',
      lessons: 12,
      rating: 4.8,
      level: 'Intermediate',
      category: 'organic',
      image: '🌱'
    },
    {
      id: 3,
      title: 'AI in Agriculture: The Future of Farming',
      description: 'Explore how artificial intelligence is revolutionizing modern agriculture.',
      duration: '1.5 hours',
      lessons: 6,
      rating: 4.7,
      level: 'Advanced',
      category: 'technology',
      image: '🤖'
    },
    {
      id: 4,
      title: 'Soil Health Management',
      description: 'Master the art of maintaining healthy soil for optimal crop growth.',
      duration: '2.5 hours',
      lessons: 10,
      rating: 4.9,
      level: 'Beginner',
      category: 'basics',
      image: '🌍'
    },
    {
      id: 5,
      title: 'Integrated Pest Management',
      description: 'Learn comprehensive strategies to control pests while minimizing environmental impact.',
      duration: '3 hours',
      lessons: 14,
      rating: 4.8,
      level: 'Intermediate',
      category: 'diseases',
      image: '🐛'
    },
    {
      id: 6,
      title: 'Water Conservation Techniques',
      description: 'Discover efficient irrigation methods and water-saving strategies.',
      duration: '2 hours',
      lessons: 9,
      rating: 4.6,
      level: 'Beginner',
      category: 'basics',
      image: '💧'
    }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            🎓 Learning Center
          </h1>
          <p className="text-xl text-green-700 mb-8 max-w-2xl mx-auto">
            Expand your agricultural knowledge with our comprehensive courses designed by farming experts.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">{course.image}</div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </span>
                    <span className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {course.lessons} lessons
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Play className="h-4 w-4 mr-2" />
                    Start Course
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-white/80 backdrop-blur-sm p-8 rounded-lg border-2 border-green-200">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">Why Learn with CropGuard AI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-600 text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Expert Content</h3>
              <p className="text-gray-600">Courses created by agricultural experts and researchers</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Play className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Interactive Learning</h3>
              <p className="text-gray-600">Hands-on exercises and real-world case studies</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Certification</h3>
              <p className="text-gray-600">Earn certificates to validate your agricultural knowledge</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Learn;
