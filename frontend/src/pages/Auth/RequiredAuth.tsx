import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const RequireAuth: React.FC<{children: React.ReactNode }> =  ({ children }) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    if (!isLoggedIn()) {
        alert("You need to be logged in to view this page.");
        navigate("/login");
        return null;
    } else {
        return <>{children}</>;
    }
}