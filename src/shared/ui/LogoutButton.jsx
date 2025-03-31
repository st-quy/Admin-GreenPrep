import logoutIcon from "@assets/icons/log-out.png"
import { useNavigate } from "react-router-dom"

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
 
        navigate('/login');
    };

    return (
        <img 
            src={logoutIcon} 
            alt="Logout"
            title="Logout"
            onClick={handleLogout}
            className="w-[30px] h-[30px] cursor-pointer hover:opacity-80 transition-opacity"
        />
    );
}