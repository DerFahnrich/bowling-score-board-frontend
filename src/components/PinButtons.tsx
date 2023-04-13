import { useRef, useState } from "react";
import { PinButton } from ".";
import { IFrame } from "../interfaces";

import {
  getCalculatedScore,
  selectCurrentFrameNumber,
  selectPinButtons,
  selectRollNumber,
  updateFrames,
  updatePinButtons,
  updateRollNumber,
  useAppDispatch,
  useAppSelector,
} from "../store";

export const PinButtons = () => {
  const pinButtons = useAppSelector(selectPinButtons);
  const newFrame = useRef<IFrame>({} as IFrame);
  const rollNumber = useAppSelector(selectRollNumber);
  const currentFrameNumber = useAppSelector(selectCurrentFrameNumber);
  const dispatch = useAppDispatch();

  const updateNumberOfPinsAndFrameScore = (pinNumber: number) => {
    newFrame.current = { frameNumber: currentFrameNumber || 1 };

    if (rollNumber === 1) {
      if (pinNumber === 10) {
        newFrame.current = { ...newFrame.current, roll1: pinNumber };
        dispatch(updateFrames(newFrame.current));
        dispatch(getCalculatedScore());
        return;
      }

      const pinsToKeep = 10 - pinNumber + 1;
      dispatch(updatePinButtons(pinButtons.slice(0, pinsToKeep)));

      newFrame.current = { ...newFrame.current, roll1: pinNumber };

      dispatch(updateFrames(newFrame.current));
      dispatch(updateRollNumber(2));
    }

    if (rollNumber === 2) {
      newFrame.current = { ...newFrame.current, roll2: pinNumber };

      dispatch(updateFrames(newFrame.current));
      dispatch(updateRollNumber(1));
      dispatch(getCalculatedScore());

      newFrame.current = {} as IFrame;
    }
  };

  return (
    <div className="pin-buttons">
      {pinButtons.map((pb) => (
        <PinButton key={pb} onClick={updateNumberOfPinsAndFrameScore} pinNumber={pb} />
      ))}
    </div>
  );
};
