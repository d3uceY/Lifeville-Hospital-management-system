import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const AuthContext = createContext({
    user: null,
    accessToken: null,
    login: async () => { },
    logout: () => { },
    loading: true,
});

export function AuthProvider({ children }) {
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
        await axios.post(`${apiUrl}/api/auth/logout`, {}, { withCredentials: true });
        setAccessToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ accessToken, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
