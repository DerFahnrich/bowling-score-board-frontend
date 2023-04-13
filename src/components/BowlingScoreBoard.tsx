import { BowlingFrame } from "./BowlingFrame";

const bowlingScoreBoardBluePrint = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const BowlingScoreBoard = (): JSX.Element => {
  return (
    <div className="bowling-score-board">
      {bowlingScoreBoardBluePrint.map((n) => (
        <BowlingFrame key={n} id={n} />
      ))}
    </div>
  );
};
