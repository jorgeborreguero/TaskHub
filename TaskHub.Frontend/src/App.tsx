import TaskHubHeader from "./components/TaskHubHeader";
import AuthPage from "./pages/Auth";
import { useState } from "react";
import AppRoutes from "./router/AppRoutes";
import SpaceBackground from "./components/SpaceBackground";


function App() {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token"),
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <>
            <SpaceBackground />
            <TaskHubHeader onLogout={handleLogout} token={token} />
            {!token ? (
                <AuthPage onAuth={setToken} />
            ) : (
                <AppRoutes />
            )}
        </>
    );
}

export default App;
