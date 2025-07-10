
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { User, LogOut, Settings } from 'lucide-react';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserModal = ({ isOpen, onClose }: UserModalProps) => {
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!user || !profile) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white flex items-center gap-2">
            <User className="h-5 w-5" />
            Account Settings
          </DialogTitle>
        </DialogHeader>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Profile Information</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Your account details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="profile-name" className="text-gray-700 dark:text-gray-300">Full Name</Label>
              <Input
                id="profile-name"
                type="text"
                value={profile.full_name}
                className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                readOnly
              />
            </div>
            <div>
              <Label htmlFor="profile-email" className="text-gray-700 dark:text-gray-300">Email</Label>
              <Input
                id="profile-email"
                type="email"
                value={profile.email}
                className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                readOnly
              />
            </div>
            <div>
              <Label className="text-gray-700 dark:text-gray-300">Member Since</Label>
              <Input
                type="text"
                value={new Date(profile.created_at).toLocaleDateString()}
                className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                readOnly
              />
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSignOut} variant="destructive" className="flex-1">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
              <Button onClick={onClose} variant="outline" className="flex-1">
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
