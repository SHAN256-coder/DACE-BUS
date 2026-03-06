import { useState } from "react";
import { MessageSquare, Send, CheckCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRoutes } from "@/hooks/useRoutes";

interface FeedbackEntry {
  id: number;
  name: string;
  routeNumber: string;
  category: string;
  description: string;
  timestamp: string;
}

const FEEDBACK_KEY = "dhaanish_feedback";

function getFeedback(): FeedbackEntry[] {
  try {
    return JSON.parse(localStorage.getItem(FEEDBACK_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveFeedback(entry: FeedbackEntry) {
  const all = getFeedback();
  all.unshift(entry);
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(all));
}

const categories = ["General", "Issue / Complaint", "Driver Behavior", "Timing", "Safety", "Suggestion"];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const massiveScaleIn = {
  hidden: { opacity: 0, scale: 0.8, y: 50, rotateX: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 12, mass: 1 },
  },
};

export default function FeedbackPage() {
  const { routes: busRoutes } = useRoutes();
  const [name, setName] = useState("");
  const [routeNumber, setRouteNumber] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !description.trim()) return;

    saveFeedback({
      id: Date.now(),
      name: name.trim() || "Anonymous",
      routeNumber,
      category,
      description: description.trim(),
      timestamp: new Date().toISOString(),
    });

    setSubmitted(true);
    setName("");
    setRouteNumber("");
    setCategory("");
    setDescription("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
          <MessageSquare className="h-3.5 w-3.5 animate-bounce-soft" /> Student Feedback
        </div>
        <h1 className="mb-2 text-3xl font-bold">
          <span className="text-gradient-hero">Share Your Feedback</span>
        </h1>
        <p className="text-sm text-muted-foreground">Help us improve our transport service</p>
      </motion.div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="mb-6 flex items-center gap-3 rounded-xl border border-success/30 bg-success/10 p-4"
          >
            <CheckCircle className="h-5 w-5 text-success" />
            <p className="text-sm font-medium text-success">Feedback submitted successfully! Thank you.</p>
            <Sparkles className="h-4 w-4 text-success animate-bounce-soft ml-auto" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.form
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-card"
      >
        <motion.div variants={massiveScaleIn}>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Name (optional)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 input-focus-glow transition-all"
          />
        </motion.div>

        <motion.div variants={massiveScaleIn}>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Bus Route Number</label>
          <select
            value={routeNumber}
            onChange={(e) => setRouteNumber(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
          >
            <option value="">Select route (optional)</option>
            {busRoutes.map((r) => (
              <option key={r.routeNumber} value={r.routeNumber}>Route {r.routeNumber}</option>
            ))}
          </select>
        </motion.div>

        <motion.div variants={massiveScaleIn}>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </motion.div>

        <motion.div variants={massiveScaleIn}>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            placeholder="Describe your feedback or issue..."
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 input-focus-glow transition-all"
          />
        </motion.div>

        <motion.button
          variants={massiveScaleIn}
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-hero py-3 text-sm font-semibold text-primary-foreground shadow-md hover:shadow-lg transition-shadow animate-glow-pulse"
        >
          <Send className="h-4 w-4" /> Submit Feedback
        </motion.button>
      </motion.form>
    </div>
  );
}
