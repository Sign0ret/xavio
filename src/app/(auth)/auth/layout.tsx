
const AuthLayout = ({ 
    children 
}: { 
    children: React.ReactNode 
}) => {
    return (
        <div className="h-full min-h-screen flex items-center justify-center pt-[100px]">
            {children}
        </div>
    );
}

export default AuthLayout;