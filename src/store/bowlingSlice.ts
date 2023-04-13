import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AsyncThunkConfig,
  IAsyncThunkConfig,
  IBowlingState,
  IError,
  IFrame,
  INewFrame,
  IScoreBoardData,
} from "../interfaces";
import { RootState } from ".";
import { RootOptions } from "react-dom/client";

const initialState: IBowlingState = {
  currentFrameNumber: 1,
  pinButtons: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  rollNumber: 1,
};

export const getCalculatedScore = createAsyncThunk<IScoreBoardData, void, IAsyncThunkConfig>(
  "bowling/getCalculatedScore",
  async (_, { getState, dispatch, rejectWithValue }) => {
    dispatch(resetPinButtons());
    dispatch(updateCurrentFrameNumber(getState().bowling.currentFrameNumber + 1));

    const framesFromState = [...getState().bowling.frames!];
    const frameToCalculate = framesFromState.pop()!;

    const newFrame: INewFrame = {
      frame: frameToCalculate,
      previousFrames: framesFromState,
    };

    const response = await fetch(import.meta.env.VITE_BASE_API_BOWLING_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFrame),
    });

    if (response.ok) {
      const frames = (await response.json()) as IScoreBoardData;
      console.log(frames);
      return frames;
    }

    const error = (await response.json()) as IError;
    return rejectWithValue(error);
  }
);

const bowlingSlice = createSlice({
  name: "bowling",
  initialState,
  reducers: {
    resetPinButtons: (state) => {
      state.pinButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    },
    updateCurrentFrameNumber: (state, action: PayloadAction<number>) => {
      state.currentFrameNumber = action.payload;
    },
    updateFrames: (state, action: PayloadAction<IFrame>) => {
      const payload = action.payload;
      console.log("payload: ", payload);

      if (!state.frames) {
        state.frames = [payload];
        return;
      }

      const indexOfFrameIfExists = state.frames.findIndex(
        (f) => f.frameNumber === payload.frameNumber
      );

      if (indexOfFrameIfExists >= 0) {
        console.log("In heter");
        state.frames[indexOfFrameIfExists] = { ...state.frames[indexOfFrameIfExists], ...payload };
        return;
      }

      state.frames.push(payload);
    },
    updatePinButtons: (state, action: PayloadAction<number[]>) => {
      state.pinButtons = action.payload;
    },
    updateRollNumber: (state, action: PayloadAction<1 | 2>) => {
      console.log("Updateing rollNumber");
      state.rollNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCalculatedScore.pending, (state, action) => {
      console.log("Loading");
    });
    builder.addCase(getCalculatedScore.fulfilled, (state, action) => {
      console.log(action.payload.previousFrames);
      state.frames = action.payload.previousFrames;
    });
    builder.addCase(getCalculatedScore.rejected, (state, action) => {
      console.log("Rejected: ", action.error);
    });
  },
});

export const {
  resetPinButtons,
  updateCurrentFrameNumber,
  updateFrames,
  updatePinButtons,
  updateRollNumber,
} = bowlingSlice.actions;

export const selectCurrentFrameNumber = (state: RootState) => state.bowling.currentFrameNumber;
export const selectFrames = (state: RootState) => state.bowling.frames;
export const selectPinButtons = (state: RootState) => state.bowling.pinButtons;
export const selectRollNumber = (state: RootState) => state.bowling.rollNumber;

export default bowlingSlice.reducer;
