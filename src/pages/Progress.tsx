import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Progress = () => {
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const progressData = [
    { month: 'Aug', grade1: 65, grade2: 70, grade3: 68, grade4: 75, grade5: 72 },
    { month: 'Sep', grade1: 68, grade2: 73, grade3: 71, grade4: 78, grade5: 75 },
    { month: 'Oct', grade1: 72, grade2: 76, grade3: 74, grade4: 81, grade5: 78 },
    { month: 'Nov', grade1: 75, grade2: 79, grade3: 77, grade4: 84, grade5: 81 },
    { month: 'Dec', grade1: 78, grade2: 82, grade3: 80, grade4: 87, grade5: 84 },
    { month: 'Jan', grade1: 81, grade2: 85, grade3: 83, grade4: 90, grade5: 87 },
  ];

  const subjectProgress = [
    { subject: 'Mathematics', current: 82, previous: 78, improvement: 4 },
    { subject: 'Science', current: 79, previous: 75, improvement: 4 },
    { subject: 'English', current: 88, previous: 85, improvement: 3 },
    { subject: 'Hindi', current: 85, previous: 82, improvement: 3 },
    { subject: 'Social Studies', current: 76, previous: 73, improvement: 3 },
  ];

  const topPerformers = [
    { name: 'Ravi Kumar', grade: 'Grade 4', score: 94, subject: 'Mathematics' },
    { name: 'Priya Sharma', grade: 'Grade 3', score: 92, subject: 'English' },
    { name: 'Arjun Patel', grade: 'Grade 5', score: 90, subject: 'Science' },
    { name: 'Sneha Reddy', grade: 'Grade 2', score: 89, subject: 'Hindi' },
    { name: 'Karan Singh', grade: 'Grade 4', score: 88, subject: 'Mathematics' },
  ];

  const strugglingStudents = [
    { name: 'Mohan Das', grade: 'Grade 3', score: 45, subject: 'Mathematics', needsHelp: 'Basic operations' },
    { name: 'Sunita Kumari', grade: 'Grade 2', score: 48, subject: 'English', needsHelp: 'Reading comprehension' },
    { name: 'Vikram Yadav', grade: 'Grade 5', score: 52, subject: 'Science', needsHelp: 'Concepts understanding' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Progress</h1>
            <p className="text-gray-600 dark:text-gray-300">Track academic performance and identify improvement opportunities</p>
          </div>
        </div>

        <div className="flex space-x-4">
          <Select value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              <SelectItem value="grade1">Grade 1</SelectItem>
              <SelectItem value="grade2">Grade 2</SelectItem>
              <SelectItem value="grade3">Grade 3</SelectItem>
              <SelectItem value="grade4">Grade 4</SelectItem>
              <SelectItem value="grade5">Grade 5</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="mathematics">Mathematics</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">Hindi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Progress Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="grade1" stroke="#8884d8" name="Grade 1" />
                <Line type="monotone" dataKey="grade2" stroke="#82ca9d" name="Grade 2" />
                <Line type="monotone" dataKey="grade3" stroke="#ffc658" name="Grade 3" />
                <Line type="monotone" dataKey="grade4" stroke="#ff7300" name="Grade 4" />
                <Line type="monotone" dataKey="grade5" stroke="#8dd1e1" name="Grade 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subject-wise Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="current" fill="#8884d8" name="Current Score" />
                <Bar dataKey="previous" fill="#82ca9d" name="Previous Score" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800 dark:text-green-200">
                <span>🏆</span>
                <span>Top Performers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPerformers.map((student, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white dark:bg-green-800 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{student.grade} • {student.subject}</p>
                    </div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{student.score}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-orange-800 dark:text-orange-200">
                <span>🎯</span>
                <span>Need Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {strugglingStudents.map((student, index) => (
                  <div key={index} className="p-3 bg-white dark:bg-orange-800 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{student.grade} • {student.subject}</p>
                        <p className="text-xs text-orange-600 dark:text-orange-300 mt-1">Focus: {student.needsHelp}</p>
                      </div>
                      <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{student.score}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Progress;
