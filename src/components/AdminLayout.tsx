import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Server, Users, CreditCard, Settings, UserPlus, List, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export function AdminLayout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { label: "ساخت نماینده", path: "/admin/create-agent", icon: UserPlus },
        { label: "کاربران", path: "/admin/users", icon: Users },
        { label: "سرویس ها", path: "/admin/services", icon: Settings },
        { label: "تراکنش ها", path: "/admin/transactions", icon: CreditCard },
        { label: "مدیریت شارژ پنل", path: "/admin/amounts", icon: Database },
        { label: "لیست کانفیگ ها", path: "/admin/configs", icon: List },
        { label: "سرور ها", path: "/admin/servers", icon: Server },
    ];

    const handleLogout = () => {
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Desktop Navbar */}
            <nav className="hidden lg:flex items-center justify-between px-6 py-4 glass-card border-b border-border/50 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <img src={logo} alt="Everest VPN" className="w-14 h-14 object-contain" />
                    <span className="text-xl font-bold text-foreground">مدیریت</span>
                </div>

                <div className="flex items-center gap-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${isActive
                                    ? "bg-primary/20 text-primary border border-primary/30"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-sm font-bold">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>

                <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-2 text-base font-semibold"
                >
                    <LogOut className="w-5 h-5" />
                    <span>خروج</span>
                </Button>
            </nav>

            {/* Mobile Navbar */}
            <nav className="lg:hidden flex items-center justify-between px-4 py-3 glass-card border-b border-border/50 sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="Everest VPN" className="w-12 h-12 object-contain" />
                    <span className="font-bold text-foreground">مدیریت</span>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 top-14 z-40 bg-background/95 backdrop-blur-xl animate-fade-in">
                    <div className="flex flex-col p-4 gap-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-4 rounded-xl transition-all ${isActive
                                        ? "bg-primary/20 text-primary border border-primary/30"
                                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="text-base font-semibold">{item.label}</span>
                                </Link>
                            );
                        })}
                        <hr className="border-border my-2" />
                        <Button
                            variant="ghost"
                            onClick={() => {
                                handleLogout();
                                setMobileMenuOpen(false);
                            }}
                            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-3 px-4 text-base font-semibold"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>خروج</span>
                        </Button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                <Outlet />
            </main>
        </div>
    );
}
