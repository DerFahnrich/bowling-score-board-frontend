import { BowlingScoreBoard, PinButtons } from "./components";

export const App = (): JSX.Element => {
  return (
    <div className="app">
      <PinButtons />
      <BowlingScoreBoard />
    </div>
  );
};
