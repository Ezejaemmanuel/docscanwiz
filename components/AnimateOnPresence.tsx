// import { useEffect, FC } from 'react';
// import { AnimatePresence, motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';

// interface FadeInWhenVisibleProps {
//     children: React.ReactNode;
//     direction: 'fromBelow' | 'fromRight' | 'fromLeft';
//     speed: 'slow' | 'medium' | 'fast';
// }

// const FadeInWhenVisible: FC<FadeInWhenVisibleProps> = ({
//     children,
//     direction,
//     speed
// }) => {

//     const controls = useAnimation();

//     const { ref, inView } = useInView({
//         triggerOnce: true
//     });

//     useEffect(() => {
//         if (inView) {
//             controls.start("visible");
//         }

//         return () => controls.stop();
//     }, [controls, inView])

//     const getTransitionDuration = () => {
//         if (speed === 'slow') {
//             return 0.6;
//         } else if (speed === 'medium') {
//             return 0.3;
//         } else if (speed === 'fast') {
//             return 0.1;
//         } else {
//             return 0.3; // default
//         }
//     }

//     const getAnimationVariants = () => {

//         let animationVariants = {
//             visible: { opacity: 1, scale: 1 },
//             hidden: { opacity: 0, scale: 0 }
//         };

//         if (direction === 'fromBelow') {
//             animationVariants.visible = {
//                 ...animationVariants.visible,
//                 y: 0
//             };
//             animationVariants.hidden = {
//                 ...animationVariants.hidden,
//                 y: '100%'
//             };
//         } else if (direction === 'fromRight') {
//             animationVariants.visible = {
//                 ...animationVariants.visible,
//                 x: 0
//             };
//             animationVariants.hidden = {
//                 ...animationVariants.hidden,
//                 x: '100%'
//             };
//         } else if (direction === 'fromLeft') {
//             animationVariants.visible = {
//                 ...animationVariants.visible,
//                 x: 0
//             };
//             animationVariants.hidden = {
//                 ...animationVariants.hidden,
//                 x: '-100%'
//             };
//         }

//         return animationVariants;
//     }

//     return (
//         <AnimatePresence mode='wait'>
//             <motion.div
//                 ref={ref}
//                 animate={controls}
//                 initial="hidden"
//                 transition={{ duration: getTransitionDuration() }}
//                 variants={getAnimationVariants()}
//             >
//                 {children}
//             </motion.div>
//         </AnimatePresence>
//     );
// }

// export default FadeInWhenVisible;
// // import { useEffect, FC } from 'react';
// // import { AnimatePresence, motion, useAnimation } from 'framer-motion';
// // import { useInView } from 'react-intersection-observer';

// // interface FadeInWhenVisibleProps {
// //     children: React.ReactNode;
// //     direction?: 'from-below' | 'from-right' | 'from-left';
// //     speed?: 'slow' | 'medium' | 'fast';
// //     opacity?: number;
// //     scale?: number;
// //     rotate?: number;
// //     delay?: number;
// //     easing?: string;
// // }

// // const FadeInWhenVisible: FC<FadeInWhenVisibleProps> = ({
// //     children,
// //     direction = 'from-below',
// //     speed = 'medium',
// //     opacity = 1,
// //     scale = 1,
// //     rotate = 0,
// //     delay = 0,
// //     easing = 'easeInOut',
// // }) => {
// //     const controls = useAnimation();
// //     const { ref, inView } = useInView({
// //         triggerOnce: true,
// //     });

// //     useEffect(() => {
// //         if (inView) {
// //             controls.start("visible");
// //         }
// //     }, [controls, inView]);

// //     const getAnimationVariants = () => {
// //         let animationVariants = {
// //             visible: { opacity, scale, rotate },
// //             hidden: { opacity: 0, scale: 0, rotate }
// //         };

// //         if (direction === 'from-below') {
// //             animationVariants = {
// //                 ...animationVariants,
// //                 visible: { ...animationVariants.visible, translateY: 0 },
// //                 hidden: { ...animationVariants.hidden, translateY: '100%' }
// //             };
// //         } else if (direction === 'from-right') {
// //             animationVariants = {
// //                 ...animationVariants,
// //                 visible: { ...animationVariants.visible, translateX: 0 },
// //                 hidden: { ...animationVariants.hidden, translateX: '100%' }
// //             };
// //         } else if (direction === 'from-left') {
// //             animationVariants = {
// //                 ...animationVariants,
// //                 visible: { ...animationVariants.visible, translateX: 0 },
// //                 hidden: { ...animationVariants.hidden, translateX: '-100%' }
// //             };
// //         }

// //         return animationVariants;
// //     };

// //     const getTransitionDuration = () => {
// //         if (speed === 'slow') {
// //             return 0.6;
// //         } else if (speed === 'medium') {
// //             return 0.3;
// //         } else if (speed === 'fast') {
// //             return 0.1;
// //         }
// //     };

// //     return (
// //         <AnimatePresence initial={false}>
// //             <motion.div
// //                 ref={ref}
// //                 animate={controls}
// //                 initial="hidden"
// //                 transition={{ duration: getTransitionDuration(), delay, ease: easing }}
// //                 variants={getAnimationVariants()}
// //             >
// //                 {children}
// //             </motion.div>
// //         </AnimatePresence>
// //     );
// // };

// // export default FadeInWhenVisible;
