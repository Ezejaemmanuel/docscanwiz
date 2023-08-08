import supabase from "../../lib/supabase";
import { v4 as uuidv4 } from "uuid";


const SupabaseAcceptFile = async (file: File) => {
    const filename = `${uuidv4()}-${file.name}`;

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
    // save filepath in database
};

export default SupabaseAcceptFile;
