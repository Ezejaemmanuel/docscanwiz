import getCurrentUser from '@/app/actions/getCurrentUser';
import { prisma } from '@/lib/prisma';
import supabase from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
    const email = await getCurrentUser() as unknown as string;
    const formData = await request.formData();
    const files = formData.getAll("files") as File[] | null;
    const generalId = uuidv4();
    if (files) {
        for (const file of files) {
            const filename = `${file.name}-${uuidv4()}`;
            const filesize = file.size;
            const filetype = file.type;
            const { data, error } = await supabase.storage
                .from("docscanwiz")
                .upload(filename, file, {
                    cacheControl: "3600",
                    upsert: false,
                });
            const filepath = data?.path as unknown as string;
            console.log(filepath);

            if (error) {
                return NextResponse.json({ error: `The is an Error here ${error.message}` }, { status: 500 });

            }
            try {
                const user = await prisma.user.findUnique({
                    where: { email: email },
                });

                if (!user) {
                    return NextResponse.json({ error: "user not available" }, { status: 404 });

                }

                const image = await prisma.image.create({
                    data: {
                        url: filepath,
                        size: filesize,
                        filename: filename,
                        width: 100,
                        height: 100,
                        user: {
                            connect: { id: user.id },
                        },
                    },
                });

                console.log("Image added to database:", image);
                return NextResponse.json(image);

            } catch (error) {
                console.error("Error adding image to database:", error);
            } finally {
                await prisma.$disconnect();
            }
        }



    } else {
        return NextResponse.json({ error: "user not available" }, { status: 404 });

    }
}