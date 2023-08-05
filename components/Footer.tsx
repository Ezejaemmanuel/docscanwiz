import { AiOutlineMessage, AiOutlineMail, AiOutlinePhone } from './DynamicPackages/OptimizeIcons';

const ContactUs: React.FC = () => {
    const sections = [
        {
            title: '24/7 Support',
            description: 'Our support team is available around the clock to assist with any questions or issues. You can chat with us anytime by clicking on the chat icon at the bottom right corner of this page.',
            icon: <AiOutlineMessage />,
        },
        {
            title: 'Email',
            description: 'Feel free to email us at any time with questions or concerns. Our email address is info@documentwizard.com. We will get back to you as soon as possible.',
            icon: <AiOutlineMail />,
        },
        {
            title: 'Phone',
            description: 'Our phone lines are open during regular business hours to take calls. You can call us at 1-555-555-5555 from Monday to Friday, 9 AM to 5 PM (GMT).',
            icon: <AiOutlinePhone />,
        },
    ];

    return (
        <div className="dark:bg-gray-900 dark:text-white bg-gray-100 text-gray-800">
            <title>Contact Us - Document Wizard</title>

            <nav className="container mx-auto px-4 py-8">
                <a href="/" className="inline-block text-yellow">
                    {/* <Image src="/logo.png" alt="Document Wizard Logo" width={64} height={64} /> */}
                    DocScan
                </a>
            </nav>

            <main className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row">
                    {sections.map((section, index) => (
                        <section key={index} className="flex flex-col lg:flex-row items-center justify-center gap-4 mt-8 lg:w-1/3">
                            <div className="flex items-center justify-center">
                                {section.icon}
                                <div className="ml-2 text-xl font-bold text-center">
                                    {section.title}
                                </div>
                            </div>
                            <div className="text-base font-normal text-center">
                                {section.description}
                            </div>
                        </section>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ContactUs;
