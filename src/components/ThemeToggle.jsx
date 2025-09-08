import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    () => window.localStorage.getItem("theme") === "dark"
  );

  const toggle = () => {
    setIsDark(prev => {
      const newValue = !prev;
      window.localStorage.setItem("theme", newValue ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newValue);
      return newValue;
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <ToggleButton
      isOn={isDark}
      onLabel="Dark"
      offLabel="Light"
      onToggle={() => toggle()}
    />
  );
}
