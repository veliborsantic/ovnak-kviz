export type AnswerLetter = "A" | "B" | "C" | "D";

const LETTERS: AnswerLetter[] = ["A", "B", "C", "D"];

export function resolveQuizWinner(answers: AnswerLetter[]): AnswerLetter {
  const counts: Record<AnswerLetter, number> = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  };
  for (const a of answers) {
    counts[a] += 1;
  }
  const max = Math.max(counts.A, counts.B, counts.C, counts.D);
  const tied = LETTERS.filter((l) => counts[l] === max);
  if (tied.length === 1) {
    return tied[0];
  }
  for (let i = answers.length - 1; i >= 0; i -= 1) {
    const letter = answers[i];
    if (tied.includes(letter)) {
      return letter;
    }
  }
  return tied[0];
}
