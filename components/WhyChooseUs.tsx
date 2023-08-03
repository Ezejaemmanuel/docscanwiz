
import { AiOutlineRight } from 'react-icons/ai';
import boxes from './boxes.json';

const WhyChooseUs = () => {

    return (
        <section className="py-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

            <h2 className="text-4xl mb-6 font-bold text-center">
                Why Choose Our Service?
            </h2>

            <div className="flex flex-wrap justify-center">

                {boxes.map(box => (
                    <div
                        key={box.title}
                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg p-6 m-3 flex-basis-full max-w-md"
                    >
                        <div>
                            <h3 className="text-2xl font-bold mb-4">
                                {box.title}
                            </h3>
                            <p className="text-lg leading-relaxed">
                                {box.text}
                            </p>
                        </div>

                        <div className="flex justify-end text-gray-400 dark:text-gray-500">
                            <AiOutlineRight size={28} />
                        </div>
                    </div>
                ))}

            </div>

        </section>
    );
}

export default WhyChooseUs;