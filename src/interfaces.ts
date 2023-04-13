import { RootState } from "./store";

export interface IBowlingState {
  currentFrameNumber: number;
  frames?: IFrame[];
  pinButtons: number[];
  rollNumber: 1 | 2;
}

export interface IScoreBoardData {
  previousFrames: IFrame[];
}

export interface INewFrame {
  frame: IFrame;
  previousFrames: IFrame[];
}

export interface IFrame {
  frameNumber: number;
  points?: number;
  roll1?: number;
  roll2?: number;
  strike?: boolean;
  spare?: boolean;
}

export interface IError {
  errorMessage: string;
  statusCode: number;
}

export interface IAsyncThunkConfig {
  state: RootState;
  rejectValue: IError;
}

export type AsyncThunkConfig = {
  state: RootState;
  rejectValue: IError;
};
