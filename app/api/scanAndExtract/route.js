
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

// const NOT_FOUND_STATUS = 404;
// const SERVER_ERROR_STATUS = 500;
// const BAD_REQUEST_STATUS = 400;
// const CACHE_CONTROL = "3600";

// async function uploadFile(file: File, filename: string) {
//     const { data, error } = await supabase.storage
//         .from("docscanwiz")
//         .upload(filename, file, {
//             cacheControl: CACHE_CONTROL,
//             upsert: false,
//         });
//     if (error && error instanceof Error) {
//         throw error;
//     }
//     return data?.path;
// }

// export async function POST(request: NextRequest): Promise<NextResponse> {
//     try {
//         const email = (await currentUser())?.emailAddresses[0].emailAddress;
//         if (!email) {
//             return NextResponse.json({ error: "user not available" }, { status: NOT_FOUND_STATUS });
//         }

//         const user = await prisma.user.findUnique({ where: { email } });
//         if (!user) {
//             return NextResponse.json({ error: "user not found" }, { status: NOT_FOUND_STATUS });
//         }

//         const files = (await request.formData()).getAll("files").filter(file => file instanceof File) as File[];
//         if (files.length === 0) {
//             return NextResponse.json({ error: "No files provided" }, { status: BAD_REQUEST_STATUS });
//         }

//         const images: Promise<Image | NextResponse>[] = files.map(async (file) => {
//             const filename = `${file.name}-${uuidv4()}`;
//             const filepath = await uploadFile(file, filename);
//             return {
//                 url: filepath,
//                 size: file.size,
//                 filename: filename,
//                 width: 100,
//                 height: 100,
//                 userId: user.id,
//             };
//         });

//         const imagesResolved = await Promise.all(images);
//         const validImages = imagesResolved.filter((image): image is Image => image.url !== undefined);


//         const createdImages = await prisma.image.createMany({
//             data: validImages.map(image => ({
//                 url: image.url as string,
//                 size: image.size,
//                 filename: image.filename,
//                 width: image.width,
//                 height: image.height,
//                 userId: image.userId,
//             })),
//         });
//         return NextResponse.json(createdImages);
//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             return NextResponse.json({ error: `Error: ${error.message}` }, { status: SERVER_ERROR_STATUS });
//         }
//         return NextResponse.json({ error: "An unknown error occurred" }, { status: SERVER_ERROR_STATUS });
//     }
// }

import { prisma } from '@/lib/prisma';
import supabase from '@/lib/supabase';
import { currentUser } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from "uuid";



const NOT_FOUND_STATUS = 404;
const SERVER_ERROR_STATUS = 500;
const BAD_REQUEST_STATUS = 400;
const CACHE_CONTROL = "3600";

async function uploadFile(file, filename) {
    const { data, error } = await supabase.storage
        .from("docscanwiz")
        .upload(filename, file, {
            cacheControl: CACHE_CONTROL,
            upsert: false,
        });
    if (error) {
        throw error;
    }
    return data?.path;
}

export async function POST(request) {
    try {
        const email = (await currentUser())?.emailAddresses[0].emailAddress;
        if (!email) {
            return NextResponse.json({ error: "user not available" }, { status: NOT_FOUND_STATUS });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ error: "user not found" }, { status: NOT_FOUND_STATUS });
        }

        const files = (await request.formData()).getAll("files").filter(file => file);
        if (files.length === 0) {
            return NextResponse.json({ error: "No files provided" }, { status: BAD_REQUEST_STATUS });
        }

        const images = files.map(async (file) => {
            const filename = `${file.name}-${uuidv4()}`;
            const filepath = await uploadFile(file, filename);
            return {
                url: filepath,
                size: file.size,
                filename: filename,
                width: 100,
                height: 100,
                userId: user.id,
            };
        });

        const imagesResolved = await Promise.all(images);
        const validImages = imagesResolved.filter((image) => image.url !== undefined);


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
    } catch (error) {
        if (error) {
            return NextResponse.json({ error: `Error: ${error.message}` }, { status: SERVER_ERROR_STATUS });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: SERVER_ERROR_STATUS });
    }
}
