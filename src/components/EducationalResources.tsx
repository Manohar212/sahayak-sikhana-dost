
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Download, ExternalLink, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Resource {
  id: string;
  title: string;
  subject: string;
  grade: string;
  type: 'ncert' | 'diksha' | 'supplementary';
  description: string;
  downloadUrl?: string;
  viewUrl?: string;
  language: string;
}

const EducationalResources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const ncertResources: Resource[] = [
    {
      id: '1',
      title: 'Mathematics Textbook',
      subject: 'Mathematics',
      grade: 'Class 3',
      type: 'ncert',
      description: 'Complete NCERT Mathematics textbook for Class 3 with comprehensive exercises and examples.',
      downloadUrl: 'https://ncert.nic.in/textbook.php?gemh1=0-12',
      viewUrl: 'https://ncert.nic.in/textbook.php?gemh1=0-12',
      language: 'English & Hindi'
    },
    {
      id: '2',
      title: 'Hindi Rimjhim',
      subject: 'Hindi',
      grade: 'Class 4',
      type: 'ncert',
      description: 'NCERT Hindi Rimjhim textbook for Class 4 with stories, poems and language exercises.',
      downloadUrl: 'https://ncert.nic.in/textbook.php?dhhn1=0-15',
      viewUrl: 'https://ncert.nic.in/textbook.php?dhhn1=0-15',
      language: 'Hindi'
    },
    {
      id: '3',
      title: 'Environmental Studies - Looking Around',
      subject: 'Science',
      grade: 'Class 5',
      type: 'ncert',
      description: 'NCERT Environmental Studies textbook focusing on nature, science and social awareness.',
      downloadUrl: 'https://ncert.nic.in/textbook.php?eevs1=0-22',
      viewUrl: 'https://ncert.nic.in/textbook.php?eevs1=0-22',
      language: 'English & Hindi'
    },
    {
      id: '4',
      title: 'English Marigold',
      subject: 'English',
      grade: 'Class 3',
      type: 'ncert',
      description: 'NCERT English Marigold textbook with interesting stories and language activities.',
      downloadUrl: 'https://ncert.nic.in/textbook.php?ceen1=0-10',
      viewUrl: 'https://ncert.nic.in/textbook.php?ceen1=0-10',
      language: 'English'
    },
    {
      id: '5',
      title: 'Math-Magic',
      subject: 'Mathematics',
      grade: 'Class 4',
      type: 'ncert',
      description: 'Math-Magic NCERT textbook for Class 4 with practical mathematics concepts.',
      downloadUrl: 'https://ncert.nic.in/textbook.php?demh1=0-14',
      viewUrl: 'https://ncert.nic.in/textbook.php?demh1=0-14',
      language: 'English & Hindi'
    },
    {
      id: '6',
      title: 'Math-Magic',
      subject: 'Mathematics',
      grade: 'Class 5',
      type: 'ncert',
      description: 'Advanced Math-Magic NCERT textbook for Class 5 with complex problem solving.',
      downloadUrl: 'https://ncert.nic.in/textbook.php?eemh1=0-19',
      viewUrl: 'https://ncert.nic.in/textbook.php?eemh1=0-19',
      language: 'English & Hindi'
    }
  ];

  const dikshaResources: Resource[] = [
    {
      id: '7',
      title: 'Interactive Math Games',
      subject: 'Mathematics',
      grade: 'Class 3-5',
      type: 'diksha',
      description: 'Interactive digital games and activities for learning mathematics concepts.',
      viewUrl: 'https://diksha.gov.in/explore-course/course/do_31309842781716684811043',
      language: 'Multiple Languages'
    },
    {
      id: '8',
      title: 'Hindi Vyakaran Practice',
      subject: 'Hindi',
      grade: 'Class 4-5',
      type: 'diksha',
      description: 'Digital content for Hindi grammar practice with interactive exercises.',
      viewUrl: 'https://diksha.gov.in/explore-course/course/do_31309842781716684811044',
      language: 'Hindi'
    },
    {
      id: '9',
      title: 'Science Experiments',
      subject: 'Science',
      grade: 'Class 3-5',
      type: 'diksha',
      description: 'Virtual science experiments and demonstrations for primary classes.',
      viewUrl: 'https://diksha.gov.in/explore-course/course/do_31309842781716684811045',
      language: 'English & Hindi'
    },
    {
      id: '10',
      title: 'English Speaking Course',
      subject: 'English',
      grade: 'Class 3-5',
      type: 'diksha',
      description: 'Interactive English speaking and listening activities for primary students.',
      viewUrl: 'https://diksha.gov.in/explore-course/course/do_31309842781716684811046',
      language: 'English'
    }
  ];

  const supplementaryResources: Resource[] = [
    {
      id: '11',
      title: 'Worksheet Collections',
      subject: 'All Subjects',
      grade: 'Class 3-5',
      type: 'supplementary',
      description: 'Curated worksheet collections for practice across all subjects.',
      language: 'English & Hindi'
    },
    {
      id: '12',
      title: 'Activity Based Learning',
      subject: 'All Subjects',
      grade: 'Class 3-5',
      type: 'supplementary',
      description: 'Hands-on learning activities and project ideas for students.',
      language: 'Multiple Languages'
    }
  ];

  const allResources = [...ncertResources, ...dikshaResources, ...supplementaryResources];

  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || resource.grade.includes(selectedGrade);
    const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
    
    return matchesSearch && matchesGrade && matchesSubject;
  });

  const ResourceCard = ({ resource }: { resource: Resource }) => (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{resource.title}</CardTitle>
            <CardDescription className="mt-2">{resource.description}</CardDescription>
          </div>
          <Badge variant={resource.type === 'ncert' ? 'default' : resource.type === 'diksha' ? 'secondary' : 'outline'}>
            {resource.type.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{resource.subject}</Badge>
            <Badge variant="outline">{resource.grade}</Badge>
            <Badge variant="outline">{resource.language}</Badge>
          </div>
          <div className="flex gap-2">
            {resource.downloadUrl && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => window.open(resource.downloadUrl, '_blank')}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            )}
            {resource.viewUrl && (
              <Button 
                size="sm"
                onClick={() => window.open(resource.viewUrl, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Online
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Educational Resources
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Access NCERT textbooks, Diksha digital content, and supplementary materials
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Grades</option>
          <option value="Class 3">Class 3</option>
          <option value="Class 4">Class 4</option>
          <option value="Class 5">Class 5</option>
        </select>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Subjects</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Hindi">Hindi</option>
          <option value="English">English</option>
          <option value="Science">Science</option>
        </select>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="ncert">NCERT Books</TabsTrigger>
          <TabsTrigger value="diksha">Diksha Content</TabsTrigger>
          <TabsTrigger value="supplementary">Supplementary</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ncert" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ncertResources.filter(resource => 
              resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              resource.subject.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="diksha" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dikshaResources.filter(resource => 
              resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              resource.subject.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="supplementary" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supplementaryResources.filter(resource => 
              resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              resource.subject.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No resources found
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Try adjusting your search terms or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default EducationalResources;
