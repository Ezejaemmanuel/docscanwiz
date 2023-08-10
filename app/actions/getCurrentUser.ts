import { currentUser } from '@clerk/nextjs';

export default async function getCurrentUser() {
    const user = await currentUser();
    console.log("1...this the current user", user);
    if (!user) return null;
    const emailAdrr = user.emailAddresses[0];
    console.log("2...this the user.emailAddresses[0];", emailAdrr);

    const email = emailAdrr.toString();
    console.log("2...this the user.emailAddresses[0];", emailAdrr);
    console.log("this is the type of the email that is about to be returned", typeof (email))
    return email;
}
