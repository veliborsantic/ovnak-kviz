import type { AnswerLetter } from "@/lib/quizLogic";

export type QuizOption = {
  letter: AnswerLetter;
  text: string;
};

export type QuizQuestion = {
  id: number;
  text: string;
  options: QuizOption[];
};

export type QuizResultCopy = {
  headline: string;
  lines: string[];
  iconBase?: string;
};

export type QuizDefinition = {
  id: string;
  menuTitle: string;
  menuSubtitle: string;
  questions: QuizQuestion[];
  results: Record<AnswerLetter, QuizResultCopy>;
};

export const signatureQuiz: QuizDefinition = {
  id: "signature",
  menuTitle: "Tvoj signature komad?",
  menuSubtitle: "7 pitanja · otkrij koji nakit te najbolje opisuje",
  questions: [
    {
      id: 1,
      text: "Bez čega ne izlaziš iz kuće?",
      options: [
        { letter: "A", text: "Prsten" },
        { letter: "B", text: "Naušnice" },
        { letter: "C", text: "Narukvica" },
        { letter: "D", text: "Ogrlica" },
      ],
    },
    {
      id: 2,
      text: "Šta prvo stavljaš od nakita?",
      options: [
        { letter: "A", text: "Prsten" },
        { letter: "B", text: "Naušnice" },
        { letter: "C", text: "Narukvicu" },
        { letter: "D", text: "Ogrlicu" },
      ],
    },
    {
      id: 3,
      text: "Tvoj outfit je bez nakita:",
      options: [
        { letter: "A", text: "Nedovršen" },
        { letter: "B", text: "Prejednostavan" },
        { letter: "C", text: "Ok, ali može bolje" },
        { letter: "D", text: "Fali mu fokus" },
      ],
    },
    {
      id: 4,
      text: "Najčešće dobijaš komplimente za:",
      options: [
        { letter: "A", text: "Ruke" },
        { letter: "B", text: "Lice" },
        { letter: "C", text: "Stil" },
        { letter: "D", text: "Dekolte / vrat" },
      ],
    },
    {
      id: 5,
      text: "Šta želiš da naglasiš?",
      options: [
        { letter: "A", text: "Ruke" },
        { letter: "B", text: "Lice" },
        { letter: "C", text: "Pokret" },
        { letter: "D", text: "Vrat" },
      ],
    },
    {
      id: 6,
      text: "Kada kupuješ nakit, biraš:",
      options: [
        { letter: "A", text: "Prstenje" },
        { letter: "B", text: "Naušnice" },
        { letter: "C", text: "Narukvice" },
        { letter: "D", text: "Ogrlice" },
      ],
    },
    {
      id: 7,
      text: "Tvoj stil je:",
      options: [
        { letter: "A", text: "Detaljan" },
        { letter: "B", text: "Fokusiran na lice" },
        { letter: "C", text: "Razigran" },
        { letter: "D", text: "Elegantan" },
      ],
    },
  ],
  results: {
    A: {
      headline: "💍 Ring Icon",
      iconBase: "clean_minimal",
      lines: [
        "Prstenje je tvoj zaštitni znak.",
        "👉 Fokus: ruke i detalji",
      ],
    },
    B: {
      headline: "✨ Earring Star",
      iconBase: "dark-aesthetic",
      lines: [
        "Sve počinje od naušnica — i tu završava.",
        "👉 Fokus: lice i izražaj",
      ],
    },
    C: {
      headline: "🔗 Bracelet Muse",
      iconBase: "playful-color",
      lines: [
        "Narukvice daju pokret i vibe tvom stilu.",
        "👉 Fokus: dinamika outfita",
      ],
    },
    D: {
      headline: "💎 Necklace Queen",
      iconBase: "luxe-glam",
      lines: [
        "Ogrlica ti daje završni “wow”.",
        "👉 Fokus: dekolte i elegancija",
      ],
    },
  },
};

export const instagramQuiz: QuizDefinition = {
  id: "instagram",
  menuTitle: "Tvoj Instagram feed kao nakit?",
  menuSubtitle: "7 pitanja · tvoj vizuelni vibe u nakitu",
  questions: [
    {
      id: 1,
      text: "Tvoj feed izgleda:",
      options: [
        { letter: "A", text: "Svijetao i čist" },
        { letter: "B", text: "Tamniji i aesthetic" },
        { letter: "C", text: "Šaren i zabavan" },
        { letter: "D", text: "Luksuzan" },
      ],
    },
    {
      id: 2,
      text: "Koju paletu koristiš?",
      options: [
        { letter: "A", text: "Neutralnu" },
        { letter: "B", text: "Tamnu" },
        { letter: "C", text: "Jarke boje" },
        { letter: "D", text: "Gold/bež tonove" },
      ],
    },
    {
      id: 3,
      text: "Tvoje fotke su:",
      options: [
        { letter: "A", text: "Minimalističke" },
        { letter: "B", text: "Dramatične" },
        { letter: "C", text: "Energične" },
        { letter: "D", text: "Elegantne" },
      ],
    },
    {
      id: 4,
      text: "Šta najviše objavljuješ?",
      options: [
        { letter: "A", text: "Lifestyle" },
        { letter: "B", text: "Mood fotke" },
        { letter: "C", text: "Zabavne trenutke" },
        { letter: "D", text: "Fashion" },
      ],
    },
    {
      id: 5,
      text: "Tvoj vibe je:",
      options: [
        { letter: "A", text: "Clean girl" },
        { letter: "B", text: "Dark aesthetic" },
        { letter: "C", text: "Fun & colorful" },
        { letter: "D", text: "Luxury" },
      ],
    },
    {
      id: 6,
      text: "Kako uređuješ slike?",
      options: [
        { letter: "A", text: "Light & soft" },
        { letter: "B", text: "Contrast & shadow" },
        { letter: "C", text: "Bright & vivid" },
        { letter: "D", text: "Warm & polished" },
      ],
    },
    {
      id: 7,
      text: "Kako želiš da te ljudi vide?",
      options: [
        { letter: "A", text: "Prirodno lijepu" },
        { letter: "B", text: "Misterioznu" },
        { letter: "C", text: "Zabavnu" },
        { letter: "D", text: "Glamuroznu" },
      ],
    },
  ],
  results: {
    A: {
      headline: "🤍 Clean Minimal",
      iconBase: "clean_minimal",
      lines: [
        "Jednostavno, čisto i estetski savršeno.",
        "👉 Nakit: tanko zlato, minimalizam",
      ],
    },
    B: {
      headline: "🖤 Dark Aesthetic",
      iconBase: "dark-aesthetic",
      lines: [
        "Misteriozno, edgy i vizualno jako.",
        "👉 Nakit: srebro, kontrasti",
      ],
    },
    C: {
      headline: "🌈 Playful Color",
      iconBase: "playful-color",
      lines: [
        "Zabavna, energična i puna života.",
        "👉 Nakit: šareni, trend komadi",
      ],
    },
    D: {
      headline: "✨ Luxe Glam",
      iconBase: "luxe-glam",
      lines: [
        "Sve izgleda skupo i dotjerano.",
        "👉 Nakit: statement zlato, glam",
      ],
    },
  },
};

export const allQuizzes: QuizDefinition[] = [signatureQuiz, instagramQuiz];
