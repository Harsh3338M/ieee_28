"use client"
import React from 'react'
import { Button } from './ui/button'
// ❌ Change this: import { signOut } from '@/server/auth'
// ✅ To this:
import { signOut } from 'next-auth/react' 

const SignOutButton = () => {
  return (
    <Button 
      variant="outline" 
      className='' 
      onClick={() => void signOut()} // Added 'void' for TS safety
    >
      Logout
    </Button>
  )
}

export default SignOutButton