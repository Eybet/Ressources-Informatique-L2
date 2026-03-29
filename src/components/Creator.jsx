import React from "react";
import { X, Github, Mail } from "lucide-react";
import { motion } from "framer-motion";

function Creator({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-full border-2 border-red-600 flex items-center justify-center overflow-hidden bg-zinc-800 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
              <img
                src="/src/images/DONE3.png"
                alt="Creator"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-1 mb-6">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              AZZOUZ KHALIL
            </h1>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-600">
              Web Developer
            </span>
          </div>

          <div className="w-full h-[1px] bg-zinc-800 mb-6" />

          <p className="text-zinc-400 text-sm leading-relaxed mb-8">
            Étudiant en informatique de 19 ans à l’Université des Sciences et de
            la Technologie Houari Boumediene, développeur web passionné de
            coding.
          </p>

          <div className="flex w-full gap-3">
            <a
              href="https://github.com/Eybet"
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl text-sm font-bold transition-all border border-zinc-700"
            >
              <Github size={18} /> GitHub
            </a>
            <a
              href="mailto:your-email@example.com"
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-800 text-white py-3 rounded-xl text-sm font-bold transition-all shadow-[0_0_15px_rgba(220,38,38,0.2)] duretion-300"
            >
              <Mail size={18} /> Contact
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Creator;
