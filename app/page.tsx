import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Link from "next/link";

export default function Home() {
  const words = [
    {
      text: "Notes",
    },
    {
      text: "the",
    },
    {
      text: "code",
    },
    {
      text: "while",
    },
    {
      text: "code",
    },
    {
      text: "the",
    },
    {
      text: "notes.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <div className="w-full flex justify-center">
          <div className="min-w-[200px] text-center">
            <TypewriterEffect words={words}></TypewriterEffect>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
          <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
            <Link href="/signup">Signup</Link>
          </button>
          <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
            <Link href="/signin">Signin</Link>
          </button>
        </div>
      </main>

      <footer className="row-start-3 text-center text-gray-400">
        <p>
          Built with{" "}
          <span className="text-red-500" role="img" aria-label="love">
            ❤️
          </span>{" "}
          by{" "}
          <a
            href="twitter.com/gundamtricks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            @gundamtricks
          </a>
        </p>
      </footer>
    </div>
  );
}
