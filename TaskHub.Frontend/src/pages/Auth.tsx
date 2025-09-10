import React, { useState } from "react";
import { Input, Button, Card, Divider } from "@heroui/react";
import axios from "axios";

const API_URL = "http://localhost:5050/api";

export default function AuthPage({
    onAuth,
}: {
    onAuth: (token: string) => void;
}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const endpoint = isLogin ? "/users/login" : "/users/register";
        setIsError(false);
        try {
            const response = await axios.post(`${API_URL}${endpoint}`, {
                username,
                password,
            });
            const data = response.data;
            setMessage(isLogin ? "Login successful" : "Registration successful");
            setIsError(false);
            if (data.token) {
                localStorage.setItem("token", data.token);
                onAuth(data.token);
            }
        } catch (err) {
            setIsError(true);
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    setMessage(err.response.data?.message || "Error");
                } else {
                    setMessage("Network error");
                }
            } else {
                setMessage("Network error");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
            <Card className="w-96 p-8 m-10 shadow-xl">
                <h2 className="mb-4 text-center font-bold text-2xl">
                    {isLogin ? "Sign In" : "Sign Up"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mb-4"
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-4"
                        required
                    />
                    <Button
                        type="submit"
                        color="primary"
                        className="w-full mb-2"
                    >
                        {isLogin ? "Sign In" : "Sign Up"}
                    </Button>
                    <Divider className="my-4" />
                    <Button
                        variant="light"
                        color="secondary"
                        onPress={() => setIsLogin(!isLogin)}
                        className="w-full"
                    >
                        {isLogin
                            ? "Don't have an account? Sign Up"
                            : "Already have an account? Sign In"}
                    </Button>
                </form>
                {message && (
                    <p
                        className={`mt-4 text-center ${isError ? "text-red-500" : "text-green-600"}`}
                    >
                        {message}
                    </p>
                )}
            </Card>
        </div>
    );
}
