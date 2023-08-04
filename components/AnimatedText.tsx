
// "use client";
// import { motion, AnimatePresence, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { useEffect } from 'react';
// import chroma from 'chroma-js';

// interface AnimatedTextProps {
//     inputText: string;
//     randomizeColor: boolean;
//     restartOnInView?: boolean;
//     colorStart: string;
//     colorEnd: string;
// }

// const AnimatedText: React.FC<AnimatedTextProps> = ({
//     inputText,
//     randomizeColor,
//     restartOnInView = false,
//     colorStart = 'yellow',
//     colorEnd = 'red',
// }) => {
//     const controls = useAnimation();
//     const { ref, inView } = useInView();

//     useEffect(() => {
//         if (inView) {
//             controls.start("visible");
//         } else if (!inView && restartOnInView) {
//             controls.start("hidden");
//         }
//     }, [controls, inView, restartOnInView]);

//     const textVariants = {
//         hidden: { opacity: 0 },
//         visible: (i: number) => ({
//             opacity: 1,
//             transition: {
//                 delay: i * 0.1,
//             },
//         }),
//     };

//     // Create a color scale from colorStart to colorEnd
//     const colorScale = chroma.scale([colorStart, colorEnd]).mode('lch');

//     // Convert the inputText string to an array
//     const chars = Array.from(inputText.replace(/ /g, '\u00A0'));

//     return (
//         <AnimatePresence mode='wait'>
//             <div className="flex flex-wrap items-center justify-center bg-white dark:bg-gray-900 sm:whitespace-pre-wrap">
//                 {chars.map((char, i) => (
//                     <motion.span
//                         ref={ref}
//                         key={char + "-" + i}
//                         // If character is a non-breaking space just leave it empty, otherwise apply color styling
//                         style={char === '\u00A0' ? {} : (randomizeColor ? { color: colorScale(i / chars.length).hex() } : {})}
//                         variants={textVariants}
//                         custom={i}
//                         initial="hidden"
//                         animate={controls}
//                     >
//                         {char}
//                     </motion.span>
//                 ))}
//             </div>
//         </AnimatePresence>
//     );
// };

// export default AnimatedText;

"use client";
import React, { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedTextProps {
    inputText: string;
    randomizeColor: boolean;
    restartOnInView?: boolean;
    colorStart: string;
    colorEnd: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
    inputText,
    randomizeColor,
    restartOnInView = false,
    colorStart = 'yellow',
    colorEnd = 'red',
}) => {

    const controls = useAnimation();
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else if (!inView && restartOnInView) {
            controls.start("hidden");
        }
    }, [controls, inView, restartOnInView])

    const textVariants = {
        hidden: { opacity: 0 },
        visible: (i: number) => ({
            opacity: 1,
            transition: { delay: i * 0.1 },
        }),
    };

    let chroma: any;
    let motion: any;
    let AnimatePresence: any;

    async function importDependencies() {
        if (randomizeColor) {
            chroma = await import('chroma-js');
        }
        const framerMotion = await import('framer-motion');
        motion = framerMotion.motion;
        AnimatePresence = framerMotion.AnimatePresence;
    }

    useEffect(() => {
        importDependencies();
    }, []);
    const colorScale = chroma.scale([colorStart, colorEnd]).mode('lch');

    const chars = Array.from(inputText.replace(/ /g, '\u00A0'));

    return (
        <AnimatePresence mode='wait'>
            <div className="flex flex-wrap items-center justify-center bg-white dark:bg-gray-900 sm:whitespace-pre-wrap">
                {chars.map((char, i) => (
                    <motion.span
                        key={char + "-" + i}
                        ref={ref}
                        style={char === '\u00A0' ? {} : (randomizeColor ? { color: colorScale(i / chars.length).hex() } : {})}

                        variants={textVariants}
                        custom={i}
                        initial="hidden"
                        animate={controls}
                    >
                        {char}
                    </motion.span>
                ))}
            </div>
        </AnimatePresence>
    );
}

export default AnimatedText;