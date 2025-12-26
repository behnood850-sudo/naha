import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

export function PublicHeader() {
  const location = useLocation();

  return (
    <header className="p-4 relative z-10">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Everest VPN" className="h-10 w-auto" />
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className={`font-medium transition-colors ${
              location.pathname === "/" 
                ? "text-primary" 
                : "text-foreground hover:text-primary"
            }`}
          >
            صفحه اصلی
          </Link>
          <Link
            to="/search"
            className={`font-medium transition-colors ${
              location.pathname === "/search" 
                ? "text-primary" 
                : "text-foreground hover:text-primary"
            }`}
          >
            جستجو
          </Link>
          <Link
            to="/login"
            className={`font-medium transition-colors ${
              location.pathname === "/login" 
                ? "text-primary" 
                : "text-foreground hover:text-primary"
            }`}
          >
            ورود
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            ثبت نام
          </Link>
        </div>
      </nav>
    </header>
  );
}