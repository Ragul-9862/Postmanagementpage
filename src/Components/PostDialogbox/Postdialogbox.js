import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material'

export default function Postdialogbox({ selectedPost, dialog, setDialog }) {
  return (
    <Dialog open={dialog} onClose={() => setDialog(false)}>
      <DialogTitle>Comments for Post</DialogTitle>
      <DialogContent>
        {selectedPost && (
          <div>
            <Typography variant="h6">Post Title:</Typography>
            <Typography variant="body1">{selectedPost.title}</Typography>
            <Typography variant="h6">Post Body:</Typography>
            <Typography variant="body1">{selectedPost.body}</Typography>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
