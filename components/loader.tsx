// components/Loading.tsx
import { FC } from 'react';

const Loading: FC = () => {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
            <div className="spin 1s linear infinite rounded-full h-32 w-32 border-t-4 border-b-4 border-yellow-500">
            </div>
        </div>
    );

};

export default Loading;