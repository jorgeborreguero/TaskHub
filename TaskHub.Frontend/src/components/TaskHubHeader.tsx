import React from "react";
import { Button } from "@heroui/react";
import { FiLogOut, FiCalendar } from "react-icons/fi";

interface TaskHubHeaderProps {
    onLogout: () => void;
    token: string | null;
}

const TaskHubHeader: React.FC<TaskHubHeaderProps> = ({ onLogout, token }) => (
    <header className="sticky top-0 z-10 w-full py-6 px-8 flex items-center justify-between backdrop-blur-lg bg-white/10 border-b border-white/20 shadow-xl">
        <div className="flex items-center gap-3">
            <FiCalendar className="text-4xl text-white drop-shadow-lg" />
            <span className="text-3xl font-extrabold text-white tracking-wide drop-shadow-lg">
                TaskHub
            </span>
        </div>
        {token && (
            <Button
                color="secondary"
                className="flex items-center gap-2 bg-white/20 text-white border-white border px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
                onPress={onLogout}
            >
                <FiLogOut className="text-xl" />
                <span className="font-semibold">Log out</span>
            </Button>
        )}
    </header>
);

export default TaskHubHeader;
