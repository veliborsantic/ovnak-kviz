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

export const paletteQuiz: QuizDefinition = {
  id: "palette",
  menuTitle: "Otkrij svoju idealnu paletu",
  menuSubtitle: "5 pitanja · Deborah Milano",
  questions: [
    {
      id: 1,
      text: "Koja je tvoja prirodna boja kose?",
      options: [
        {
          letter: "A",
          text: "Zlatno plava, medena plava ili svijetlosmeđa sa zlatnim odsjajem",
        },
        {
          letter: "B",
          text: "Pepeljasto plava ili hladna svijetlosmeđa",
        },
        {
          letter: "C",
          text: "Kestenjasta, bakrena ili toplo smeđa",
        },
        {
          letter: "D",
          text: "Tamnosmeđa ili crna",
        },
      ],
    },
    {
      id: 2,
      text: "Koje su boje tvoje oči?",
      options: [
        {
          letter: "A",
          text: "Svijetloplave, tirkizne ili svijetlozelene",
        },
        {
          letter: "B",
          text: "Sivo-plave, sivo-zelene ili nježno plave",
        },
        {
          letter: "C",
          text: "Lješnjak, jantarne, maslinasto zelene ili toplo smeđe",
        },
        {
          letter: "D",
          text: "Tamnosmeđe, vrlo tamne zelene ili intenzivno plave",
        },
      ],
    },
    {
      id: 3,
      text: "Kako bi opisala svoj ten?",
      options: [
        {
          letter: "A",
          text: "Svijetao s toplim, zlatnim podtonom",
        },
        {
          letter: "B",
          text: "Svijetao ili srednje svijetao s hladnim ili ružičastim podtonom",
        },
        {
          letter: "C",
          text: "Topao, bež, maslinast ili zlatan",
        },
        {
          letter: "D",
          text: "Vrlo svijetao s izraženim kontrastom ili tamniji hladni ten",
        },
      ],
    },
    {
      id: 4,
      text: "Kako tvoja koža reagira na sunce?",
      options: [
        {
          letter: "A",
          text: "Brzo poprimi zlatnu preplanulu boju",
        },
        {
          letter: "B",
          text: "Najprije pocrveni, a zatim lagano potamni",
        },
        {
          letter: "C",
          text: "Lako tamni i dobije brončani izgled",
        },
        {
          letter: "D",
          text: "Teško tamni ili stvara vrlo izražen kontrast s kosom",
        },
      ],
    },
    {
      id: 5,
      text: "Kakav je kontrast između tvoje prirodne boje kose i tena?",
      options: [
        {
          letter: "A",
          text: "Nizak – kosa i ten su slične svjetline",
        },
        {
          letter: "B",
          text: "Nježan i mekan kontrast",
        },
        {
          letter: "C",
          text: "Srednji kontrast s toplim tonovima",
        },
        {
          letter: "D",
          text: "Izražen kontrast između kose i tena",
        },
      ],
    },
  ],
  results: {
    A: {
      headline: "🌸 TI SI PROLJEĆE",
      lines: [
        "Tebi najbolje pristaju svježe, tople i blistave nijanse.",
        "👉 Beauty savjet: Biraj sjenila u tonovima breskve, šampanjca i zlatne boje koja će naglasiti prirodnu svježinu tena i licu dati zdrav, blistav sjaj.",
      ],
    },
    B: {
      headline: "☀️ TI SI LJETO",
      lines: [
        "Tvoju ljepotu najviše ističu nježne i hladne nijanse.",
        "👉 Beauty savjet: Hladna ružičasta, mauve i srebrni tonovi pomoći će ti stvoriti elegantan, profinjen look koji prirodno naglašava tvoje crte lica.",
      ],
    },
    C: {
      headline: "🍂 TI SI JESEN",
      lines: [
        "Topli i bogati tonovi savršeno naglašavaju tvoje prirodne crte lica.",
        "👉 Beauty savjet: Sjenila u nijansama bronze, bakra i maslinaste boje dodatno će istaknuti toplinu tena i dubinu pogleda.",
      ],
    },
    D: {
      headline: "❄️ TI SI ZIMA",
      lines: [
        "Tebi najbolje pristaju intenzivne i kontrastne nijanse.",
        "👉 Beauty savjet: Srebrna, šljiva i tamnoplava savršen su izbor za naglašavanje izražajnih očiju i prirodnog kontrasta koji te čini upečatljivom.",
      ],
    },
  },
};

export const allQuizzes: QuizDefinition[] = [paletteQuiz];
