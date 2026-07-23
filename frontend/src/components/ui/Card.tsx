import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({
  children,
  className = "",
}: CardProps) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
