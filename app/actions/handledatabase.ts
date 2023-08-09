// handleAddToDatabase.ts

import SupabaseAcceptFile from "./supabaseAcceptFile";

const handleAddToDatabase = async (acceptedFiles: File[], email: string) => {
    try {
        // Perform actions to add all the files to the database
        for (const file of acceptedFiles) {
            if (file.size <= 4 * 1024 * 1024) {
                // Do something with each file, such as uploading or processing
                if (typeof email == "string") {
                    await SupabaseAcceptFile(file, email);
                } else {
                    throw new Error("Email is not a string");
                }
                console.log('Accepted file:', file);
                // Add the file to the database
                // ...
            } else {
                console.log('File size exceeds the maximum limit');
            }
        }
    } catch (error) {
        console.error("Error adding files to the database:", error);
    }
};

export default handleAddToDatabase;
