
// import { prisma } from '@/lib/prisma';
// import supabase from '@/lib/supabase';
// import { currentUser } from '@clerk/nextjs';
// import { NextRequest, NextResponse } from 'next/server';
// import { v4 as uuidv4 } from "uuid";

// interface Image {
//     url?: string;
//     size: number;
//     filename: string;
//     width: number;
//     height: number;
//     userId: number;
// }

// export async function POST(request: NextRequest): Promise<NextResponse> {
//     try {
//         const email = await currentUser().then(email => email?.emailAddresses[0].emailAddress)
//         console.log(`Email: ${email}`);
//         if (!email) {
//             return NextResponse.json({ error: "user not available" }, { status: 404 });
//         }

//         const user = await prisma.user.findUnique({
//             where: {
//                 email: email,
//             },
//         });

//         if (!user) {
//             return NextResponse.json({ error: "user not found" }, { status: 404 });
//         }

//         const userId = user.id;

//         const formData = await request.formData();
//         console.log(`Form Data: ${JSON.stringify(formData)}`);
//         const files = formData.getAll("files") as File[];
//         console.log(`Files: ${files.length}`);
//         if (files.length > 0) {
//             const images: Promise<Image | NextResponse>[] = files.map(async (file) => {
//                 const filename = `${file.name}-${uuidv4()}`;
//                 console.log(`Filename: ${filename}`);
//                 const filesize = file.size;
//                 console.log(`File size: ${filesize}`);
//                 let filepath;
//                 try {
//                     const { data, error } = await supabase.storage
//                         .from("docscanwiz")
//                         .upload(filename, file, {
//                             cacheControl: "3600",
//                             upsert: false,
//                         });
//                     const imageData = data;
//                     filepath = imageData?.path;
//                     console.log(`File path: ${filepath}`);
//                     if (error && error instanceof Error) {
//                         throw new Error(`There is an error: ${error.message}`);
//                     }
//                 } catch (error: unknown) {
//                     if (error instanceof Error) {
//                         console.error(`Error: ${error.message}`);
//                         return NextResponse.json({ error: `Error: ${error.message}` }, { status: 500 });
//                     }
//                 }
//                 return {
//                     url: filepath,
//                     size: filesize,
//                     filename: filename,
//                     width: 100,
//                     height: 100,
//                     userId: userId,
//                 };
//             });

//             const imagesResolved = await Promise.all(images);
//             const validImages = imagesResolved.filter((image): image is Image => !('status' in image));
//             const errorImage = imagesResolved.find(image => 'status' in image);
//             console.log(`Valid images: ${validImages}`);
//             console.log(`Error image: ${errorImage}`);
//             if (errorImage) {
//                 return NextResponse.json({ error: `Error: image carries some errors ` }, { status: 500 });

//             }

//             const createdImages = await prisma.image.createMany({
//                 data: validImages.map(image => ({
//                     url: image.url,
//                     size: image.size,
//                     filename: image.filename,
//                     width: image.width,
//                     height: image.height,
//                     userId: image.userId,
//                 })),
//             });
//             console.log(`Created images: ${createdImages}`);
//             return NextResponse.json(createdImages);
//         } else {
//             return NextResponse.json({ error: "No files provided" }, { status: 400 });
//         }
//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             console.error(`Error: ${error.message}`);
//             return NextResponse.json({ error: `Error: ${error.message}` }, { status: 500 });
//         }
//         return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
//     }
// }

import { prisma } from '@/lib/prisma';
import supabase from '@/lib/supabase';
import { currentUser } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from "uuid";

interface Image {
    url?: string;
    size: number;
    filename: string;
    width: number;
    height: number;
    userId: number;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const email = await currentUser().then(email => email?.emailAddresses[0].emailAddress)
        console.log(`Email: ${email}`);
        if (!email) {
            return NextResponse.json({ error: "user not available" }, { status: 404 });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "user not found" }, { status: 404 });
        }

        const userId = user.id;

        const formData = await request.formData();
        console.log(`Form Data: ${JSON.stringify(formData)}`);
        const files = formData.getAll("files") as File[];
        console.log(`Files: ${files.length}`);
        if (files.length > 0) {
            const images: Promise<Image | NextResponse>[] = files.map(async (file) => {
                const filename = `${file.name}-${uuidv4()}`;
                console.log(`Filename: ${filename}`);
                const filesize = file.size;
                console.log(`File size: ${filesize}`);
                let filepath;
                try {
                    const { data, error } = await supabase.storage
                        .from("docscanwiz")
                        .upload(filename, file, {
                            cacheControl: "3600",
                            upsert: false,
                        });
                    const imageData = data;
                    filepath = imageData?.path;
                    console.log(`File path: ${filepath}`);
                    if (error && error instanceof Error) {
                        throw new Error(`There is an error: ${error.message}`);
                    }
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        console.error(`Error: ${error.message}`);
                        return NextResponse.json({ error: `Error: ${error.message}` }, { status: 500 });
                    }
                }
                return {
                    url: filepath,
                    size: filesize,
                    filename: filename,
                    width: 100,
                    height: 100,
                    userId: userId,
                };
            });

            const imagesResolved = await Promise.all(images);
            const validImages = imagesResolved.filter((image): image is Image => !('status' in image) && image.url !== undefined);
            const errorImage = imagesResolved.find(image => 'status' in image);
            console.log(`Valid images: ${validImages}`);
            console.log(`Error image: ${errorImage}`);
            if (errorImage) {
                return NextResponse.json({ error: `Error: image carries some errors ` }, { status: 500 });
            }

            const createdImages = await prisma.image.createMany({
                data: validImages.map(image => ({
                    url: image.url as unknown as string,
                    size: image.size,
                    filename: image.filename,
                    width: image.width,
                    height: image.height,
                    userId: image.userId,
                })),
            });
            console.log(`Created images: ${createdImages}`);
            return NextResponse.json(createdImages);
        } else {
            return NextResponse.json({ error: "No files provided" }, { status: 400 });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
            return NextResponse.json({ error: `Error: ${error.message}` }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}
