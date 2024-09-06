import styles from "./styles.module.css";
import PTTSVG from "@/components/svgs/PTTSVG";

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
