import { Button } from "@/components/ui/button";
import Link from "next/link";

const Jumbotron = () => {
  return (
    <section className="relative py-20 md:py-36">
      <div className="bg-grid-slate-100 dark:bg-grid-slate-700/25 absolute inset-0"></div>
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
            The Blog
            <span className="text-green-600 dark:text-green-400">Go</span>
          </h1>
          <p className="max-w-2xl text-xl text-gray-600 dark:text-gray-300 sm:text-2xl">
            Discover, learn, and share your thoughts with our vibrant community
            of writers and readers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-green-600 font-semibold text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
            >
              Start Reading
            </Button>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 font-semibold text-green-600 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-950"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jumbotron;
