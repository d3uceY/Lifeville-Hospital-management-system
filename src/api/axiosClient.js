import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from '../providers/AuthContext';
const apiUrl = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
    baseURL: `${apiUrl}/api`,
    withCredentials: true,
});

export function useAxios() {
    const { accessToken, login, logout } = useAuth();

    useEffect(() => {
        const req = axiosClient.interceptors.request.use((config) => {
            if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
            return config;
        });

        const res = axiosClient.interceptors.response.use(
            res => res,
            async (error) => {
                const orig = error.config;
                if (error.response && error.response.status === 401 && !orig._retry) {
                    orig._retry = true;
                    try {
                        const { data } = await axios.post(`/api/auth/refresh`, {}, { withCredentials: true });
                        login(data.user.email, /* bypass re-login or handle accessToken only *//* pass new access only */);
                        orig.headers.Authorization = `Bearer ${data.access_token}`;
                        return axiosClient(orig);
                    } catch {
                        logout();
                    }
                }
                return Promise.reject(error);
            },
        );

        return () => {
            axiosClient.interceptors.request.eject(req);
            axiosClient.interceptors.response.eject(res);
        };
    }, [accessToken, login, logout]);

    return axiosClient;
}
