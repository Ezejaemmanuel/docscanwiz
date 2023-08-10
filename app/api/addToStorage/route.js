// import getCurrentUser from '@/app/actions/getCurrentUser';
// import { prisma } from '@/lib/prisma';
// import supabase from '@/lib/supabase';
// import { NextRequest, NextResponse } from 'next/server'
// import { v4 as uuidv4 } from "uuid";

// export async function POST(request: NextRequest) {
//     const email = await getCurrentUser() as unknown as string;
//     const formData = await request.formData();
//     const files = formData.getAll("files") as File[] | null;
//     const generalId = uuidv4();
//     if (files) {
//         for (const file of files) {
//             const filename = `${file.name}-${uuidv4()}`;
//             const filesize = file.size;
//             const filetype = file.type;
//             const { data, error } = await supabase.storage
//                 .from("docscanwiz")
//                 .upload(filename, file, {
//                     cacheControl: "3600",
//                     upsert: false,
//                 });
//             const imageData: any = data; // or const imageData: unknown = data;
//             const filepath = imageData?.path as string;

//             if (error) {
//                 return NextResponse.json({ error: `The is an Error here ${error.message}` }, { status: 500 });

//             }
//             try {
//                 const user = await prisma.user.findUnique({
//                     where: { email: email },
//                 });

//                 if (!user) {
//                     return NextResponse.json({ error: "user not available" }, { status: 404 });

//                 }

//                 const image = await prisma.image.create({
//                     data: {
//                         url: filepath,
//                         size: filesize,
//                         filename: filename,
//                         width: 100,
//                         height: 100,
//                         user: {
//                             connect: { id: user.id },
//                         },
//                     },
//                 });

//                 console.log("Image added to database:", image);
//                 return NextResponse.json(image);

//             } catch (error) {
//                 console.error("Error adding image to database:", error);
//             } finally {
//                 await prisma.$disconnect();
//             }
//         }



//     } else {
//         return NextResponse.json({ error: "user not available" }, { status: 404 });

//     }
// }


import getCurrentUser from '@/app/actions/getCurrentUser';
import { prisma } from '@/lib/prisma';
import supabase from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
    try {
        const email = await getCurrentUser();
        if (!email) {
            return NextResponse.json({ error: "user not available" }, { status: 404 });
        }

        const formData = await request.formData();
        const files = formData.getAll("files");
        if (files.length > 0) {
            const images = await Promise.all(files.map(async (file) => {
                const filename = `${file.name}-${uuidv4()}`;
                const filesize = file.size;
                let filepath;
                try {
                    const { data, error } = await supabase.storage
                        .from("docscanwiz")
                        .upload(filename, file, {
                            cacheControl: "3600",
                            upsert: false,
                        });
                    const imageData = data; // or const imageData: unknown = data;
                    filepath = imageData?.path;
                    if (error && error instanceof Error) {
                        return { error: `There is an error: ${error.message}` };
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        return { error: `Error uploading file: ${error.message}` };
                    }
                }
                return {
                    url: filepath,
                    size: filesize,
                    filename: filename,
                    width: 100,
                    height: 100,
                    userId: email,
                };
            }));

            const validImages = images.filter(image => !image.error);
            const errorImage = images.find(image => image.error);
            if (errorImage) {
                return NextResponse.json({ error: errorImage.error }, { status: 500 });
            }

            const createdImages = await prisma.image.createMany({
                data: validImages.map(image => ({
                    url: image.url,
                    size: image.size,
                    filename: image.filename,
                    width: image.width,
                    height: image.height,
                    userId: image.userId,
                })),
            });
            return NextResponse.json(createdImages);
        } else {
            return NextResponse.json({ error: "No files provided" }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: `Error: ${error.message}` }, { status: 500 });
    }
}
