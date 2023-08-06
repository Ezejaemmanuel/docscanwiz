'use client';

import Image from 'next/image';
import Link from 'next/link';
//import AnimatedText from './AnimatedText';
//import forexChat from '../public/yellow_forex.json';
import LottieAnimationDynamic from './LottieAnimation/LottieAnimationDynamic';
import Scanning from '../public/scanning.json'
import dynamic from 'next/dynamic';
import { CircleIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
const AnimatedText = dynamic(
    () => import('./AnimatedText'),
    {
        ssr: false,
        loading: () => <div>loading.....</div>,
    }
)
const HeroSection: React.FC = () => {

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="flex flex-col-reverse lg:flex-row-reverse max-w-screen-xl px-4 py-8 mx-auto lg:space-x-reverse lg:space-x-8 lg:py-16 space-y-8 lg:space-y-0">
                <div className="flex-1 flex justify-center items-center">
                    <LottieAnimationDynamic animationData={Scanning} speed={1} width={300} height={400} />
                </div>

                <div className="flex-1 flex flex-col justify-center lg:items-start">
                    <h1 className="max-w-2xl mb-4 text-4xl text-black font-extrabold tracking-tight leading-none font-serif md:text-5xl xl:text-6xl dark:text-white bg-clip-text text-transparent">
                        <span className="text-black dark:text-white">D</span>
                        <span className="text-black dark:text-white">o</span>
                        <span className="text-black dark:text-white">c</span>
                        <span className="text-red-500">S</span>
                        <span className="text-black dark:text-white">c</span>
                        <span className="text-black dark:text-white">a</span>
                        <span className="text-green-500">n</span>
                        <span className="text-black dark:text-white">W</span>
                        <span className="text-black dark:text-white">i</span>
                        <span className="text-black dark:text-white">z</span> -<h1 className='text-black dark:text-white'>Unlock the power of document digitization with DocScanWiz</h1></h1>

                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                        <AnimatedText inputText={'DocScanWiz is a platform that allows you to easily extract text and data from documents, images, PDFs, and other files. Our advanced OCR technology can digitize your paperwork in seconds. Simply upload your documents and let DocScanWiz do the hard work for you. Our system is fast, accurate, and secure - perfect for managing all your business documents.'} randomizeColor={true} colorStart={'yellow'} colorEnd={'purple'} />
                    </p>
                    <div className='flex'>
                        <Link href={"/dashboard"} >
                            <Button className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                                <CircleIcon className="mr-2 h-4 w-4" /> Get Started
                            </Button>
                        </Link>

                        <Button className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                            <div className="mr-2 h-4 w-4">
                                <RegisterLink>Sign up</RegisterLink>
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;