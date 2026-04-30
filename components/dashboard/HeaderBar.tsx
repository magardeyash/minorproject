'use client';

import { Search, Bell } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface HeaderBarProps {
    pageTitle?: string;
    userName?: string;
    userAvatar?: string;
    searchPlaceholder?: string;
    showNotification?: boolean;
}

export default function HeaderBar({
    pageTitle,
    userName = 'Sarah Jenkins',
    userAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    searchPlaceholder = 'Search ideas, talent, scores...',
    showNotification = true,
}: HeaderBarProps) {
    const pathname = usePathname();
    
    let displayTitle = pageTitle;
    if (!displayTitle) {
        if (pathname === '/dashboard/founder') displayTitle = 'Founder Workspace';
        else if (pathname === '/dashboard/founder/ideas') displayTitle = 'My Ideas';
        else if (pathname === '/dashboard/founder/ideas/new') displayTitle = 'Submit New Idea';
        else if (pathname === '/dashboard/founder/applicants') displayTitle = 'Applicants';
        else displayTitle = 'Dashboard';
    }
    return (
        <header className="h-20 flex items-center justify-between px-10 border-b border-white/5 bg-[#213722]/60 backdrop-blur-md sticky top-0 z-40">
            <div className="flex items-center gap-6">
                <h1 className="clash text-xl font-medium tracking-tight text-white">{pageTitle}</h1>
            </div>

            <div className="flex items-center gap-6">
                {/* Search Bar */}
                <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 w-80 group focus-within:border-[#EAED87]/50 transition-all">
                    <Search className="text-white/30 group-focus-within:text-[#EAED87] w-4 h-4" />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        className="bg-transparent border-none outline-none text-sm ml-3 w-full placeholder:text-white/20 text-white"
                    />
                </div>



                {/* Divider */}
                <div className="h-10 w-px bg-white/10 mx-2"></div>

                {/* User Profile */}
                <div className="flex items-center gap-3 pl-2 cursor-pointer">
                    <div className="text-right">
                        <p className="text-sm font-semibold text-white">{userName}</p>
                        <p className="text-[10px] text-[#EAED87] font-medium uppercase tracking-wider">Premium Founder</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#EAED87] to-[#F86624] p-[2px]">
                        <img
                            src={userAvatar}
                            alt="Profile"
                            className="w-full h-full rounded-full bg-[#213722]"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}