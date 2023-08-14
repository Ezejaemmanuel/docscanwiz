
import { prisma } from '@/lib/prisma';
import supabase from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from "uuid";
import { auth } from "@clerk/nextjs";

export async function POST(request) {
    try {
        const email = auth().user?.emailAddresses[0].emailAddress
        console.log(`Email: ${email}`);
        if (!email) {
            return NextResponse.json({ error: "user not available" }, { status: 404 });
        }

        // Find the user with the given email
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "user not found" }, { status: 404 });
        }

        // Use the user's id as the userId
        const userId = user.id;

        const formData = await request.formData();
        console.log(`Form Data: ${JSON.stringify(formData)}`);
        const files = formData.getAll("files");
        console.log(`Files: ${files.length}`);
        if (files.length > 0) {
            const images = await Promise.all(files.map(async (file) => {
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
                    const imageData = data; // or const imageData: unknown = data;
                    filepath = imageData?.path;
                    console.log(`File path: ${filepath}`);
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
                    userId: userId,
                };
            }));

            const validImages = images.filter(image => !image.error);
            const errorImage = images.find(image => image.error);
            console.log(`Valid images: ${validImages}`);
            console.log(`Error image: ${errorImage}`);
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
            console.log(`Created images: ${createdImages}`);
            return NextResponse.json(createdImages);
        } else {
            return NextResponse.json({ error: "No files provided" }, { status: 400 });
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return NextResponse.json({ error: `Error: ${error.message}` }, { status: 500 });
    }
}
