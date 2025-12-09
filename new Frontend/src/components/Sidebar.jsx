"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, Moon, Sun, LayoutDashboard, FileText, BookOpen, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [dark, setDark] = useState(false);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl z-50 flex flex-col transition-all`}
    >
      {/* PROFILE SECTION */}
      <div className="p-6 flex flex-col items-center border-b dark:border-gray-700">
        <div className="h-16 w-16 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xl font-bold shadow-lg">
          {user?.name?.[0] || "U"}
        </div>
        <h2 className="mt-3 font-semibold text-gray-800 dark:text-gray-200 text-center">
          {user?.name || "User"}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{user?.role}</p>
      </div>

      {/* MENU LINKS */}
      <nav className="flex-1 px-4 py-6 space-y-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium"
        >
          <LayoutDashboard size={20} /> Dashboard
        </Link>

        <Link
          href="/subjects"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium"
        >
          <BookOpen size={20} /> Subjects
        </Link>

        <Link
          href="/results"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium"
        >
          <FileText size={20} /> Results
        </Link>
      </nav>

      {/* DARK MODE + LOGOUT */}
      <div className="p-4 border-t dark:border-gray-700 space-y-3">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="w-full flex items-center justify-between bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200"
        >
          <span>{dark ? "Light Mode" : "Dark Mode"}</span>
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
}
