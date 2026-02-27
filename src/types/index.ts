export type Hackathon = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    startDate: string;
    endDate: string;
    location: string;
    type: 'Online' | 'In-Person' | 'Hybrid';
    prizePool?: string;
    tags: string[];
  };
  
  export const MOCK_HACKATHONS: Hackathon[] = [
    {
      id: '1',
      title: 'ETHGlobal Hackathon',
      description: 'Build the future of decentralized applications with Ethereum',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
      startDate: '2026-03-15',
      endDate: '2026-03-17',
      location: 'San Francisco, CA',
      type: 'In-Person',
      prizePool: '$100,000',
      tags: ['Web3', 'Blockchain', 'Ethereum']
    },
    {
      id: '2',
      title: 'AI Innovation Challenge',
      description: 'Create next-generation AI solutions for real-world problems',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
      startDate: '2026-04-01',
      endDate: '2026-04-03',
      location: 'Virtual',
      type: 'Online',
      prizePool: '$50,000',
      tags: ['AI', 'ML', 'Innovation']
    },
    {
      id: '3',
      title: 'HealthTech Summit',
      description: 'Transform healthcare through technology and innovation',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=400&fit=crop',
      startDate: '2026-03-20',
      endDate: '2026-03-22',
      location: 'Boston, MA',
      type: 'Hybrid',
      prizePool: '$75,000',
      tags: ['Health', 'IoT', 'Data']
    }
  ];
  