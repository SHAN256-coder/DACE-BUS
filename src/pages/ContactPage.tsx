import { MapPin, Phone, Mail, Clock, Globe } from "lucide-react";
import { motion } from "framer-motion";

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

const contactItems = [
  { icon: MapPin, title: "Address", text: "Dhaanish Nagar, Vanchuvancherry, Padappai (Near Tambaram), Sriperumbudur Taluk, Kancheepuram District - 601 301" },
  { icon: Phone, title: "Phone", text: "+91 9962022222" },
  { icon: Mail, title: "Email", text: "info@dhaanishcollege.co.in" },
  { icon: Clock, title: "Office Hours", text: "Mon - Sat: 8:00 AM - 5:00 PM" },
  { icon: Globe, title: "Website", text: "www.dhaanishcollege.co.in" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h1 className="mb-2 text-3xl font-bold">
          <span className="text-gradient-hero">Contact Us</span>
        </h1>
        <p className="text-sm text-muted-foreground">Reach out to the Dhaanish Chennai Transport Department</p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2">
        {contactItems.map((item, i) => (
          <motion.div
            key={item.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            whileHover={{ y: -6, boxShadow: "0 20px 40px -12px hsl(220 40% 30% / 0.15)" }}
            className={`flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition-all cursor-default group ${i === contactItems.length - 1 ? "sm:col-span-2" : ""}`}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all group-hover:scale-110" style={{ backgroundColor: "rgba(26,35,126,0.1)" }}>
              <item.icon className="h-5 w-5" style={{ color: "#1a237e" }} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>


    </div>
  );
}
