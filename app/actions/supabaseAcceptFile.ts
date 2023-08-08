import supabase from "../../lib/supabase";
import { v4 as uuidv4 } from "uuid";
import addImageToDatabase from "./addImageToDatabase";


const SupabaseAcceptFile = async (file: File, email: string) => {
    const filename = `${uuidv4()}-${file.name}`;
    const filesize = file.size;
    const filetype = file.type;
    const { data, error } = await supabase.storage
        .from("docscanwiz")
        .upload(filename, file, {
            cacheControl: "3600",
            upsert: false,
        });

    if (error) {
        console.error("Error uploading file:", error);
        return;
    }

    const filepath = data?.path;
    console.log(filepath);
    await addImageToDatabase({ filepath, filesize, email, filename })
    // save filepath in database
};

export default SupabaseAcceptFile;
