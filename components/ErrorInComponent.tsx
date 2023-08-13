import React from 'react';
import { AiOutlineFrown } from 'react-icons/ai';

interface IErrorDisplayComponentProps {
    errorMessage: string;
    onReset?: Function;
}

const ErrorDisplayComponent: React.FC<IErrorDisplayComponentProps> = ({ errorMessage, onReset }) => {
    return (
        <section className="bg-red-500 h-screen flex items-center justify-center">
            <div className="flex flex-col items-center space-y-8">
                <AiOutlineFrown className="w-16 h-16 text-white" />
                <h1 className="text-3xl font-bold text-white">{errorMessage}</h1>
                <p className="text-lg text-white">Please click the button below to reset.</p>
                <button
                    // onClick={() => onReset()}
                    className="px-5 py-3 text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none"
                >
                    Reset
                </button>
            </div>
        </section>
    );
}

export default ErrorDisplayComponent;
