import { current, createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { idText } from 'typescript';
import { RootState } from '../../app/store';
// import { fetchCount } from './counterAPI';

export interface CommentState {
  text: string;
  id: string;
  parentId: string;
  children: CommentState[];
}

export interface CommentProps {
    comments: CommentState[];
}

export interface CommentPayload {
    text: string;
    parentId: string;
}

const updateComments = (id: string, incoming: CommentState, comments: Array<CommentState> ) => {
     comments.forEach(item => {
       if(item.id === id) {
        return item.children.push(incoming);
       } else {
        return updateComments(id, incoming, item.children);
       }
    }    
    );
    return comments;
}

export const commentSlice = createSlice({
  name: 'comments',
  initialState : [] as CommentState[],
  reducers: {
    addComment: {
        reducer: (state, action: PayloadAction<CommentState>) => {
        console.log("payload", action.payload);
        if(action.payload.parentId === 'root') {
            state.push(action.payload);
        } else {
            updateComments(action.payload.parentId, action.payload, state);
        }
        console.log(current(state));
        },
        prepare: (text: string, parentId: string) => {
            const id = nanoid()
            return { payload: { id, text, parentId, children: [] } }
        },
    }
  },
});

export const { addComment } = commentSlice.actions;
export const selectComment = (state: RootState) => state.comments;
export default commentSlice.reducer;
