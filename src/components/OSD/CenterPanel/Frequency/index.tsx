import React, { useContext } from "react";

import { AppContext } from "@/context";

import styles from "./styles.module.css";

const SVG = ({
  num = "0",
  small = false,
}: {
  num: string;
  small?: boolean;
}) => (
  <svg
    width="77"
    height="148"
    viewBox="0 0 77 148"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={small ? styles.small : styles.number}
    data-num={num}
  >
    <path d="M9 0L18.7938 14H59L69 0H9Z" />
    <path d="M77 8L63 17.7938L63 58L77 68V8Z" />
    <path d="M77 79L63 88.7938L63 129L77 139V79Z" />
    <path d="M0 139L14 129.206L14 89L7.15493e-07 79L0 139Z" />
    <path d="M0 67L14 57.2062L14 17L7.15493e-07 7L0 67Z" />
    <path d="M69 76L59.2062 62L19 62L9 76L69 76Z" />
    <path d="M69 148L59.2062 134H19L9 148H69Z" />
  </svg>
);

const DotSVG = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.dot}
  >
    <rect width="18" height="18" />
  </svg>
);

type FrequencyProps = {
  frequency: number;
};

const Frequency: React.FC<FrequencyProps> = ({ frequency = 0.0 }) => {
  const { isCalling } = useContext(AppContext);
  const frequencyString = frequency.toFixed(2).toString().split("");

  return (
    <div className={`${styles.frequency} ${isCalling ? styles.disabled : ""}`}>
      <SVG num="1" small />
      <SVG num="4" small />
      {frequencyString.map((num, i) =>
        num === "." ? <DotSVG key={i} /> : <SVG key={i} num={num} />
      )}
    </div>
  );
};

export default Frequency;
