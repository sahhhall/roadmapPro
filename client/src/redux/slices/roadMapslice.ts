import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Link {
    title: string;
    url: string;
}

interface ContentFormState {
    nodeId: string | null;
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
            const existingIndex = state.nodes.findIndex((node) => node.nodeId === data.nodeId);
            if (existingIndex !== -1) {
                /// meed replacemnet othewise when need change update to content data not affect
                state.nodes[existingIndex] = data;
            } else {
                state.nodes.push(data);
            }
        },
        deleteNodeDetails: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.nodes.findIndex((node) => node.nodeId === action.payload.id);
            if (index !== -1) {
                state.nodes.splice(index, 1)
            }
        }
    }
})

export const { setFormData, deleteNodeDetails } = roadmapSlice.actions;
export default roadmapSlice.reducer;
