import { motion } from "framer-motion";

function SmartHub() {
  const items = [
    { name: "GitHub", angle: 270 },
    { name: "LinkedIn", angle: 315 },
    { name: "Resume", angle: 0 },
    { name: "Docker", angle: 45 },
    { name: "AWS", angle: 90 },
    { name: "Azure", angle: 135 },
    { name: "Projects", angle: 180 },
    { name: "Terraform", angle: 225 },
];

  return (
    <div className="relative mx-auto flex h-[560px] w-[560px] items-center justify-center">
      {/* Glow */}
      

      {/* Orbit */}


      <div className="absolute h-[420px] w-[420px]">

        {/* Orbit Ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-primary/20" />

        {/* Orbit Items */}
        {items.map((item) => (
  <motion.div
    key={item.name}
    className="absolute inset-0"
    animate={{ rotate: item.angle + 360 }}
    transition={{
      duration: 40,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        transform: "translate(-50%, -210px)",
      }}
      animate={{ rotate: -(item.angle + 360) }}
      transition={{
        duration: 40,
        repeat: Infinity,
        ease: "linear",
      }}
      whileHover={{
        scale: 1.12,
      }}
    >
      <div className="rounded-full border border-border/60 bg-background/85 px-5 py-2 text-sm font-semibold shadow-xl backdrop-blur-md transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground">
        {item.name}
      </div>
        </motion.div>
  </motion.div>
))}











       

      </div>

      {/* Center */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-20 flex h-36 w-36 items-center justify-center rounded-full border border-primary/30 bg-primary text-4xl font-black text-primary-foreground shadow-[0_0_50px_rgba(59,130,246,0.35)]"
      >
        MB
      </motion.div>
    </div>
  );
}

export default SmartHub;
