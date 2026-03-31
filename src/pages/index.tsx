import Head from "next/head";
import QuizApp from "@/components/QuizApp";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ovnak — Kviz</title>
        <meta
          name="description"
          content="Kviz: Tvoj signature komad? i Tvoj Instagram feed kao nakit?"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QuizApp />
    </>
  );
}
