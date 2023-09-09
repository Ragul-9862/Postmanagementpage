import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Searchbar from '../Components/Searchbar/Searchbar';
import Postcard from '../Components/Postcard/Postcard';
import DeleteQueue from '../Components/DeleteQueue/Deletequeue';
import './Postpage.css';

export default function Postpage() {
  const [post, setPost] = useState([]);
  const [filterSearch, setFilterSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [deleteQueue, setDeleteQueue] = useState([]);
  const [deleteCount, setDeleteCount] = useState(0);

  const handleDelete = (postId) => {
    setDialog(false);
    setDeleteQueue((prevQueue) => [...prevQueue, postId]);
    const updatedPosts = post.filter((postItem) => postItem.id !== postId);
    setPost(updatedPosts);
    setDeleteCount(deleteCount + 1);
  };

  useEffect(() => {
    const executeDeletes = async () => {
      for (const postId of deleteQueue) {
        try {
          await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        } catch (error) {
          console.error('Error deleting post:', error);
        }
      }
      setDeleteQueue([]);
    };

 
    if (deleteQueue.length > 0) {
      executeDeletes();
    }
  }, [deleteQueue, post]);

  useEffect(() => {

  }, [deleteCount]);

  return (
    <div className='container'>
      <div className='container-main'>
        <Searchbar filterSearch={filterSearch} setFilterSearch={setFilterSearch} />
        <div>
        <DeleteQueue deleteQueue={deleteQueue} setDeleteQueue={setDeleteQueue} deleteCount={deleteCount} />
        </div>
      </div>
      <div>
      <Postcard
  post={post}
  setPost={setPost}
  filterSearch={filterSearch}
  setFilterSearch={setFilterSearch}
  selectedPost={selectedPost}
  setSelectedPost={setSelectedPost}
  deleteQueue={deleteQueue} 
  setDeleteQueue={setDeleteQueue} 
  setDialog={ setDialog}
  dialog={dialog}
  handleDelete = {handleDelete}
/>

      </div>
    </div>
  );
}
