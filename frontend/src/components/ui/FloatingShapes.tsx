import { motion } from "framer-motion";

export default function FloatingShapes() {
  const shapes = [
    {
      size: 180,
      top: "10%",
      left: "8%",
      duration: 18,
    },
    {
      size: 140,
      top: "60%",
      left: "75%",
      duration: 22,
    },
    {
      size: 220,
      top: "35%",
      left: "45%",
      duration: 26,
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="
            absolute
            rounded-full
            bg-gradient-to-br
            from-cyan-400/10
            to-violet-500/10
            blur-3xl
          "
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
          }}
          animate={{
            y: [-25, 25, -25],
            x: [-15, 15, -15],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
