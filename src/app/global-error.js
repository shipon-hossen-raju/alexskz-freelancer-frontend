'use client';
import './globals.css';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-bold">Something went wrong in root!</h2>
        <p className="mt-2 text-sm text-gray-500">{error.message}</p>
        <button
          onClick={() => reset()}
          className="mt-4 rounded bg-blue-600 px-3 py-1 text-white cursor-pointer"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
