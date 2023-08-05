import React from 'react';
import { SiGoogledrive } from 'react-icons/si';
import { RiFileSearchLine } from 'react-icons/ri';

const steps = [
    {
        title: 'Extract Text',
        text: 'Our AI instantly extracts text from documents like PDFs, scans, and photos.',
        icon: SiGoogledrive,
        borderColor: 'border-green-300'
    },
    {
        title: 'Understand Context',
        text: 'Our AI analyzes the text to understand context and extract insights.',
        icon: RiFileSearchLine,
        borderColor: 'border-blue-300'
    },
    {
        title: 'Deliver Output',
        text: 'The extracted and analyzed text is delivered in your desired format.',
        icon: SiGoogledrive,
        borderColor: 'border-gray-300'
    }
];

const DocumentExtractor: React.FC = () => {
    return (
        <div className="dark:bg-gray-800 dark:text-white">
            <h2 className="text-4xl mb-6 py-4 font-bold text-center">
                What to do?
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                {steps.map(step => (
                    <div key={step.title} className={'bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white p-4 m-4 rounded-lg w-full'}>
                        <h2 className="text-lg font-medium">{step.title}</h2>
                        <p className="text-sm mt-2">{step.text}</p>

                        <div className="mt-4 flex justify-center">
                            <step.icon className={`h-12 w-12 p-2 rounded-lg bg-white dark:bg-gray-300 border ${step.borderColor} text-yellow-500`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DocumentExtractor;
