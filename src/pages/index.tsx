import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import { Logo } from "../components/logo";
import { NextSeo } from "next-seo";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NextSeo
        title={`Schooliu`}
        description={`La plateforme collaborative pour tous vos cours`}
        openGraph={{
          title: `Schooliu`,
          description: `La plateforme collaborative pour tous vos cours`,
          images: [
            {
              url: `https://schooliu.vercel.app/og-image.png`,
              width: 800,
              height: 400,
              alt: `Schooliu`,
              type: "image/png"
            }
          ],
          site_name: "Schooliu"
        }}
      />
      <div className="h-screen flex flex-col">
        <nav className="w-full p-4">
          <div className="p-4 m-auto flex items-center justify-between">
            <Logo />
            <div>
              <Link className="btn btn-primary rounded-full" href={"/login"}>
                Se connecter
              </Link>
            </div>
          </div>
        </nav>
        <main className="grid grid-cols-2 flex-grow">
          <div className="max-w-5xl m-auto flex flex-col justify-center p-4">
            <h1 className="text-8xl font-bold border-white border-b-2 pb-10">
              📚 La plateforme collaborative pour tous vos cours
            </h1>
            <p className="mt-10 text-3xl">
              Apprendre ensemble, réussir ensemble : le site de collaboration de
              cours pour les étudiants, par les étudiants
            </p>
          </div>
          <div className="p-4">
            <div className="relative h-full w-full">
              <Image
                className="object-cover rounded-3xl"
                fill
                src="/brooke-cagle-g1Kr4Ozfoac-unsplash.jpg"
                alt="School"
              ></Image>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
