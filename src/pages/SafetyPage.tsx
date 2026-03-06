import { Shield, IdCard, Clock, AlertTriangle, DoorOpen, Headphones, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

const rules = [
  {
    icon: IdCard,
    title: "ID Card Mandatory",
    description: "Students must carry and display their valid college ID card while boarding and traveling on the bus.",
  },
  {
    icon: DoorOpen,
    title: "No Standing Near Doors",
    description: "Never stand near the entrance or exit doors while the bus is in motion. Remain seated at all times.",
  },
  {
    icon: Clock,
    title: "Be On Time",
    description: "Arrive at your boarding point at least 5 minutes before the scheduled pickup time. Buses will not wait.",
  },
  {
    icon: AlertTriangle,
    title: "No Leaning Out",
    description: "Do not lean out of windows or extend any body part outside the bus while it is moving or stationary.",
  },
  {
    icon: BadgeCheck,
    title: "Follow Driver Instructions",
    description: "Always follow the instructions given by the bus driver or transport coordinator for your safety.",
  },
  {
    icon: Headphones,
    title: "Maintain Discipline",
    description: "Avoid loud music, shouting, or any behavior that may distract the driver. Keep the bus clean.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, scale: 0.8, y: 50, rotateX: -10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: i * 0.1, type: "spring" as const, stiffness: 100, damping: 12, mass: 1 },
  }),
};

export default function SafetyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-1.5 text-xs font-semibold text-destructive">
          <Shield className="h-3.5 w-3.5 animate-bounce-soft" /> Safety Guidelines
        </div>
        <h1 className="mb-2 text-3xl font-bold text-foreground">Bus Safety Rules</h1>
        <p className="text-sm text-muted-foreground">
          Your safety is our priority. Please follow these guidelines during your commute.
        </p>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2">
        {rules.map((rule, i) => (
          <motion.div
            key={rule.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            whileHover={{ y: -6, boxShadow: "0 20px 40px -12px hsl(142 40% 30% / 0.15)" }}
            className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all cursor-default group"
          >
            <rule.icon className={`mb-3 h-7 w-7 transition-transform group-hover:scale-110 group-hover:-rotate-6 ${rule.title === "ID Card Mandatory" ? "text-green-500" : "text-primary"}`} />
            <h3 className="mb-2 text-base font-bold text-foreground">{rule.title}</h3>
            <p className="text-sm text-muted-foreground">{rule.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-10 rounded-2xl bg-gradient-hero p-6 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.12),_transparent_70%)]" />
        <div className="relative">
          <Shield className="mx-auto mb-3 h-8 w-8 text-primary-foreground animate-bounce-soft" />
          <h3 className="mb-2 text-lg font-bold text-primary-foreground">Emergency Contact</h3>
          <p className="text-sm text-primary-foreground/80">
            In case of any emergency, contact the Transport Office immediately.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
