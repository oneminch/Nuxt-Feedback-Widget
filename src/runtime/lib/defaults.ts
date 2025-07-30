export const defaultReactions = [
  ["love-it", "Love it!"],
  ["its-okay", "It's okay."],
  ["not-great", "Not great."],
  ["hate-it", "Hate it!"],
] as const;

export type Reactions = typeof defaultReactions;
