
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Layout from '@/components/Layout';
import { generateDashboardData } from '@/utils/geminiAI';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [aiInsights, setAiInsights] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const studentData = [
    { grade: 'Grade 1', students: 25, avgScore: 78 },
    { grade: 'Grade 2', students: 30, avgScore: 82 },
    { grade: 'Grade 3', students: 28, avgScore: 76 },
    { grade: 'Grade 4', students: 32, avgScore: 85 },
    { grade: 'Grade 5', students: 22, avgScore: 79 },
  ];

  const subjectData = [
    { name: 'Mathematics', value: 85, color: '#8884d8' },
    { name: 'Science', value: 78, color: '#82ca9d' },
    { name: 'English', value: 92, color: '#ffc658' },
    { name: 'Hindi', value: 88, color: '#ff7300' },
  ];

  const recentActivities = [
    { id: 1, activity: 'Generated story for Grade 3 Mathematics', time: '2 hours ago', type: 'story' },
    { id: 2, activity: 'Created worksheet for Photosynthesis topic', time: '4 hours ago', type: 'worksheet' },
    { id: 3, activity: 'Answered student question about Solar System', time: '6 hours ago', type: 'qa' },
    { id: 4, activity: 'Generated visual aid for Fractions', time: '1 day ago', type: 'visual' },
  ];

  const generateInsights = async () => {
    setIsLoading(true);
    try {
      const insights = await generateDashboardData();
      setAiInsights(insights);
      toast({
        title: "AI Insights Generated! 🤖",
        description: "Fresh insights about your teaching data",
      });
    } catch (error) {
      console.error('Error generating insights:', error);
      toast({
        title: "Error",
        description: "Failed to generate insights. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
            <p className="text-gray-600 dark:text-gray-300">Track your teaching progress and student performance</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              onClick={generateInsights}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {isLoading ? '🤖 Generating...' : '🤖 AI Insights'}
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              📊 Generate Report
            </Button>
          </div>
        </div>

        {aiInsights && (
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
            <CardHeader>
              <CardTitle className="text-blue-800 dark:text-blue-200 flex items-center space-x-2">
                <span>🤖</span>
                <span>AI-Generated Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                {aiInsights}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-800 dark:text-blue-200">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">137</div>
              <p className="text-sm text-blue-600 dark:text-blue-300">Across 5 grades</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-800 dark:text-green-200">AI Tools Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900 dark:text-green-100">45</div>
              <p className="text-sm text-green-600 dark:text-green-300">This week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-800 dark:text-purple-200">Avg Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">82%</div>
              <p className="text-sm text-purple-600 dark:text-purple-300">+5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 border-orange-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-orange-800 dark:text-orange-200">Content Created</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-900 dark:text-orange-100">23</div>
              <p className="text-sm text-orange-600 dark:text-orange-300">Stories & worksheets</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Performance by Grade</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={studentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="grade" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgScore" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subject Performance Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent AI Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl">
                    {activity.type === 'story' && '📖'}
                    {activity.type === 'worksheet' && '📝'}
                    {activity.type === 'qa' && '🧠'}
                    {activity.type === 'visual' && '🎨'}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white">{activity.activity}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
