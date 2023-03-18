import { useState } from "react";
import { useAppDispatch } from '../app/hooks';
import { addComment } from "../features/comment/commentSlice";

import { CommentState, CommentProps } from "../features/comment/commentSlice";

export const AddComment = ({parentId = '1'}) => {
    const dispatch = useAppDispatch();

    const [text, setText] = useState('');
    return (
        <div>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
            <button onClick={ () =>  { dispatch(addComment( text, parentId )); setText('')}}>Add comment {parentId}</button>
        </div>
    )
}

export const Comments = ({comments}: CommentProps ): JSX.Element => {

    console.log("isArray",Array.isArray(comments));

    return (
        <div>
            <ul>
            {comments && comments.map(({id, text, children, parentId}) => (
                <Comment id={id} text={text} children={children} parentId={parentId}/>
            ))}
            </ul>
        </div>
    )
}


export const Comment = ({id , text, children} : CommentState ): JSX.Element => {

    return (
            <li>
                <div>
                <span>
                    comment: {text} - id: {id}
                </span>
                <Comments comments={children}/>
                <AddComment parentId={id} />
                </div>
            </li>
    )
}