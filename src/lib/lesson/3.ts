export const Lesson3: Step[] = [
    {
      id: 1,
      type: 'intro',
      title: "Don't Take the Bait",
      description: "Phishing is when a hacker creates a fake website that looks exactly like a real one (like Google or Facebook) to trick you into typing your password.",
    },
    {
      id: 2,
      type: 'comparison',
      title: "Look at the Domain",
      description: "Hackers use 'Look-alike' URLs. They might use 'facebo0k.com' (with a zero) instead of 'facebook.com'. Always double-check the address bar!",
    },
    {
      id: 3,
      type: 'quiz',
      title: "Identify the Imposter",
      description: "You get an urgent email from Netflix saying your billing failed. Which URL is safe to click?",
      options: ["https://netflix-support.security-update.com", "https://www.netflix.com/billing"],
      correctAnswer: "https://www.netflix.com/billing",
    }
  ];