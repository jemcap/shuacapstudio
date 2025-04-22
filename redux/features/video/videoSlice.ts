import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Video = {
    key: string;
    url: string;
    title: string;
    location?: string;
    year: string;
    host?: string;
    description: string;
}

interface VideoStateProps {
    videos: Video[],
    selected: number
}

const initialState: VideoStateProps = {
    videos: [],
    selected: 0
}

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        setVideos(state, action: PayloadAction<Video[]>) {
            state.videos = action.payload
        },
        setSelected(state, action: PayloadAction<number>) {
            state.selected = action.payload
        }
    }
})

export const { setVideos, setSelected } = videoSlice.actions;
export default videoSlice.reducer