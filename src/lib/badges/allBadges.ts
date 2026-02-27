import { Trophy, type LucideIcon } from "lucide-react";

interface Badge {
  id: string;
  name: string;
  description: string;
  // Use LucideIcon if you want to pass the component: <icon size={20} />
  // Use React.ReactNode if you want to pass the rendered tag: {icon}
  icon: LucideIcon; 
  color?: string;
  bgColor?: string;
}

export const allBadges: Badge[] = [
  {
    id: "first-quest",
    name: "First Quest",
    description: "Completed your first quest",
    icon: Trophy, // Pass the component reference, not <Trophy />
    color: "text-yellow-400",
    bgColor: "bg-yellow-100",
  }
];