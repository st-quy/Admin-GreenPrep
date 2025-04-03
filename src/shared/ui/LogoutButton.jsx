// @ts-nocheck
import logoutIcon from "@assets/icons/log-out.png"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query";
import { AuthApi, AUTH_QUERY_KEYS } from "@features/auth/api";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function LogoutButton() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const logoutMutation = useMutation({
        mutationKey: [AUTH_QUERY_KEYS.USER_LOGOUT],
        mutationFn: AuthApi.logout,
        onMutate: () => {
            setIsLoggingOut(true);
        },
        onSuccess: () => {
            
            queryClient.clear();
            message.success("Log out successfully!");
            navigate('/login', { 
                replace: true,
                state: { from: 'logout' } 
            });
        },
        onError: (error) => {
            console.error("Logout error:", error);
            message.error("There was an error logging out, but you have been logged out.");

            queryClient.clear();
            navigate('/login', { 
                replace: true,
                state: { from: 'logout' } 
            });
        },
        onSettled: () => {
            setIsLoggingOut(false);
        }
    });

    const handleLogout = () => {
        if (!isLoggingOut) {
            logoutMutation.mutate();
        }
    };

    return (
        <img 
            src={logoutIcon} 
            alt="Logout"    
            title="Logout"
            onClick={handleLogout}
            className={`w-[30px] h-[30px] cursor-pointer hover:opacity-80 transition-opacity ${isLoggingOut ? 'opacity-50 pointer-events-none' : ''}`}
        />
    );
}