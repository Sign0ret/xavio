"use client";

import { logout } from "@/actions/logout";
import { useRouter } from 'next/navigation'
interface LogoutButtonProps {
    children?: React.ReactNode;
};

export const LogoutButton = ({
    children
}: LogoutButtonProps) => {
    const router = useRouter()
    const onClick = () => {
        logout()
        router.push('/')
    };

    return (
        <span onClick={onClick} className="cursor-pointer rounded-md bg-red-600 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-red-600 h-8 mx-28">
            {children}
        </span>
    );
};