import { useState, useContext } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationCtx from '../../context/notification-context';

function Comments(props) {
  const ctx = useContext(NotificationCtx);
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  function toggleCommentsHandler() {
    ctx.setIsNotif(true);
    ctx.setNotData({
      status: 'pending',
      title: 'Pending...',
      message: 'Fetching comments from the DB...',
    });

    setShowComments((prevStatus) => {
      if (prevStatus === false) {
        // Get comments from DB
        fetch(`/api/${eventId}`)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }

            return res.json().then((data) => {
              throw new Error(data.message || 'something went wrong...');
            });
          })
          .then((data) => {
            setComments(data.comments);
            ctx.setNotData({
              status: 'success',
              title: 'Success',
              message: 'Comments successfully loaded!',
            });
          })
          .catch((err) => {
            ctx.setNotData({
              status: 'error',
              title: 'Error',
              message: 'Something went wrong...',
            });
          });
      }

      return !prevStatus;
    });
    setTimeout(() => ctx.setIsNotif(false), 3000);
  }

  function addCommentHandler(commentData) {
    ctx.setIsNotif(true);
    ctx.setNotData({
      status: 'pending',
      title: 'Pending...',
      message: 'Adding comment to the DB...',
    });

    // send data to API
    fetch(`/api/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then((data) => {
          throw new Error(data.message || 'Something went wrong');
        });
      })
      .then((data) => {
        ctx.setNotData({
          status: 'success',
          title: 'Success',
          message: 'Comments added to the DB!',
        });
      })
      .catch((err) => {
        ctx.setNotData({
          status: 'error',
          title: 'Error',
          message: 'Something went wrong...',
        });
      });
    setTimeout(() => ctx.setIsNotif(false), 3000);
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
