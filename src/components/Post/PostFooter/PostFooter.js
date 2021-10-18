import { useState } from 'react';

import like from '../../../assets/like.png';
import liked from '../../../assets/liked.png';
import comments from '../../../assets/comments.png';

import classes from './PostFooter.module.scss';

function PostFooter(props) {
  const [isLiked, setIsLiked] = useState(false);

  function toggleLikeHandler() {
    setIsLiked((prevLiked) => !prevLiked);
  }

  return (
    <footer className={classes.postFooter}>
      <div>
        <button onClick={toggleLikeHandler}>
          <img src={isLiked ? liked : like} alt="like button" />
        </button>
        <span>{props.likes}</span>
      </div>
      <div>
        <span>{props.comments}</span>
        <button>
          <img src={comments} alt="comments button" />
        </button>
      </div>
    </footer>
  );
}

export default PostFooter;
