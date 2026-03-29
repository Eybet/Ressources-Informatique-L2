import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Layers, ArrowRight } from "lucide-react";
import Creator from "./Creator";
import { Link } from "react-router-dom";
import { Particles } from "./Particles";

const SemesterCard = ({ number, subjects, icon: Icon, direction }) => {
  return (
    <Link to={`/Moduls/${number}`} className="w-full sm:w-auto">
      <motion.div
        initial={{ opacity: 0, x: direction === "left" ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        whileHover={{ y: -5 }}
        className="group relative cursor-pointer w-full sm:w-80 md:w-96 lg:w-[400px] p-6 sm:p-6 md:p-8 rounded-2xl border border-zinc-800 bg-zinc-900/40 transition-all duration-300 hover:border-red-600 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)]"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="flex justify-between items-start mb-6 sm:mb-10">
          <div className="p-3 rounded-lg border border-zinc-700 bg-zinc-800/50 text-zinc-400 group-hover:border-red-500/50 group-hover:text-red-500 transition-colors">
            <Icon size={24} />
          </div>
          <span className="text-2xl font-bold text-zinc-800 group-hover:text-red-900/30 transition-colors">
            S{number}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-red-600 transition-colors">
            SEMESTER 0{number}
          </h3>
          <p className="text-zinc-500 text-xs sm:text-sm font-medium group-hover:text-zinc-400">
            {subjects}
          </p>
        </div>

        <div className="mt-6 sm:mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-red-600 transition-colors">
          Explore Modules
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </div>
      </motion.div>
    </Link>
  );
};

function Home(direction) {
  const [showCreator, setShowCreator] = useState(false);
  return (
    <div className="relative min-h-screen bg-black text-white p-4 sm:p-6 md:p-8 lg:p-10 font-sans flex flex-col items-center justify-center gap-8 sm:gap-10 overflow-x-hidden">
      <Particles
        className="absolute inset-0 z-0 bg-transparent"
        quantity={500}
        staticity={20}
        ease={50}
        color="#dc2626"
        refresh={false}
      />

      <div className="relative z-10 mb-8 sm:mb-16 flex flex-col items-center w-full max-w-4xl px-2">
        <div className="mb-6 sm:mb-8 flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: direction === "bottom" ? 40 : -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }} 
            transition={{
              duration: 0.8,
              ease: [0.25, 1, 0.5, 1],
              delay: 0.1,
            }}
            className="text-4xl md:text-6xl font-bold text-white"
          >
            <h1 className="text-6xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-center leading-none">
              COMPUTER
            </h1>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-red-600 text-center leading-none">
              SCIENCE L2
            </h1>
          </motion.h1>
          <p className="mt-4 text-xs sm:text-base md:text-lg text-zinc-500 max-w-xs sm:max-w-md text-center leading-relaxed">
            Plateforme pour étudiants L2 USTHB regroupant tous les cours des
            semestres 3 et 4 par matière.
          </p>
        </div>

        <button
          onClick={() => setShowCreator(true)}
          className="duration-700 px-6 py-2 text-red-600 border border-red-600 rounded-[10px] w-full max-w-[200px] h-11 text-xs font-bold tracking-widest hover:bg-red-900/50 active:bg-red-900 hover:text-white cursor-pointer transition-all text-center focus:outline-none focus:ring-2 focus:ring-red-600/50"
        >
          PROFIL CRÉATEUR
        </button>

        <AnimatePresence>
          {showCreator && (
            <Creator
              isOpen={showCreator}
              onClose={() => setShowCreator(false)}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full max-w-6xl px-2">
        <SemesterCard
          number={3}
          subjects="ALGO, Architecture & Logique Mathematique"
          icon={Cpu}
          direction="left"
        />
        <SemesterCard
          number={4}
          subjects="OS, Génie Logiciel , Base de Données, Web Dev"
          icon={Layers}
          direction="right"
        />
      </div>
    </div>
  );
}

export default Home;
