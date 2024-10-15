import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Link {
    title: string;
    url: string;
}

interface ContentFormState {
    id: string | null;
    title: string;
    description: string;
    links: Link[];
}

interface RoadmapState {
    nodes: ContentFormState[];
}

const initialState: RoadmapState = {
    nodes: [],
}

const roadmapSlice = createSlice({
    name: 'roadmap',
    initialState,
    reducers: {
        setFormData: (state, action: PayloadAction<ContentFormState>) => {
            const data = action.payload;
            const existingIndex = state.nodes.findIndex((node) => node.id === data.id);     
            if (existingIndex !== -1) {
                /// meed replacemnet othewise when need change update to content data not affect
                state.nodes[existingIndex] = data;
            } else {
                state.nodes.push(data);
            }
        },
    }
})

export const { setFormData } = roadmapSlice.actions;
export default roadmapSlice.reducer;
