// components/ui/card.jsx
export function Card({ children, className }) {
  return (
    <div className={`bg-white dark:bg-[#0d1117] rounded-2xl shadow-md p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return <div className={className}>{children}</div>;
}
