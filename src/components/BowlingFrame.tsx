import { selectCurrentFrameNumber, selectFrames, useAppSelector } from "../store";

interface IBowlingFrameProps {
  id: number;
}

export const BowlingFrame = ({ id }: IBowlingFrameProps): JSX.Element => {
  const currentFrameNumber = useAppSelector(selectCurrentFrameNumber);
  const frames = useAppSelector(selectFrames);
  const thisFrame = frames?.find((f) => id === f.frameNumber);
  const dynamicClass = id === currentFrameNumber ? "active" : "";

  return (
    <div className="bowling-frame">
      <div className="frame-number">{id}</div>
      <div className={`rolls-container ${dynamicClass}`}>
        <div className="roll1">
          <p className="score">{thisFrame?.roll1 ? thisFrame.roll1 : ""}</p>
        </div>
        <div className="roll2">
          <p className="score">{thisFrame?.roll2 ? thisFrame.roll2 : ""}</p>
        </div>
      </div>
      <div className={`frame-score ${dynamicClass}`}>
        <p className="score">{thisFrame?.points ? thisFrame.points : ""}</p>
      </div>
    </div>
  );
};
