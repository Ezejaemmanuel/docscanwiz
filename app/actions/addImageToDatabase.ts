import { prisma } from "./../../lib/prisma";

type AddImageProps = {
    filepath: string;
    filesize: number;
    email: string;
    filename: string;
};

async function addImageToDatabase({ filepath, filesize, email, filename }: AddImageProps) {
    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            throw new Error(`User with email ${email} not found`);
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
        return user;
    } catch (error) {
        console.error("Error adding image to database:", error);
    } finally {
        await prisma.$disconnect();
    }
}

export default addImageToDatabase;
