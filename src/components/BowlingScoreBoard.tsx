import { BowlingFrame, BowlingFrameLast, BowlingTotScoreFrame } from ".";

const bowlingScoreBoardBluePrint = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const BowlingScoreBoard = (): JSX.Element => {
  return (
    <div className="bowling-score-board">
      {bowlingScoreBoardBluePrint.map((n) => {
        return n !== 10 ? <BowlingFrame key={n} id={n} /> : <BowlingFrameLast key={n} id={n} />;
      })}
      <BowlingTotScoreFrame />
    </div>
  );
};
