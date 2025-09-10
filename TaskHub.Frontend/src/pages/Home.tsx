
import { useState, useEffect } from 'react';
import CalendarView from './CalendarView';
import AuthPage from './Auth';

export default function Home() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    const handleAuth = (newToken: string) => {
        setToken(newToken);
    };

    return token ? (
        <CalendarView />
    ) : (
        <AuthPage onAuth={handleAuth} />
    );
}
