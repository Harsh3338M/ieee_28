'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    // In a real app, you'd redirect to dashboard
    alert('Login Successful!');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black -z-10" />
      
      {/* Left Panel - Visual */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 border-r border-white/10 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        
        <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors z-10 w-fit">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <div className="z-10 max-w-lg">
          <h2 className="text-4xl font-bold mb-6">Welcome Back</h2>
          <p className="text-gray-300">
            &quot;The only way to do great work is to love what you do.&quot; - Steve Jobs
          </p>
        </div>
        
        <div className="z-10 text-sm text-gray-500">
          Secure Login via HackPortal
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight">Log in to your account</h1>
            <p className="text-gray-400 mt-2">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 focus:border-green-500 text-white placeholder:text-gray-600"
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Password
                  </label>
                  <a href="#" className="text-sm text-green-500 hover:underline">Forgot password?</a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 focus:border-green-500 text-white placeholder:text-gray-600"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-green-500 hover:bg-green-400 text-black font-bold h-11"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  Logging in...
                </span>
              ) : (
                "Log in"
              )}
            </Button>
            
            <p className="text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-green-500 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
