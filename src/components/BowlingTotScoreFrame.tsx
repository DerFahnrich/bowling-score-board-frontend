import { useAppSelector, selectFrames } from "../store";

export const BowlingTotScoreFrame = (): JSX.Element => {
  const frames = useAppSelector(selectFrames);
  // const totalScore = frames ? [...frames].pop()?.points : 0;
  const totalScore = frames?.reduce((a, c) => (c.points ? c.points : a), 0);

  return (
    <div className="score-frame">
      <div className="frame-header">
        <p className="text">Tot Score</p>
      </div>
      <div className="total-score">
        <p className="text">{totalScore}</p>
      </div>
    </div>
  );
};
