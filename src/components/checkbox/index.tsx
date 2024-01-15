import { useState } from "react";
import "./index.css";

interface CheckboxProps {
  onChange?: (isChecked: boolean) => void;
  checked?: boolean;
}

const Checkbox = ({ onChange, checked }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked || false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <label className="checkbox-container bg-gray-500 bg-opacity-10 hover:bg-gray-300 transition duration-300 ease-in-out hover:scale-110">
      <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      <div className="checkmark"></div>
      <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" className="celebrate">
        <polygon points="0,0 10,10"></polygon>
        <polygon points="0,25 10,25"></polygon>
        <polygon points="0,50 10,40"></polygon>
        <polygon points="50,0 40,10"></polygon>
        <polygon points="50,25 40,25"></polygon>
        <polygon points="50,50 40,40"></polygon>
      </svg>
    </label>
  );
};

export default Checkbox;
