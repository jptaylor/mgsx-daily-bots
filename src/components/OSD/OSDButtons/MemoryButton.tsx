import MemorySVG from "@/components/svgs/MemorySVG";
import { usePlayCodecSound } from "@/hooks/usePlayCodecSound";

import styles from "./styles.module.css";

interface MemoryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const MemoryButton: React.FC<MemoryButtonProps> = ({
  active = false,
  ...props
}) => {
  const playCodecSound = usePlayCodecSound();

  return (
    <button
      onMouseEnter={() => playCodecSound("zip")}
      className={`${styles.button} ${active ? styles.active : ""}`}
      {...props}
    >
      <MemorySVG />
    </button>
  );
};

export default MemoryButton;
