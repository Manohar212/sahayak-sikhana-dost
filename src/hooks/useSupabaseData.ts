
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useAssignments = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['assignments', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useStudents = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['students', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('teacher_id', user.id)
        .order('name', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useCreateAssignment = () => {
  const { user } = useAuth();
  
  const createAssignment = async (assignment: {
    title: string;
    subject: string;
    grade: string;
    description?: string;
    due_date?: string;
  }) => {
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('assignments')
      .insert([
        {
          ...assignment,
          created_by: user.id,
        }
      ])
      .select();
    
    if (error) throw error;
    return data;
  };
  
  return { createAssignment };
};

export const useCreateStudent = () => {
  const { user } = useAuth();
  
  const createStudent = async (student: {
    name: string;
    grade: string;
    subject?: string;
    performance_score?: number;
  }) => {
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('students')
      .insert([
        {
          ...student,
          teacher_id: user.id,
        }
      ])
      .select();
    
    if (error) throw error;
    return data;
  };
  
  return { createStudent };
};
