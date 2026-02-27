
type Step = {
    id: number;
    type: 'intro' | 'comparison' | 'quiz';
    title: string;
    description: string;
    illustration?: string;
    options?: string[];
    correctAnswer?: string;
  };

  interface LevelData {
    lesson: number;
    steps: Step[];
    xp: number;
    title: string;
    badges: string[];
    points: number;
  }