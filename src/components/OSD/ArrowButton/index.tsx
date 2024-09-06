import styles from "./styles.module.css";

const ArrowSVG = () => (
  <svg
    width="55"
    height="46"
    viewBox="0 0 55 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 23L55 0V23V46L0 23Z"
      fill="currentColor"
    />
  </svg>
);

interface ArrowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  flipped?: boolean;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({
  flipped = false,
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${flipped ? "flipped" : ""}`}
      {...props}
    >
      <ArrowSVG />
    </button>
  );
};

export default ArrowButton;
