import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "../ui/button";


const ButtonComponent: React.FC = () => {
    return (



        <Button className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
            <div className="mr-2 h-4 w-4">
                <RegisterLink>Sign up</RegisterLink>
            </div>
        </Button>
    );
};

export default ButtonComponent;
