// // app/components/WhyChooseUs.server.jsx

// import { AiOutlineRight } from 'react-icons/ai'

// import boxes from './boxes.json';

// export default async function WhyChooseUs() {

//   return (

//     <section className="py-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

//       <h2 className="text-4xl mb-6 font-bold text-center">

//         Why Choose Our Service?

//       </h2>

//       <div className="flex flex-wrap justify-center">

//         {boxes.map(box => (

//           <div

//             key={box.title}

//             className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg shadow-lg p-6 m-3 flex-basis-full max-w-md lg:flex-basis-1/3 md:flex-basis-1/2 sm:flex-basis-full lg:p-4 md:p-3 sm:p-2 sm:max-w-xs"

//           >

//             <div>

//               <h3 className="text-2xl font-bold mb-4">

//                 {box.title}

//               </h3>

//               <p className="text-lg leading-relaxed">

//                 {box.text}

//               </p>

//             </div>

//             <div className="flex justify-end text-gray-400 dark:text-gray-500">

//               <AiOutlineRight size={28} />

//             </div>

//           </div>

//         ))}

//       </div>

//     </section>

//   )

// }

// app/components/WhyChooseUs.server.jsx 

import { AiOutlineRight } from './DynamicPackages/OptimizeIcons'

import boxes from './boxes.json';

export default async function WhyChooseUs() {

    return (

        <section className="py-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

            <h2 className="text-4xl mb-6 font-bold text-center">

                Why Choose Our Service?

            </h2>

            <div className="flex flex-wrap justify-center">

                {boxes.map(box => (

                    <div

                        key={box.title}

                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg shadow-lg p-6 m-3 flex-basis-full max-w-md lg:flex-basis-1/3 md:flex-basis-1/2 sm:flex-basis-full lg:p-4 md:p-3 sm:p-2 sm:max-w-xs"

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

                            <AiOutlineRight />

                        </div>

                    </div>

                ))}

            </div>

        </section>

    )

}