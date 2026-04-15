const Button = ({ children, variant = "primary" }) => {
  const base =
    "px-6 py-3 rounded-lg font-medium transition duration-300";

  const styles = {
    primary:
      "bg-[var(--blue-2)] hover:bg-[var(--blue-3)] text-white shadow-lg hover:scale-105",

    outline:
      "border border-white text-white hover:bg-white hover:text-black hover:scale-105",
  };

  return <button className={`${base} ${styles[variant]}`}>{children}</button>;
};

export default Button;