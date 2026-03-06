import { motion } from "framer-motion";

export default function AnimatedBus() {
    return (
        <div className="relative w-full overflow-hidden" style={{ height: "420px", background: "linear-gradient(180deg, #87CEEB 0%, #B8E6F0 35%, #E8F4F8 65%, #e0ddd5 82%, #555 90%, #444 100%)" }} aria-hidden="true">

            {/* Sun */}
            <motion.div
                className="absolute top-6 right-20 w-20 h-20 rounded-full"
                style={{ background: "radial-gradient(circle, #FFF9C4, #FFD700)", boxShadow: "0 0 60px 20px rgba(255,215,0,0.25)" }}
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Clouds */}
            <motion.div className="absolute top-6" animate={{ x: ["-200px", "calc(100vw + 200px)"] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}>
                <svg width="140" height="55" viewBox="0 0 140 55" fill="white" opacity="0.85"><ellipse cx="70" cy="32" rx="55" ry="20" /><ellipse cx="40" cy="24" rx="35" ry="17" /><ellipse cx="100" cy="27" rx="30" ry="14" /></svg>
            </motion.div>
            <motion.div className="absolute top-20" animate={{ x: ["-300px", "calc(100vw + 300px)"] }} transition={{ duration: 38, repeat: Infinity, ease: "linear", delay: 6 }}>
                <svg width="110" height="42" viewBox="0 0 110 42" fill="white" opacity="0.6"><ellipse cx="55" cy="26" rx="45" ry="15" /><ellipse cx="32" cy="19" rx="28" ry="13" /><ellipse cx="78" cy="21" rx="25" ry="11" /></svg>
            </motion.div>
            <motion.div className="absolute top-3" animate={{ x: ["calc(100vw)", "-250px"] }} transition={{ duration: 33, repeat: Infinity, ease: "linear", delay: 12 }}>
                <svg width="95" height="38" viewBox="0 0 95 38" fill="white" opacity="0.5"><ellipse cx="48" cy="22" rx="40" ry="14" /><ellipse cx="28" cy="16" rx="22" ry="11" /></svg>
            </motion.div>

            {/* Background buildings */}
            <div className="absolute bottom-[100px] left-0 right-0">
                <svg width="100%" height="70" viewBox="0 0 1400 70" preserveAspectRatio="none" opacity="0.3">
                    <rect x="50" y="30" width="45" height="40" fill="#b0bec5" /><rect x="100" y="15" width="35" height="55" fill="#90a4ae" />
                    <rect x="140" y="35" width="55" height="35" fill="#b0bec5" /><rect x="250" y="12" width="40" height="58" fill="#90a4ae" />
                    <rect x="300" y="30" width="50" height="40" fill="#b0bec5" /><rect x="400" y="20" width="35" height="50" fill="#90a4ae" />
                    <rect x="450" y="32" width="60" height="38" fill="#b0bec5" /><rect x="550" y="14" width="45" height="56" fill="#90a4ae" />
                    <rect x="620" y="28" width="40" height="42" fill="#b0bec5" /><rect x="700" y="18" width="50" height="52" fill="#90a4ae" />
                    <rect x="780" y="32" width="55" height="38" fill="#b0bec5" /><rect x="860" y="10" width="40" height="60" fill="#90a4ae" />
                    <rect x="920" y="25" width="60" height="45" fill="#b0bec5" /><rect x="1060" y="30" width="50" height="40" fill="#b0bec5" />
                    <rect x="1150" y="12" width="40" height="58" fill="#90a4ae" /><rect x="1280" y="22" width="45" height="48" fill="#b0bec5" />
                </svg>
            </div>

            {/* Trees */}
            <div className="absolute bottom-[100px] left-0 right-0 flex justify-around px-6">
                {[...Array(12)].map((_, i) => (
                    <motion.div key={i} animate={{ y: [0, -2, 0] }} transition={{ duration: 2.5 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}>
                        <svg width="22" height="36" viewBox="0 0 22 36" fill="none" opacity={0.45 + (i % 3) * 0.12}>
                            <ellipse cx="11" cy="11" rx="10" ry="11" fill="#43A047" /><rect x="9" y="20" width="4" height="16" fill="#6D4C41" />
                        </svg>
                    </motion.div>
                ))}
            </div>

            {/* ===== BIG, CLASSY COLLEGE ENTRANCE GATE (right side) ===== */}
            <div className="absolute bottom-[60px] right-4 sm:right-10 z-10">
                <svg width="220" height="200" viewBox="0 0 220 200" fill="none">
                    {/* Gate foundation */}
                    <rect x="0" y="190" width="220" height="10" rx="3" fill="#c8b896" />

                    {/* Left pillar */}
                    <rect x="2" y="28" width="22" height="164" fill="#f0e8d8" />
                    <rect x="0" y="28" width="26" height="4" fill="#d4cbb8" />
                    <rect x="-2" y="22" width="30" height="8" rx="3" fill="#e8dcc8" />
                    {/* Decorative cap */}
                    <rect x="2" y="14" width="22" height="10" rx="3" fill="#d4c8b0" />
                    <rect x="6" y="8" width="14" height="8" rx="4" fill="#c8b896" />
                    <circle cx="13" cy="6" r="5" fill="#FFD700" />

                    {/* Right pillar */}
                    <rect x="196" y="28" width="22" height="164" fill="#f0e8d8" />
                    <rect x="194" y="28" width="26" height="4" fill="#d4cbb8" />
                    <rect x="192" y="22" width="30" height="8" rx="3" fill="#e8dcc8" />
                    <rect x="196" y="14" width="22" height="10" rx="3" fill="#d4c8b0" />
                    <rect x="200" y="8" width="14" height="8" rx="4" fill="#c8b896" />
                    <circle cx="207" cy="6" r="5" fill="#FFD700" />

                    {/* Grand Arch */}
                    <path d="M24 55 Q110 -15 196 55" stroke="#1a237e" strokeWidth="14" fill="none" />
                    <path d="M24 55 Q110 -8 196 55" stroke="#FFD700" strokeWidth="4" fill="none" />

                    {/* Arch inner decorative ring */}
                    <path d="M30 55 Q110 0 190 55" stroke="#1a237e" strokeWidth="2" strokeDasharray="6 3" fill="none" opacity="0.3" />

                    {/* College name just up above the gate */}
                    <rect x="20" y="0" width="180" height="24" rx="4" fill="#f0e8d8" stroke="#FFD700" strokeWidth="2" />
                    <rect x="22" y="2" width="176" height="20" rx="3" fill="#1a237e" />
                    <text x="110" y="11" textAnchor="middle" fill="#FFD700" fontSize="9" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">DHAANISH CHENNAI</text>
                    <text x="110" y="19" textAnchor="middle" fill="white" fontSize="6" fontWeight="700" fontFamily="sans-serif" letterSpacing="0.5">COLLEGE OF ENGINEERING</text>

                    {/* Shield/Crest centered on gate */}
                    <rect x="85" y="62" width="50" height="32" rx="6" fill="#1a237e" />
                    <rect x="87" y="64" width="46" height="28" rx="5" fill="#1a237e" stroke="#FFD700" strokeWidth="1.5" />
                    <text x="110" y="82" textAnchor="middle" fill="#FFD700" fontSize="16" fontWeight="900" fontFamily="sans-serif">DC</text>
                    <rect x="95" y="86" width="30" height="2" rx="1" fill="#FFD700" opacity="0.6" />

                    {/* WELCOME text below crest */}
                    <rect x="72" y="100" width="76" height="16" rx="4" fill="#FFD700" />
                    <text x="110" y="112" textAnchor="middle" fill="#1a237e" fontSize="8" fontWeight="900" fontFamily="sans-serif">WELCOME</text>

                    {/* Gate bars */}
                    <line x1="40" y1="55" x2="40" y2="192" stroke="#9e8c6c" strokeWidth="2.5" />
                    <line x1="58" y1="48" x2="58" y2="192" stroke="#9e8c6c" strokeWidth="2.5" />
                    <line x1="76" y1="44" x2="76" y2="192" stroke="#9e8c6c" strokeWidth="2.5" />
                    <line x1="94" y1="42" x2="94" y2="60" stroke="#9e8c6c" strokeWidth="2.5" />
                    <line x1="126" y1="42" x2="126" y2="60" stroke="#9e8c6c" strokeWidth="2.5" />
                    <line x1="94" y1="120" x2="94" y2="192" stroke="#9e8c6c" strokeWidth="2.5" />
                    <line x1="126" y1="120" x2="126" y2="192" stroke="#9e8c6c" strokeWidth="2.5" />
                    <line x1="144" y1="44" x2="144" y2="192" stroke="#9e8c6c" strokeWidth="2.5" />
                    <line x1="162" y1="48" x2="162" y2="192" stroke="#9e8c6c" strokeWidth="2.5" />
                    <line x1="180" y1="55" x2="180" y2="192" stroke="#9e8c6c" strokeWidth="2.5" />

                    {/* Horizontal cross bars */}
                    <line x1="24" y1="100" x2="84" y2="100" stroke="#9e8c6c" strokeWidth="2" />
                    <line x1="136" y1="100" x2="196" y2="100" stroke="#9e8c6c" strokeWidth="2" />
                    <line x1="24" y1="145" x2="196" y2="145" stroke="#9e8c6c" strokeWidth="2" />
                    <line x1="24" y1="170" x2="196" y2="170" stroke="#9e8c6c" strokeWidth="2" />

                    {/* Decorative diamond on horizontal bar */}
                    <polygon points="110,138 118,145 110,152 102,145" fill="#FFD700" opacity="0.7" />

                    {/* Mini lamp posts on pillars */}
                    <rect x="8" y="32" width="10" height="3" rx="1" fill="#FFD700" opacity="0.8" />
                    <rect x="202" y="32" width="10" height="3" rx="1" fill="#FFD700" opacity="0.8" />

                    {/* Ground path leading to gate */}
                    <rect x="60" y="192" width="100" height="8" rx="2" fill="#d4c8b0" opacity="0.5" />
                </svg>
            </div>

            {/* Road */}
            <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-b from-[#555] to-[#3a3a3a]" />
            <div className="absolute bottom-[26px] left-0 right-0 h-1 road-dashes-yellow" />
            <div className="absolute bottom-[56px] left-0 right-0 h-[3px] bg-white/25" />
            <div className="absolute bottom-[4px] left-0 right-0 h-[3px] bg-white/25" />

            {/* ===== MASSIVE YELLOW BUS driving towards gate ===== */}
            <motion.div
                className="absolute bottom-[6px] z-20"
                animate={{ x: ["-290px", "calc(100vw - 260px)"] }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 2.5,
                }}
            >
                <svg width="260" height="108" viewBox="0 0 260 108" fill="none" className="drop-shadow-xl">
                    {/* Bus body */}
                    <rect x="8" y="12" width="244" height="62" rx="8" fill="#FFD700" />
                    <rect x="8" y="12" width="244" height="8" rx="8" fill="#E6BE00" />
                    <rect x="8" y="58" width="244" height="16" fill="#E6BE00" />

                    {/* Windows */}
                    {[24, 52, 80, 108, 136, 164].map((x, i) => (
                        <g key={i}>
                            <rect x={x} y="25" width="22" height="22" rx="3" fill="white" fillOpacity="0.92" />
                            <rect x={x + 2} y="27" width="4" height="18" rx="2" fill="#cceeff" fillOpacity="0.4" />
                        </g>
                    ))}

                    {/* Windshield */}
                    <rect x="196" y="20" width="40" height="34" rx="6" fill="white" fillOpacity="0.93" />

                    {/* Driver silhouette */}
                    <path d="M210 54 Q216 38 226 54" fill="#1a237e" fillOpacity="0.85" />
                    <circle cx="218" cy="35" r="5.5" fill="#1a237e" fillOpacity="0.85" />
                    {/* Driver Cap */}
                    <path d="M211 32 Q218 27 225 32" fill="#1a237e" />
                    <rect x="223" y="31" width="5" height="1.5" fill="#1a237e" />
                    {/* Steering Wheel */}
                    <path d="M225 46 L234 43" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />

                    <rect x="199" y="23" width="6" height="28" rx="3" fill="#b3e0ff" fillOpacity="0.3" />

                    {/* Door */}
                    <rect x="108" y="52" width="16" height="24" rx="2" fill="#C8A600" />
                    <rect x="116" y="56" width="2" height="16" rx="1" fill="#A08000" />

                    {/* Headlights */}
                    <circle cx="248" cy="46" r="6" fill="white" />
                    <circle cx="248" cy="46" r="4" fill="#FFF9C4" />
                    <circle cx="248" cy="46" r="10" fill="#FFD700" fillOpacity="0.15" />

                    {/* Tail lights */}
                    <rect x="8" y="40" width="6" height="9" rx="2.5" fill="#FF4444" />
                    <rect x="8" y="53" width="6" height="6" rx="2.5" fill="#FF8800" />

                    {/* Bumper */}
                    <rect x="4" y="72" width="252" height="5" rx="2.5" fill="#C8A600" />

                    {/* Side stripe - navy */}
                    <rect x="18" y="52" width="170" height="3.5" rx="1.75" fill="#1a237e" />

                    {/* College text on bus */}
                    <text x="102" y="64" textAnchor="middle" fill="#1a237e" fontSize="9" fontWeight="900" fontFamily="sans-serif">DHAANISH CHENNAI</text>

                    {/* Wheels */}
                    <g>
                        <circle cx="58" cy="84" r="14" fill="#333" />
                        <circle cx="58" cy="84" r="10" fill="#555" />
                        <circle cx="58" cy="84" r="4" fill="#999" />
                        <g className="animate-spin" style={{ transformOrigin: "58px 84px", animationDuration: "0.35s" }}>
                            <line x1="58" y1="73" x2="58" y2="95" stroke="#777" strokeWidth="1.5" />
                            <line x1="47" y1="84" x2="69" y2="84" stroke="#777" strokeWidth="1.5" />
                            <line x1="50" y1="76" x2="66" y2="92" stroke="#777" strokeWidth="1" />
                            <line x1="66" y1="76" x2="50" y2="92" stroke="#777" strokeWidth="1" />
                        </g>
                    </g>
                    <g>
                        <circle cx="200" cy="84" r="14" fill="#333" />
                        <circle cx="200" cy="84" r="10" fill="#555" />
                        <circle cx="200" cy="84" r="4" fill="#999" />
                        <g className="animate-spin" style={{ transformOrigin: "200px 84px", animationDuration: "0.35s" }}>
                            <line x1="200" y1="73" x2="200" y2="95" stroke="#777" strokeWidth="1.5" />
                            <line x1="189" y1="84" x2="211" y2="84" stroke="#777" strokeWidth="1.5" />
                            <line x1="192" y1="76" x2="208" y2="92" stroke="#777" strokeWidth="1" />
                            <line x1="208" y1="76" x2="192" y2="92" stroke="#777" strokeWidth="1" />
                        </g>
                    </g>

                    {/* Mirror */}
                    <rect x="240" y="28" width="8" height="12" rx="2" fill="#C8A600" />
                    <rect x="242" y="30" width="4" height="8" rx="1" fill="white" fillOpacity="0.7" />

                    {/* Route number */}
                    <rect x="202" y="13" width="26" height="10" rx="3" fill="#1a237e" />
                    <text x="215" y="21" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="sans-serif">D21</text>
                </svg>
            </motion.div>

            {/* Exhaust smoke */}
            <motion.div
                className="absolute bottom-[18px] z-10"
                animate={{ x: ["-350px", "calc(100vw - 320px)"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", repeatDelay: 2.5 }}
            >
                <div className="flex gap-1 -ml-12">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="rounded-full bg-gray-300/25"
                            animate={{ scale: [0.4, 1.6, 0.2], opacity: [0.3, 0.08, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.15 }}
                            style={{ width: `${6 + i * 2.5}px`, height: `${6 + i * 2.5}px` }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Label */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2">
                <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="px-5 py-2 rounded-full backdrop-blur-sm text-xs font-bold tracking-wider uppercase shadow-lg"
                    style={{ backgroundColor: "rgba(26,35,126,0.85)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.3)" }}
                >
                    🚌 Bus Entering Dhaanish Ahmed Campus
                </motion.div>
            </div>
        </div>
    );
}
