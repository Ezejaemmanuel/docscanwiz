// // handleAddToDatabase.ts

// import getCurrentUser from '@/app/actions/getCurrentUser';

// const handleAddToDatabase = async (acceptedFiles: File[]) => {
//     const formData = new FormData();
//     const email = await getCurrentUser() as unknown as string;
//     try {
//         // Perform actions to add all the files to the database
//         for (const file of acceptedFiles) {
//             if (file.size <= 4 * 1024 * 1024) {
//                 formData.append('files', file);
//                 // Do something with each file, such as uploading or processing
//                 if (typeof email == "string") {
//                     // await SupabaseAcceptFile(file, email);
//                     const res = await fetch("api/addToStorage", {
//                         method: 'POST',
//                         body: formData
//                     })
//                     if (!res.ok) {
//                         console.error("there is an error with submitting the file");
//                     }
//                 } else {
//                     throw new Error("Email is not a string");
//                 }
//                 console.log('Accepted file:', file);
//                 // Add the file to the database
//                 // ...
//             } else {
//                 console.log('File size exceeds the maximum limit');
//             }
//         }
//     } catch (error) {
//         console.error("Error adding files to the database:", error);
//     }
// };

// export default handleAddToDatabase;
// // //parallelism is appliend to this using the promise.all
// // import getCurrentUser from '@/app/actions/getCurrentUser';

// // const handleAddToDatabase = async (acceptedFiles: File[]) => {
// //     const formData = new FormData();
// //     const email = await getCurrentUser() as string;

// //     try {
// //         const uploadPromises = acceptedFiles.map(async (file) => {
// //             if (file.size <= 4 * 1024 * 1024) {
// //                 formData.append('files', file);
// //             } else {
// //                 console.log('File size exceeds the maximum limit');
// //                 return;
// //             }

// //             if (typeof email !== "string") {
// //                 throw new Error("Email is not a string");
// //             }

// //             const res = await fetch("api/addToStorage", {
// //                 method: 'POST',
// //                 body: formData
// //             });

// //             if (!res.ok) {
// //                 console.error("There is an error with submitting the file");
// //             }

// //             console.log('Accepted file:', file);
// //             // Add the file to the database
// //             // ...
// //         });

// //         await Promise.all(uploadPromises);
// //     } catch (error) {
// //         console.error("Error adding files to the database:", error);
// //     }
// // };

// // export default handleAddToDatabase;
