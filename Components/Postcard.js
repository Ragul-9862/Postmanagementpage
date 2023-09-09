import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import './Postcard.css';
import Postdialogbox from '../PostDialogbox/Postdialogbox';

export default function Postcard({
  setFilterSearch,
  filterSearch,
  post,
  setPost,
  selectedPost,
  setSelectedPost,
  handleDelete,
  dialog,
  setDialog
}) {

  const [comments, setComments] = useState([]);

  const handleDialogClick = async (post) => {
    setSelectedPost(post);
    setDialog(true);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
      );
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleRefresh = () => {
    setPost([]);

    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => {
        setPost(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    const storedPosts = localStorage.getItem('posts');

    if (storedPosts) {
      setPost(JSON.parse(storedPosts));
    } else {
      axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then((res) => {
          setPost(res.data);
          localStorage.setItem('posts', JSON.stringify(res.data));
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }

    const storedFilterSearch = localStorage.getItem('filterSearch');
    if (storedFilterSearch) {
      setFilterSearch(storedFilterSearch);
    }
  }, [setFilterSearch, setPost]);

  useEffect(() => {
    localStorage.setItem('filterSearch', filterSearch);
  }, [filterSearch]);

  const filteredPost = post.filter(
    (postItem) =>
      postItem.title.toLowerCase().includes(filterSearch.toLowerCase()) ||
      postItem.body.toLowerCase().includes(filterSearch.toLowerCase())
  );

  return (
    <div>
      <RefreshIcon
        className='refresh-button'
        variant='contained'
        onClick={handleRefresh}
      />
      <div className='card-container'>
        {filteredPost.map((postItem) => (
          <Card
            key={postItem.id}
            style={{ marginBottom: '20px', cursor: 'pointer' }}
            onClick={() => handleDialogClick(postItem)}
          >
            <CardContent>
              <Typography variant='h5' component='div'>
                {postItem.title}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {postItem.body}
              </Typography>
            </CardContent>
            <div className='card-button'>
              <DeleteForeverIcon
                className='card-button-delete'
                onClick={(event) => {
                  event.stopPropagation();
                  handleDelete(postItem.id);
                }}
              />
            </div>
          </Card>
        ))}
        <Postdialogbox selectedPost={selectedPost} dialog={dialog} setDialog={setDialog} comments={comments} />
      </div>

    </div>
  );
}
