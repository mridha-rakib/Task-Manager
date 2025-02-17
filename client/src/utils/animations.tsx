export const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

export const item = {
  hidden: { opacity: 0, backgroundColor: "var(--background)" },
  visible: {
    opacity: 1,
    backgroundColor: "var(--primary)",
    color: "var(--primary-foreground)",
    transition: { duration: 0.3 },
  },
};
