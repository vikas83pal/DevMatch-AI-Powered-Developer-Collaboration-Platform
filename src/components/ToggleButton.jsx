import { useState } from "react";

export default function ToggleButton({ onLabel = "Dark", offLabel = "Light" }) {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <button
      onClick={handleToggle}
      className={`px-4 py-2 rounded-xl font-semibold transition m-4
        ${isOn ? "bg-gray-900 text-white" : "bg-gray-300 text-black"}
      `}
    >
      {isOn ? onLabel : offLabel}
    </button>
  );
}
