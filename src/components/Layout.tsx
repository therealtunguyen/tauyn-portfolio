import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import BottomPlayer from "./BottomPlayer";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="flex-1 pb-[72px] overflow-y-auto spotify-scrollbar">
                <Outlet />
            </main>
            <BottomPlayer />
        </div>
    );
}
