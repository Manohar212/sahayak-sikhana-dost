
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/Layout';
import AssignmentDetails from '@/components/AssignmentDetails';

const Assignments = () => {
  const [filter, setFilter] = useState('all');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const assignments = [
    {
      id: 1,
      title: 'Mathematics - Fractions Worksheet',
      grade: 'Grade 3',
      subject: 'Mathematics',
      dueDate: '2024-01-15',
      status: 'active',
      studentsCompleted: 18,
      totalStudents: 25,
      type: 'worksheet',
      description: 'Students will practice adding, subtracting, and comparing fractions using visual aids and real-world examples.',
      instructions: 'Complete all 15 problems showing your work. Use fraction bars or circles to visualize your answers.'
    },
    {
      id: 2,
      title: 'Science - Photosynthesis Story',
      grade: 'Grade 4',
      subject: 'Science',
      dueDate: '2024-01-20',
      status: 'draft',
      studentsCompleted: 0,
      totalStudents: 30,
      type: 'story',
      description: 'Create a story explaining the process of photosynthesis from the perspective of a leaf.',
      instructions: 'Write a 200-word story that includes the key terms: sunlight, carbon dioxide, water, glucose, and oxygen.'
    },
    {
      id: 3,
      title: 'English - Reading Comprehension',
      grade: 'Grade 2',
      subject: 'English',
      dueDate: '2024-01-12',
      status: 'completed',
      studentsCompleted: 22,
      totalStudents: 22,
      type: 'worksheet',
      description: 'Students will read a short passage and answer comprehension questions to test their understanding.',
      instructions: 'Read the passage carefully twice, then answer all questions in complete sentences.'
    },
    {
      id: 4,
      title: 'Hindi - Vocabulary Building',
      grade: 'Grade 5',
      subject: 'Hindi',
      dueDate: '2024-01-18',
      status: 'active',
      studentsCompleted: 12,
      totalStudents: 28,
      type: 'activity',
      description: 'Interactive vocabulary exercise focusing on common Hindi words used in daily conversation.',
      instructions: 'Learn 20 new Hindi words, write their meanings, and use each word in a sentence.'
    },
    {
      id: 5,
      title: 'Social Studies - Community Helpers',
      grade: 'Grade 1',
      subject: 'Social Studies',
      dueDate: '2024-01-22',
      status: 'active',
      studentsCompleted: 5,
      totalStudents: 20,
      type: 'project',
      description: 'Students will create a poster about different community helpers and their roles.',
      instructions: 'Choose 5 community helpers, draw or paste pictures, and write 2 sentences about each helper.'
    },
    {
      id: 6,
      title: 'Mathematics - Multiplication Tables',
      grade: 'Grade 4',
      subject: 'Mathematics',
      dueDate: '2024-01-25',
      status: 'draft',
      studentsCompleted: 0,
      totalStudents: 26,
      type: 'worksheet',
      description: 'Practice multiplication tables from 2 to 10 with various problem types.',
      instructions: 'Complete the multiplication chart and solve 50 multiplication problems.'
    }
  ];

  const filteredAssignments = assignments.filter(assignment => 
    filter === 'all' || assignment.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'worksheet': return '📝';
      case 'story': return '📖';
      case 'activity': return '🎯';
      case 'project': return '🎨';
      default: return '📋';
    }
  };

  const handleViewDetails = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowDetails(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Assignments</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage and track student assignments</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            ➕ Create New Assignment
          </Button>
        </div>

        <div className="flex space-x-4 items-center">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assignments</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6">
          {filteredAssignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getTypeIcon(assignment.type)}</span>
                    <div>
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-2xl">
                        {assignment.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="outline">{assignment.grade}</Badge>
                        <Badge variant="outline">{assignment.subject}</Badge>
                        <Badge className={getStatusColor(assignment.status)}>
                          {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Due: {assignment.dueDate}</p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {assignment.studentsCompleted}/{assignment.totalStudents} completed
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-4">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(assignment.studentsCompleted / assignment.totalStudents) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(assignment)}
                    >
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <AssignmentDetails
          assignment={selectedAssignment}
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
        />
      </div>
    </Layout>
  );
};

export default Assignments;
