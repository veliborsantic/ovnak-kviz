export type AnswerLetter = "A" | "B" | "C" | "D";

const LETTERS: AnswerLetter[] = ["A", "B", "C", "D"];

/** Bodovi po pitanju: Q1–Q2 = 2, Q3–Q5 = 1 */
const QUESTION_WEIGHTS = [2, 2, 1, 1, 1];

function resolveTie(
  tied: AnswerLetter[],
  answers: AnswerLetter[],
): AnswerLetter {
  for (let i = 0; i < 3; i += 1) {
    const letter = answers[i];
    if (tied.includes(letter)) {
      return letter;
    }
  }
  return tied[Math.floor(Math.random() * tied.length)];
}

export function resolveQuizWinner(answers: AnswerLetter[]): AnswerLetter {
  const counts: Record<AnswerLetter, number> = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  };

  for (let i = 0; i < answers.length; i += 1) {
    const weight = QUESTION_WEIGHTS[i] ?? 1;
    counts[answers[i]] += weight;
  }

  const max = Math.max(counts.A, counts.B, counts.C, counts.D);
  const tied = LETTERS.filter((l) => counts[l] === max);

  if (tied.length === 1) {
    return tied[0];
  }

  return resolveTie(tied, answers);
}
