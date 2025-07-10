
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Assignment {
  id: number;
  title: string;
  grade: string;
  subject: string;
  dueDate: string;
  status: string;
  studentsCompleted: number;
  totalStudents: number;
  type: string;
  description?: string;
  instructions?: string;
  students?: Array<{
    id: number;
    name: string;
    status: 'completed' | 'in-progress' | 'not-started';
    score?: number;
    submittedAt?: string;
  }>;
}

interface AssignmentDetailsProps {
  assignment: Assignment | null;
  isOpen: boolean;
  onClose: () => void;
}

const AssignmentDetails = ({ assignment, isOpen, onClose }: AssignmentDetailsProps) => {
  if (!assignment) return null;

  const sampleStudents = [
    { id: 1, name: 'Arjun Sharma', status: 'completed' as const, score: 85, submittedAt: '2024-01-14 10:30 AM' },
    { id: 2, name: 'Priya Patel', status: 'completed' as const, score: 92, submittedAt: '2024-01-14 02:15 PM' },
    { id: 3, name: 'Rahul Kumar', status: 'in-progress' as const, score: undefined, submittedAt: undefined },
    { id: 4, name: 'Sneha Reddy', status: 'completed' as const, score: 78, submittedAt: '2024-01-13 04:45 PM' },
    { id: 5, name: 'Vikram Singh', status: 'not-started' as const, score: undefined, submittedAt: undefined },
    { id: 6, name: 'Anita Desai', status: 'completed' as const, score: 88, submittedAt: '2024-01-14 11:20 AM' },
    { id: 7, name: 'Karan Mehta', status: 'in-progress' as const, score: undefined, submittedAt: undefined },
    { id: 8, name: 'Deepika Iyer', status: 'completed' as const, score: 95, submittedAt: '2024-01-14 09:15 AM' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'not-started': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const completionPercentage = (assignment.studentsCompleted / assignment.totalStudents) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{assignment.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Assignment Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Assignment Details</h3>
              <div className="space-y-1">
                <p><span className="font-medium">Subject:</span> {assignment.subject}</p>
                <p><span className="font-medium">Grade:</span> {assignment.grade}</p>
                <p><span className="font-medium">Type:</span> {assignment.type}</p>
                <p><span className="font-medium">Due Date:</span> {assignment.dueDate}</p>
                <p><span className="font-medium">Status:</span> 
                  <Badge className={`ml-2 ${getStatusColor(assignment.status)}`}>
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </Badge>
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Progress Overview</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Completion Rate</span>
                    <span>{Math.round(completionPercentage)}%</span>
                  </div>
                  <Progress value={completionPercentage} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <div className="font-bold text-green-600 dark:text-green-400">{assignment.studentsCompleted}</div>
                    <div className="text-green-600 dark:text-green-400">Completed</div>
                  </div>
                  <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <div className="font-bold text-blue-600 dark:text-blue-400">{assignment.totalStudents}</div>
                    <div className="text-blue-600 dark:text-blue-400">Total Students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {assignment.description || `This ${assignment.type} focuses on ${assignment.subject.toLowerCase()} concepts for ${assignment.grade} students. Students will complete various exercises and activities to demonstrate their understanding of the material.`}
            </p>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Instructions</h3>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Complete all sections of the assignment</li>
                <li>Show your work for all mathematical problems</li>
                <li>Use proper grammar and spelling in written responses</li>
                <li>Submit your work before the due date</li>
                <li>Ask questions if you need clarification</li>
              </ul>
            </div>
          </div>

          {/* Student Progress Table */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Student Progress</h3>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Submitted At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.status)}>
                          {student.status.replace('-', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {student.score ? `${student.score}%` : '-'}
                      </TableCell>
                      <TableCell>
                        {student.submittedAt || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>
              Send Reminder
            </Button>
            <Button variant="outline">
              Export Data
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentDetails;
