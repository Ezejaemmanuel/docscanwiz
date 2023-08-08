"use client";
import React from 'react';

interface LoadingProps {
    loadingText?: string;
}

const LoadingComponent: React.FC<LoadingProps> = ({ loadingText }) => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
            {loadingText && <p className="text-yellow-500 mt-4">{loadingText}</p>}
        </div>
    );
};

export default LoadingComponent;
