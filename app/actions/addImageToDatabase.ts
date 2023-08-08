import { prisma } from "./../../lib/prisma";

type AddImageProps = {
    filepath: string;
    size: number;
    userEmail: string;
};

async function addImageToDatabase({ filepath, size, userEmail }: AddImageProps) {
    try {
        const user = await prisma.user.findUnique({
            where: { email: userEmail },
        });

        if (!user) {
            throw new Error(`User with email ${userEmail} not found`);
        }

        const imageUrl = `https://example.com/${filepath}`; // Replace with your actual image URL

        const image = await prisma.image.create({
            data: {
                url: imageUrl,
                size: size,
                filename: "yes",
                width: 100,
                height: 100,
                user: {
                    connect: { id: user.id },
                },
            },
        });

        console.log("Image added to database:", image);
    } catch (error) {
        console.error("Error adding image to database:", error);
    } finally {
        await prisma.$disconnect();
    }
}

export default addImageToDatabase;
