import React from 'react';
import { Comments } from './component/comment';
import { AddComment } from './component/comment';
import { useAppSelector } from './app/hooks';
import { selectComment } from './features/comment/commentSlice';


import './App.css';

function App() {

const comments = useAppSelector(selectComment);

console.log("isArray App",Array.isArray(comments));

  return (
    <div className="">
      <Comments comments={comments}/>
      <AddComment parentId='root'/>
    </div>
  );
}

export default App;
