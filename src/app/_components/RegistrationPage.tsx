'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

export default function RegistrationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    college: '',
    role: 'student',
    city: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    // In a real app, you'd redirect to dashboard
    alert('Registration Successful! Welcome to the portal.');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black -z-10" />
      
      {/* Left Panel - Visual */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 border-r border-white/10 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        
        <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors z-10 w-fit">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <div className="z-10 max-w-lg">
          <h2 className="text-4xl font-bold mb-6">Join the Community</h2>
          <ul className="space-y-4">
            {[
              "Access to exclusive hackathons",
              "Connect with mentors and industry leaders",
              "Build your portfolio with real projects",
              "Win prizes and recognition"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="z-10 text-sm text-gray-500">
          Join 50,000+ developers worldwide.
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight">Create an account</h1>
            <p className="text-gray-400 mt-2">Enter your details to get started.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <label htmlFor="username" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Username
                </label>
                <Input
                  id="username"
                  name="username"
                  placeholder="johndoe"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 focus:border-green-500 text-white placeholder:text-gray-600"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email ID
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
                <label htmlFor="college" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  College / University
                </label>
                <Input
                  id="college"
                  name="college"
                  placeholder="Stanford University"
                  required
                  value={formData.college}
                  onChange={handleChange}
                  className="bg-white/5 border-white/10 focus:border-green-500 text-white placeholder:text-gray-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="city" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    City
                  </label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="San Francisco"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 focus:border-green-500 text-white placeholder:text-gray-600"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="role" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Role
                  </label>
                  <Select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 focus:border-green-500 text-white"
                    options={[
                      { value: 'student', label: 'Student' },
                      { value: 'teacher', label: 'Teacher' },
                      { value: 'organization', label: 'Organization' }
                    ]}
                  />
                </div>
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
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>
            
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-green-500 hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
