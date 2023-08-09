import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server'

export async function GET() {

    //  async function confirmOrCreate() {
    const user = await currentUser();
    if (!user) return NextResponse.json({ data: null });
    const emailArray = user?.emailAddresses[0];
    const email = emailArray.toString();
    const username = user?.username as unknown as string;

    try {
        //const email = emailAddresses[0]; // Assuming you want to use the first email address in the array
        const user = await prisma.user.upsert({
            where: { email },
            update: { username },
            create: { email, username },
        });
        return NextResponse.json({ user });
    } catch (error) {
        console.log('Error upserting user:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }

}