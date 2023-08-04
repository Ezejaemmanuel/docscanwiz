"use client";
import dynamic from 'next/dynamic';
import Loading from '../loader';

const LottieAnimation = dynamic(() => import('./LottieAnimation'), {
    ssr: false, // This line is important. It disables server-side rendering for this component.

    loading: () => < Loading />,
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