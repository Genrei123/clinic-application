import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const RequireAuth: React.FC<{children: React.ReactNode }> =  ({ children }) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            toast.error("You need to be logged in to view this page.");
            navigate("/login");
        } 
    }, [])

    return <>{children}</>;
}