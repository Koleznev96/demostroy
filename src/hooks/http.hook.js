import {useState, useCallback, useContext} from 'react';
import {AuthContext} from "../context/authContext";

export const useHttp = () => {
    const auth = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);

        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }
            // console.log('6666-', url)
            let response = await fetch(url, {method, body, headers})

            if (!response.ok && response.status === 401) {
                auth.logout();
            }
            
            let data = await response.json();
            // console.log('ooo-', data)
            if (!response.ok && data.message === "Неверный логин или пароль") {
                auth.logout();
            }
            if (!response.ok) {
                if (data.type)
                    throw setError(data);
                else
                    throw new Error(data.message || 'Что-то пошло не так');
            }

            setLoading(false);

            return data
        } catch (e) {
            // console.log('8888-', e)
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError }
}