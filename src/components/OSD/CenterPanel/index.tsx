import React, { useContext } from "react";

import { AppContext } from "@/context";

import Frequency from "./Frequency";
import VolumeIndicator from "./VolumeIndicator";

import styles from "./styles.module.css";

type CenterPanelProps = {
  frequency: number;
};

const CenterPanel: React.FC<CenterPanelProps> = ({ frequency }) => {
  const { isCalling, callFrequency } = useContext(AppContext);

  return (
    <div
      className={styles.container}
      onClick={() => {
        if (isCalling) return;
        callFrequency(frequency);
      }}
    >
      <div className={styles.divider} />
      <div className={styles.osd}>
        <Frequency frequency={frequency} />
        <VolumeIndicator />
      </div>
      <div className={`${styles.divider} inverted`} />
    </div>
  );
};

export default CenterPanel;
