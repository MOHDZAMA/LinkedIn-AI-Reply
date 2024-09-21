import React from "react";
import magicIcon from "../public/icon/magic.svg";

interface AIIconProps {
  onClick: () => void;
  onMouseDown?: () => void;
}

const AIIcon: React.FC<AIIconProps> = ({ onClick, onMouseDown }) => (
  <div
    className="absolute right-0 bottom-0 cursor-pointer text-white p-1 rounded inline-flex items-center"
    onClick={onClick}
    aria-label="Open AI Assistant"
    onMouseDown={onMouseDown}
  >
    <img src={magicIcon} alt="Magic Icon" className="w-[32px] h-[32px] " />
  </div>
);

export default AIIcon;
