
export const Lesson1: Step[] = [
    {
      id: 1,
      type: 'intro',
      title: "The Web's Secret Language",
      description: "When your browser talks to a website, it uses HTTP. But there's a problem: standard HTTP is like sending a postcard—anyone can read it!",
    },
    {
      id: 2,
      type: 'comparison',
      title: "HTTP vs. HTTPS",
      description: "The 'S' stands for **Secure**. HTTPS wraps your data in an encrypted 'envelope' so hackers can't peek inside.",
    },
    {
      id: 3,
      type: 'quiz',
      title: "Spot the Difference",
      description: "Which one should you use when entering your credit card details?",
      options: ["http://myshop.com", "https://myshop.com"],
      correctAnswer: "https://myshop.com",
    }
  ];