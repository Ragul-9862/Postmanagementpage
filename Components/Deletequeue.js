import React from 'react';
import './Deletequeue.css'


export default function Deletequeue({ deleteCount }) {
  return (
    <div className="delete-queue">
      DELETED : {deleteCount}
    </div>
  );
}
