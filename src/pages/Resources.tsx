
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Download, Eye, BookOpen, FileText, Video, Headphones } from 'lucide-react';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resources = [
    {
      id: 1,
      title: 'Fractions Made Easy - Interactive Guide',
      type: 'guide',
      category: 'Mathematics',
      grade: 'Grade 3-4',
      description: 'Step-by-step visual guide to teach fractions with everyday examples',
      downloads: 245,
      rating: 4.8,
      language: 'Hindi/English',
      icon: <BookOpen className="h-5 w-5" />,
      pdfUrl: 'https://www.africau.edu/images/default/sample.pdf'
    },
    {
      id: 2,
      title: 'Photosynthesis Story Collection',
      type: 'story',
      category: 'Science',
      grade: 'Grade 4-5',
      description: 'Culturally relevant stories explaining photosynthesis process',
      downloads: 180,
      rating: 4.9,
      language: 'Telugu/English',
      icon: <FileText className="h-5 w-5" />,
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 3,
      title: 'English Grammar Workbook',
      type: 'worksheet',
      category: 'English',
      grade: 'Grade 2-4',
      description: 'Comprehensive English grammar exercises and activities',
      downloads: 350,
      rating: 4.7,
      language: 'English',
      icon: <FileText className="h-5 w-5" />,
      pdfUrl: 'https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf'
    },
    {
      id: 4,
      title: 'Hindi Vowels Teaching Kit',
      type: 'worksheet',
      category: 'Hindi',
      grade: 'Grade 1-2',
      description: 'Comprehensive worksheets for Hindi vowel recognition and writing',
      downloads: 290,
      rating: 4.6,
      language: 'Hindi',
      icon: <FileText className="h-5 w-5" />,
      pdfUrl: 'https://www.africau.edu/images/default/sample.pdf'
    },
    {
      id: 5,
      title: 'Math Problem Solving Strategies',
      type: 'guide',
      category: 'Mathematics',
      grade: 'Grade 4-5',
      description: 'Different approaches to solve math word problems effectively',
      downloads: 375,
      rating: 4.8,
      language: 'Marathi/English',
      icon: <BookOpen className="h-5 w-5" />,
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    },
    {
      id: 6,
      title: 'Science Experiments Manual',
      type: 'guide',
      category: 'Science',
      grade: 'Grade 3-5',
      description: 'Safe and simple science experiments for primary school students',
      downloads: 420,
      rating: 4.9,
      language: 'English/Hindi',
      icon: <BookOpen className="h-5 w-5" />,
      pdfUrl: 'https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf'
    }
  ];

  const categories = ['all', 'Mathematics', 'Science', 'English', 'Hindi', 'Social Studies'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'guide': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'story': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'audio': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'video': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'worksheet': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleDownload = (resource: any) => {
    const link = document.createElement('a');
    link.href = resource.pdfUrl;
    link.download = `${resource.title}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Teaching Resources</h1>
            <p className="text-gray-600 dark:text-gray-300">Discover and download educational materials</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            📤 Upload Resource
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category === 'all' ? 'All Categories' : category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      {resource.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{resource.title}</CardTitle>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{resource.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getTypeColor(resource.type)}>
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                        </Badge>
                        <Badge variant="outline">{resource.category}</Badge>
                        <Badge variant="outline">{resource.grade}</Badge>
                        <Badge variant="outline">{resource.language}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-yellow-500 mb-1">
                      <span>⭐</span>
                      <span className="text-sm font-medium">{resource.rating}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{resource.downloads} downloads</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="flex items-center space-x-1"
                    onClick={() => handleDownload(resource)}
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center space-x-1"
                    onClick={() => handlePreview(resource.pdfUrl)}
                  >
                    <Eye className="h-4 w-4" />
                    <span>Preview</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No resources found</h3>
            <p className="text-gray-600 dark:text-gray-300">Try adjusting your search terms or category filter</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Resources;
