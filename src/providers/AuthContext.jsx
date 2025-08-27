import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const apiUrl = import.meta.env.VITE_API_URL;

const AuthContext = createContext({
    user: null,
    accessToken: null,
    login: async () => { },
    logout: () => { },
    loading: true,
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                const resp = await axios.post(`${apiUrl}/api/auth/refresh`, {}, { withCredentials: true });
                setAccessToken(resp.data.access_token);
                setUser(resp.data.user || null);
            } catch { }
            setLoading(false);
        })();
    }, []);

    const login = async (email, password) => {
        const { data } = await axios.post(`${apiUrl}/api/auth/login`, { email, password }, { withCredentials: true });
        setAccessToken(data.access_token);
        setUser(data.user);
    };

    const logout = async () => {
        try {
            toast.loading("Logging out...")
            await axios.post(`${apiUrl}/api/auth/logout`,
                {},
                {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
            toast.success("Logged out successfully")
            setAccessToken(null);
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "An error occurred")
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

