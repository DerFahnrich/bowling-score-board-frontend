import { selectCurrentFrameNumber, selectFrames, useAppSelector } from "../store";

interface IBowlingFrameProps {
  id: number;
}

export const BowlingFrame = ({ id }: IBowlingFrameProps): JSX.Element => {
  const currentFrameNumber = useAppSelector(selectCurrentFrameNumber);
  const frames = useAppSelector(selectFrames);
  const thisFrame = frames?.find((f) => id === f.frameNumber);
  const dynamicClass = id === currentFrameNumber ? "active" : "";

  const roll1Content = (): number | string => {
    if (thisFrame?.roll1 === 10) {
      return "";
    }

    if (thisFrame?.roll1 === 0) {
      return 0;
    }

    return thisFrame?.roll1 ? thisFrame.roll1 : "";
  };

  const roll2Content = (): number | string => {
    if (thisFrame?.roll1 === 10) {
      return "X";
    }

    const isSpare = thisFrame?.roll1! + thisFrame?.roll2! === 10;
    if (isSpare) {
      return "/";
    }

    if (thisFrame?.roll2 === 0) {
      return 0;
    }

    return thisFrame?.roll2 ? thisFrame.roll2 : "";
  };

  const scoreContent = (): number | string => {
    const previousFrame = frames?.find((f) => f.frameNumber === thisFrame?.frameNumber! - 1);

    if (previousFrame) {
      const previousPointsSameAsThisFramePoints = previousFrame.points === thisFrame?.points!;

      if (previousPointsSameAsThisFramePoints) {
        return thisFrame?.spare || thisFrame?.strike ? "" : thisFrame?.points!;
      }
    }

    return thisFrame?.points ? thisFrame.points : "";
  };

  return (
    <div className="bowling-frame">
      <div className="frame-number">{id}</div>
      <div className={`rolls-container ${dynamicClass}`}>
        <div className="roll1">
          <p className="score">{roll1Content()}</p>
        </div>
        <div className="roll2">
          <p className="score">{roll2Content()}</p>
        </div>
      </div>
      <div className={`frame-score ${dynamicClass}`}>
        <p className="score">{scoreContent()}</p>
      </div>
    </div>
  );
};
