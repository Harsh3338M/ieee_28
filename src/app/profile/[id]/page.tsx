import ProfileDashboard from '@/components/ProfileDashboard'
import { api } from '@/trpc/server'
import React from 'react'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // 1. Direct async call (No hooks like useQuery)
  // 2. If it fails, it will throw an error you can catch with a Next.js error.tsx file
  const profileData = await api.profile.getById({ id });

  return (
    <div>
      {/* Pass the server-fetched data down to your dashboard */}
      <ProfileDashboard initialData={profileData} />
    </div>
  )
}

export default Page