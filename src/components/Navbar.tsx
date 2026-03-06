import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Bus Routes", path: "/routes" },
  { label: "Safety Rules", path: "/safety" },
  { label: "Feedback", path: "/feedback" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${scrolled
          ? "border-border bg-card/95 backdrop-blur-xl shadow-lg"
          : "border-transparent bg-card/80 backdrop-blur-md"
        }`}
    >
      {/* Animated glow border at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] animate-nav-glow" style={{ background: "linear-gradient(90deg, transparent, #FFD700, #1a237e, #FFD700, transparent)" }} />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.img
            src="/dace-logo.png"
            alt="DACE Logo"
            className="h-10 w-auto"
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight text-foreground group-hover:text-primary transition-colors">Dhaanish Chennai</span>
            <span className="text-[10px] font-medium leading-tight text-muted-foreground">College Transport</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${location.pathname === item.path
                  ? "text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              style={location.pathname === item.path ? { backgroundColor: "#1a237e" } : undefined}
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 h-[3px] w-6 rounded-full"
                  style={{ backgroundColor: "#FFD700" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-muted-foreground hover:bg-secondary md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-border bg-card md:hidden"
          >
            <div className="flex flex-col gap-1 p-3">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${location.pathname === item.path
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary"
                      }`}
                    style={location.pathname === item.path ? { backgroundColor: "#1a237e" } : undefined}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
