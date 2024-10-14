import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Error = () => {
  const [fadeIn, setFadeIn] = useState(false);

  // Trigger a fade-in animation effect
  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div
        className={`${
          fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } transition-all duration-700 ease-in-out py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 text-center`}
      >
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-red-600 dark:text-red-500 animate-bounce">
          404
        </h1>
        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
          Oops! Page Not Found.
        </p>
        <p className="mb-5 text-lg font-light text-gray-500 dark:text-gray-400">
          Let’s head back home before things get weird!
        </p>
        <Link to="/">
          <span
            className="
          inline-flex text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-base px-6 py-2.5 text-center dark:focus:ring-red-900 shadow-lg transform hover:scale-105 transition-transform duration-300
          "
          >
            Take Me Home
          </span>
        </Link>
      </div>
    </section>
  );
};

export default Error;
