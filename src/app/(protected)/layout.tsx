import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
};

const ProtectedLayout = ({children}: ProtectedLayoutProps) => {
    return (
        <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white-400 to-black-800">
            {/* <Navbar /> */}
            <div className="max-h-[400px]">
                {children}
            </div>
        </div>
    )
}

export default ProtectedLayout;