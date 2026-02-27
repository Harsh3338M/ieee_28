export const Lesson2: Step[] = [
    {
      id: 1,
      type: 'intro',
      title: "The Vault of Secrets",
      description: "When you create an account, a secure website never saves your actual password. Instead, it turns it into a 'Fingerprint' called a Hash.",
    },
    {
      id: 2,
      type: 'comparison',
      title: "Plain Text vs. Hashed",
      description: "If a hacker steals a 'Plain Text' list, they see 'Password123'. If they steal a 'Hashed' list, they just see 'a7b2c9...'. It's impossible to turn the hash back into the password!",
    },
    {
      id: 3,
      type: 'quiz',
      title: "The Hacker's Headache",
      description: "A database was leaked! Which version of your password would make a hacker give up?",
      options: ["123456 (Plain Text)", "$2b$12$dQw4w9WgXcQ (Hashed)"],
      correctAnswer: "$2b$12$dQw4w9WgXcQ (Hashed)",
    }
  ];