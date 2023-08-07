import React from 'react';
import { Button } from "@/components/ui/button";
import { AiOutlineFrown } from 'react-icons/ai';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

const SignInComponent: React.FC = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="flex flex-col justify-center items-center min-h-screen space-y-8">
                <AiOutlineFrown className="w-16 h-16 text-gray-500 dark:text-gray-400" />
                <h1 className="text-3xl font-bold text-black dark:text-white">Oops! You are not signed in</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400">We miss you! Please click a button below to sign in or sign up. We can&apos;t wait to have you back!</p>
                <div className="space-x-4">
                    <SignInButton mode="modal">
                        <Button className="px-5 py-3 text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800">
                            Sign In
                        </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <Button className="px-5 py-3 text-white bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800">
                            Sign Up
                        </Button>
                    </SignUpButton>
                </div>
            </div>
        </section>
    );
}

export default SignInComponent;
