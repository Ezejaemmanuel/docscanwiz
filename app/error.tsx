"use client";
import { useEffect } from 'react';

export default function ErrorNextjs({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="bg-red-500 text-white p-4 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Something went wrong!</h2>
            <button
                className="bg-white text-red-500 px-4 py-2 rounded-md shadow-md hover:bg-red-100"
                onClick={reset}
            >
                Try again
            </button>
        </div>
    );
}
