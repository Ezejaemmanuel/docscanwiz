import { currentUser } from '@clerk/nextjs';

export default async function getCurrentUser() {
    const user = await currentUser();
    if (!user) return null;
    const emailAdrr = user.emailAddresses[0];
    const email = emailAdrr.toString();
    return email;
}
