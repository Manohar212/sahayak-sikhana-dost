import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/Layout';

const Assignments = () => {
  const [filter, setFilter] = useState('all');

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
      type: 'worksheet'
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
      type: 'story'
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
      type: 'worksheet'
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
      type: 'activity'
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
      default: return '📋';
    }
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
                      <div className="flex items-center space-x-2 mt-1">
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
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Assignments;
