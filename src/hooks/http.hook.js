import {useState, useCallback, useContext} from 'react';
import {AuthContext} from "../context/authContext";

export const useHttp = () => {
    const auth = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);

        // if (auth.url_str) {
        //     url = auth.url_str + url;
        // }
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }
            // console.log('url-', url);
            let response = await fetch(url, {method, body, headers})

            if (!response.ok && response.status === 401) {
                auth.logout();
            }
            
            let data = await response.json()
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
            // console.log("e-", e)
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError }
}