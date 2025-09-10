import React from "react";

const SpaceBackground: React.FC = () => (
    <div className="absolute inset-0 z-0 pointer-events-none animate-fadein">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center opacity-40 blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-black/90"></div>
    </div>
);

export default SpaceBackground;
