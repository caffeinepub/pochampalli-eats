import { Button } from "@/components/ui/button";
import { Menu, User, UtensilsCrossed, X } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();

  const navLinks = [
    { label: "Explore", href: "#explore" },
    { label: "Book a Table", href: "#services" },
    { label: "Best Offers", href: "#offers" },
    { label: "For Business", href: "#business" },
  ];

  const isLoggedIn = loginStatus === "success" && !!identity;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <UtensilsCrossed className="w-4 h-4 text-white" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-sm text-foreground tracking-wide">
                Pochampalli
              </div>
              <div className="text-xs text-primary font-semibold">Food 🍽️</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <Button
                variant="outline"
                size="sm"
                onClick={clear}
                data-ocid="header.logout_button"
                className="hidden md:flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span className="text-xs">
                  {identity.getPrincipal().toString().slice(0, 8)}…
                </span>
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={login}
                disabled={loginStatus === "logging-in"}
                data-ocid="header.login_button"
                className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary/90 text-white"
              >
                <User className="w-4 h-4" />
                Login / Signup
              </Button>
            )}
            <button
              type="button"
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-ocid="header.mobile_menu_button"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-foreground px-2 py-1"
                >
                  {link.label}
                </a>
              ))}
              {isLoggedIn ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clear}
                  className="mt-2"
                >
                  Logout
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={login}
                  className="mt-2 bg-primary text-white"
                >
                  Login / Signup
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
