import PTTSVG from "@/components/svgs/PTTSVG";

import styles from "./styles.module.css";

interface PTTButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const PTTButton: React.FC<PTTButtonProps> = ({ active = false }) => {
  return (
    <div className={`${styles.pttButton} ${active ? styles.active : ""}`}>
      <PTTSVG />
    </div>
  );
};

export default PTTButton;
