"use client";
import dynamic from 'next/dynamic';

const LottieAnimation = dynamic(() => import('./LottieAnimation'), {
    // This line is important. It disables server-side rendering for this component.

    loading: () => <div>loading....</div>,
});


interface AnimationData extends Record<string, unknown> { }

interface LottieAnimationProps {
    animationData: AnimationData;
    speed?: number;
    height?: number;
    width?: number;
}

const LottieAnimationDynamic: React.FC<LottieAnimationProps> = ({ animationData, speed = 1, height = 400, width = 400 }) => {

    return (
        <>
            <LottieAnimation animationData={animationData} speed={speed} height={height} width={width} />
        </>
    );
}

export default LottieAnimationDynamic