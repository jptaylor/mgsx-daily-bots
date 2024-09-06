import { useEffect } from "react";
import { useVoiceClientMediaDevices } from "realtime-ai-react";

import { Field } from "../ui/field";
import { Select } from "../ui/select";

import { AudioIndicatorBar } from "./AudioIndicator";

interface DeviceSelectProps {
  hideMeter: boolean;
}

export const DeviceSelect: React.FC<DeviceSelectProps> = ({
  hideMeter = false,
}) => {
  const { availableMics, selectedMic, updateMic } =
    useVoiceClientMediaDevices();

  useEffect(() => {
    updateMic(selectedMic?.deviceId);
  }, [updateMic, selectedMic]);

  return (
    <div className="flex flex-col flex-wrap gap-4">
      <Field label="Microphone" error={false}>
        <Select
          onChange={(e) => updateMic(e.currentTarget.value)}
          value={selectedMic?.deviceId}
        >
          {availableMics.length === 0 ? (
            <option value="">Loading devices...</option>
          ) : (
            availableMics.map((mic) => (
              <option key={mic.deviceId} value={mic.deviceId}>
                {mic.label}
              </option>
            ))
          )}
        </Select>
        {!hideMeter && <AudioIndicatorBar />}
      </Field>
    </div>
  );
};

export default DeviceSelect;
