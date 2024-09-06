import MemorySVG from "@/components/svgs/MemorySVG";

import styles from "./styles.module.css";

interface MemoryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const MemoryButton: React.FC<MemoryButtonProps> = ({
  active = false,
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${active ? styles.active : ""}`}
      {...props}
    >
      <MemorySVG />
    </button>
  );
};

export default MemoryButton;
