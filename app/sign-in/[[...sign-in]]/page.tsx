import { SignIn } from "@clerk/nextjs";
import React from "react";

export default function Page() {
    return (
        <div className="flex justify-center items-center pt-30 h-screen bg-gray-100">
            <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded-lg shadow-md">
                <SignIn />
            </div>
        </div>
    );
}
