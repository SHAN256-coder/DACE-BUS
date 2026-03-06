import { useState, useMemo } from "react";
import { Search, Bus, Phone, User, Clock, MapPin, ChevronDown, ChevronUp, X, History } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import { busRoutes, BusRoute } from "@/data/routes";

const RECENT_SEARCHES_KEY = "dhaanish_recent_searches";
const MAX_RECENT = 8;

function getRecentSearches(): string[] {
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveSearch(query: string) {
  if (!query.trim()) return;
  const recent = getRecentSearches().filter((s) => s.toLowerCase() !== query.toLowerCase());
  recent.unshift(query.trim());
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
}

function clearRecentSearches() {
  localStorage.removeItem(RECENT_SEARCHES_KEY);
}

const searchData = busRoutes.flatMap((route) =>
  route.boardingPoints.map((bp) => ({
    routeNumber: route.routeNumber.toString(),
    driverName: route.driverName,
    vehicleNumber: route.vehicleNumber,
    boardingPoint: bp.name,
    _route: route,
  }))
);

const fuse = new Fuse(searchData, {
  keys: ["routeNumber", "boardingPoint", "driverName", "vehicleNumber"],
  threshold: 0.35,
  includeScore: true,
});

const allBoardingPoints = Array.from(
  new Set(busRoutes.flatMap((r) => r.boardingPoints.map((bp) => bp.name).filter((n) => n !== "COLLEGE")))
).sort();

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 40, rotateX: -10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.08,
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
      mass: 1
    },
  }),
};

export default function BusRoutesPage() {
  const [search, setSearch] = useState("");
  const [boardingFilter, setBoardingFilter] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>(getRecentSearches());
  const [showRecent, setShowRecent] = useState(false);

  const filteredRoutes = useMemo(() => {
    let results: BusRoute[] = busRoutes;

    if (search.trim()) {
      const fuseResults = fuse.search(search);
      const routeIds = new Set(fuseResults.map((r) => r.item._route.routeNumber));
      results = busRoutes.filter((r) => routeIds.has(r.routeNumber));
    }

    if (boardingFilter) {
      results = results.filter((r) =>
        r.boardingPoints.some((bp) => bp.name === boardingFilter)
      );
    }

    return results;
  }, [search, boardingFilter]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setShowRecent(false);
  };

  const handleSearchSubmit = () => {
    if (search.trim()) {
      saveSearch(search);
      setRecentSearches(getRecentSearches());
    }
  };

  const handleClearRecent = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Page header with gradient text */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="mb-2 text-2xl font-bold">
          <span className="text-gradient-hero">Bus Routes</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          {busRoutes.length} routes serving {allBoardingPoints.length}+ boarding points across Chennai
        </p>
      </motion.div>

      {/* Search and filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-6 flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search route, stop, or driver..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowRecent(true)}
            onBlur={() => setTimeout(() => setShowRecent(false), 200)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearchSubmit();
            }}
            className="w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 input-focus-glow transition-all"
          />

          {/* Recent searches dropdown */}
          <AnimatePresence>
            {showRecent && recentSearches.length > 0 && !search && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                className="absolute left-0 right-0 top-full z-20 mt-1.5 rounded-xl border border-border bg-card p-2 shadow-elevated"
              >
                <div className="mb-1.5 flex items-center justify-between px-2">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <History className="h-3 w-3" /> Recent Searches
                  </span>
                  <button
                    onClick={handleClearRecent}
                    className="text-xs text-destructive hover:underline"
                  >
                    Clear
                  </button>
                </div>
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onMouseDown={() => {
                      handleSearch(term);
                      saveSearch(term);
                      setRecentSearches(getRecentSearches());
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-foreground hover:bg-secondary transition-colors"
                  >
                    <History className="h-3.5 w-3.5 text-muted-foreground" />
                    {term}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <select
          value={boardingFilter}
          onChange={(e) => setBoardingFilter(e.target.value)}
          className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
        >
          <option value="">All Boarding Points</option>
          {allBoardingPoints.map((bp) => (
            <option key={bp} value={bp}>{bp}</option>
          ))}
        </select>
      </motion.div>

      {/* Active filters */}
      {(search || boardingFilter) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 flex flex-wrap items-center gap-2"
        >
          <span className="text-xs text-muted-foreground">Filters:</span>
          {search && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              "{search}"
              <button onClick={() => setSearch("")}>
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {boardingFilter && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              {boardingFilter}
              <button onClick={() => setBoardingFilter("")}>
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          <span className="text-xs text-muted-foreground">— {filteredRoutes.length} route(s) found</span>
        </motion.div>
      )}

      {/* Route cards */}
      <div className="space-y-4">
        {filteredRoutes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-border bg-card p-12 text-center"
          >
            <Bus className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="text-sm font-medium text-muted-foreground">No routes found</p>
            <p className="text-xs text-muted-foreground">Try a different search term or filter</p>
          </motion.div>
        )}

        {filteredRoutes.map((route, i) => (
          <motion.div
            key={route.routeNumber}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={cardVariants}
            layout
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-card card-hover"
          >
            {/* Header */}
            <button
              onClick={() => {
                setExpanded(expanded === route.routeNumber ? null : route.routeNumber);
              }}
              className="flex w-full items-center justify-between p-5 text-left hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-hero text-lg font-bold text-primary-foreground shadow-md"
                >
                  {route.routeNumber}
                </motion.div>
                <div>
                  <p className="text-sm font-bold text-foreground">Route {route.routeNumber}</p>
                  <p className="text-xs text-muted-foreground">{route.vehicleNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden items-center gap-4 sm:flex">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <User className="h-3.5 w-3.5" /> {route.driverName}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {route.boardingPoints.length} stops
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                    <Clock className="h-3 w-3" /> {route.arrivalTime}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: expanded === route.routeNumber ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </motion.div>
              </div>
            </button>

            {/* Expanded content */}
            <AnimatePresence>
              {expanded === route.routeNumber && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border p-5">
                    {/* Driver info on mobile */}
                    <div className="mb-4 flex flex-wrap gap-3 sm:hidden">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <User className="h-3.5 w-3.5" /> {route.driverName}
                      </span>
                      <a
                        href={`tel:${route.driverPhone}`}
                        className="flex items-center gap-1.5 text-xs text-primary"
                      >
                        <Phone className="h-3.5 w-3.5" /> {route.driverPhone}
                      </a>
                    </div>

                    {/* Driver card */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="mb-5 flex items-center gap-3 rounded-xl bg-secondary/50 p-3"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{route.driverName}</p>
                        <a href={`tel:${route.driverPhone}`} className="flex items-center gap-1 text-xs text-primary hover:underline">
                          <Phone className="h-3 w-3" /> {route.driverPhone}
                        </a>
                      </div>
                    </motion.div>

                    {/* Boarding points */}
                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Boarding Points
                    </h4>
                    <div className="space-y-0">
                      {route.boardingPoints.map((bp, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          className="flex items-center gap-3 border-l-2 border-primary/20 py-2 pl-4 last:border-primary hover:bg-secondary/20 transition-colors rounded-r-lg"
                        >
                          <div className={`h-2.5 w-2.5 rounded-full transition-all ${idx === route.boardingPoints.length - 1 ? "bg-primary scale-125" : "bg-primary/30"}`} />
                          <span className="flex-1 text-sm text-foreground">{bp.name}</span>
                          <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                            {bp.time}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
