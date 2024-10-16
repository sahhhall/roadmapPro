import { LayoutDashboard, Users, MapPin } from "lucide-react";

export const sidebarItems = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin/",
    },
    {
        name: "User Management",
        icon: Users,
        path: "/admin/user-management",
    },
    {
        name: "Roadmap Management",
        icon: MapPin,
        path: "/admin/roadmap-management",
    }
];
