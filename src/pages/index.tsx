import Head from "next/head";
import QuizApp from "@/components/QuizApp";

export default function Home() {
  return (
    <>
      <Head>
        <title>Deborah Milano — Otkrij svoju idealnu paletu</title>
        <meta
          name="description"
          content="Deborah Milano kviz: Otkrij svoju idealnu paletu — Proljeće, Ljeto, Jesen ili Zima."
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
