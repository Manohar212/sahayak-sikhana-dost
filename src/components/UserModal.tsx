
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserModal = ({ isOpen, onClose }: UserModalProps) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login:', loginData);
    onClose();
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup:', signupData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">Welcome to Sahayak AI</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Sign In</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email" className="text-gray-700 dark:text-gray-300">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      placeholder="teacher@school.com"
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="login-password" className="text-gray-700 dark:text-gray-300">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      placeholder="Enter your password"
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Sign In
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Create Account</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Join Sahayak AI to enhance your teaching experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-name" className="text-gray-700 dark:text-gray-300">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      value={signupData.name}
                      onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                      placeholder="Ms. Priya Sharma"
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-email" className="text-gray-700 dark:text-gray-300">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      placeholder="teacher@school.com"
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password" className="text-gray-700 dark:text-gray-300">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      placeholder="Create a strong password"
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-confirm" className="text-gray-700 dark:text-gray-300">Confirm Password</Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                      placeholder="Confirm your password"
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Create Account
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
