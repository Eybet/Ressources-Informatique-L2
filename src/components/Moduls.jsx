import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { data } from "../data";
import { Particles } from "./Particles";
import { motion } from "framer-motion";
import { Atom } from "lucide-react";

const LinksCard = ({ data }) => {
  let imgPath = "";
  if (data.name === "COURS") {
    imgPath = "/src/images/courses.png";
  } else if (data.name === "TD") {
    imgPath = "/src/images/td.png";
  } else if (data.name === "TP") {
    imgPath = "/src/images/tp.png";
  } else {
    imgPath = "/src/images/exams.png";
  }

  return (
    <div className="flex group-hover:border-gray-500  hover:border-red-500 focus:border-red-500 active:border-red-500 transition-colors duration-400 cursor-pointer bg-zinc-900/50 border-gray-800 border-[1px] w-16 h-16 sm:w-[69px] sm:h-[69px] rounded-sm items-center justify-center select-none active:bg-red-500/10">
      
      <a
        href={`${data.link}`}
        target="blank"
        className="flex flex-col gap-1 items-center justify-center text-[11px] sm:text-[13px] font-semibold outline-none"
      >
        <img src={imgPath} alt="icon" className="w-4 sm:w-5" />
        <span className="active:text-red-500">{data.name}</span>
      </a>
    </div>
  );
};

const ModuleCard = ({ data, index }) => {
  return (
    <div
      className="relative z-4 group animate-fade-in-up w-full max-w-[350px] bg-zinc-900/40 rounded-[15px] h-[350px] flex flex-col items-center py-7 hover:border-red-500 transition-colors duration-500 border-gray-700 border-[0.5px]"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
    >
      <div className="w-full h-[25px]  flex justify-end pr-4 pb-10">
        {<Atom color="red" size={20}/>}
      </div>
      <h1 className="tracking-[0.08em] text-[18px] sm:text-[20px] font-bold leading-[1.1] text-left group-hover:text-red-500 transition-colors duration-400 border-b-[1px] border-gray-800 group-hover:border-red-500 h-auto pb-4 w-[88%] flex items-center">
        {data.name}
      </h1>
      <p className="text-[14px] sm:text-[16px] w-[86%] py-5 text-zinc-500 group-hover:text-zinc-400 duration-500 px-1">
        Accédez aux cours, TD et examens pour maîtriser les concepts
        fondamentaux du module.
      </p>

      <div className="flex gap-4 sm:gap-4 items-center justify-center py-4 mt-auto">
        {data?.links?.map((link, i) => (
          <LinksCard key={i} data={link} />
        ))}
      </div>
    </div>
  );
};

function Moduls(direction) {
  const [Mod, setMod] = useState({});
  const { semestre } = useParams();

  useEffect(() => {
    const S = data.find(
      (data) => data.semestre.toString() === semestre.toString(),
    );
    setMod(S);
  }, [semestre]);

  return (
    <div className="relative bg-black w-full min-h-screen text-white py-10 md:py-20 px-4 sm:px-10 flex flex-col gap-10 md:gap-20 items-center overflow-x-hidden">
      <Particles
        className="absolute inset-0 z-0 bg-transparent"
        quantity={500}
        staticity={20}
        ease={50}
        color="#dc2626"
        refresh={false}
      />
     
      <div className="relative z-4 flex flex-col pb-10 md:pb-22 w-[95%] md:w-[90%] justify-center items-center border-b-[2px] border-red-500">
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
          <h1 className="tracking-[0.08em] text-[40px] sm:text-[60px] md:text-[90px] leading-[1] font-bold animate-pulse text-center">
            SEMESTRE {Mod.semestre}
          </h1>
          <h1 className="tracking-[0.08em] text-[45px] sm:text-[65px] md:text-[96px] leading-[1] text-red-500 font-bold text-center">
            MODULES
          </h1>
        </motion.h1>
      </div>

      <div className="relative z-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl gap-6 md:gap-10 place-items-center">
        {Mod?.modules?.map((module, i) => (
          <ModuleCard data={module} key={i} index={i} />
        ))}
      </div>
    </div>
  );
}

export default Moduls;
