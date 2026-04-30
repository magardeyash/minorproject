'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, Lightbulb, Users, BarChart3, Settings2, HelpCircle,
    Search, FileText, User, LogOut
} from 'lucide-react';
import { signOut } from 'next-auth/react';

interface SidebarNavigationProps {
    role: 'founder' | 'employee' | 'admin';
    applicantsCount?: number;
    creditUsagePercent?: number;
    creditUsageText?: string;
}

export default function SidebarNavigation({
    role,
    applicantsCount = 12,
    creditUsagePercent = 65,
    creditUsageText = '13/20 ideas',
}: SidebarNavigationProps) {
    const pathname = usePathname();

    // Different nav items based on role
    const mainNavItems =
        role === 'founder'
            ? [
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard/founder' },
                { id: 'ideas', label: 'My Ideas', icon: Lightbulb, href: '/dashboard/founder/ideas' },
                { id: 'applicants', label: 'Applicants', icon: Users, href: '/dashboard/founder/applicants', badge: applicantsCount },
                { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/dashboard/founder/analytics' },
            ]
            : role === 'employee'
                ? [
                    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard/employee' },
                    { id: 'browse', label: 'Browse Ideas', icon: Search, href: '/dashboard/employee/browse' },
                    { id: 'applications', label: 'My Applications', icon: FileText, href: '/dashboard/employee/applications' },
                    { id: 'profile', label: 'My Profile', icon: User, href: '/dashboard/employee/profile' },
                ]
                : [
                    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
                    { id: 'users', label: 'Users', icon: Users, href: '/admin/dashboard/users' },
                    { id: 'ideas', label: 'Ideas', icon: Lightbulb, href: '/admin/dashboard/ideas' },
                ];

    const systemNavItems = [
        { id: 'settings', label: 'Settings', icon: Settings2, href: '#' },
        { id: 'help', label: 'Support Center', icon: HelpCircle, href: '#' },
    ];

    return (
        <aside className="w-72 fixed h-full bg-[#1a2c1b] border-r border-white/5 z-50 flex flex-col">
            {/* Logo */}
            <div className="p-8 pb-10 flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center">
                    <img src="/logo.png" alt="VentureLens Logo" className="w-full h-full object-contain drop-shadow-lg" />
                </div>
                <span className="clash text-2xl font-semibold tracking-tight text-white">VentureLens</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1.5 custom-scrollbar overflow-y-auto pb-4">
                <p className="px-4 text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-4">Main Menu</p>

                {mainNavItems.map((item) => {
                    // Make exact matching for dashboard to avoid matching all sub-routes improperly
                    const isActive = item.href === '/dashboard/founder'
                        ? pathname === item.href
                        : pathname === item.href || pathname.startsWith(item.href + '/');

                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'text-[#EAED87] bg-[#EAED87]/10'
                                    : 'text-white/50 hover:text-[#EAED87] hover:bg-[#EAED87]/10'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            {item.label}
                            {item.badge !== undefined && (
                                <span className="ml-auto bg-white/10 px-2 py-0.5 rounded-md text-[10px] text-white/60">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}

                <div className="pt-8 mb-4">
                    <p className="px-4 text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-4">Account</p>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-white/50 hover:text-[#F86624] hover:bg-[#F86624]/10"
                    >
                        <LogOut className="w-5 h-5 text-[#F86624]" />
                        Log Out
                    </button>
                </div>
            </nav>

            {/* Credit Usage - Only for Founders */}
            {role === 'founder' && (
                <div className="p-4 mb-6">
                    <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] p-4 rounded-2xl">
                        <p className="text-xs font-medium text-white/40 mb-3">Credit usage</p>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#EAED87] transition-all duration-500"
                                style={{ width: `${creditUsagePercent}%` }}
                            ></div>
                        </div>
                        <p className="text-[10px] mt-2 text-white/60 flex justify-between">
                            <span>{creditUsagePercent}% used</span>
                            <span>{creditUsageText}</span>
                        </p>
                    </div>
                </div>
            )}
        </aside>
    );
}
