import React from "react";
import styled from "styled-components";
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';


export default function CommentAndReplyForm({
  handleCommentChange,
  handleCommentSubmit,
  animal,
  setAnimals,
  likeComments,
  likeComment,
  showCommentReplies,
  showReply,
  newReply,
  handleReplyChange,
  handleReplySubmit,
  showComment,
  newComment,
  handleCommentDelete,
}) {

  const { user} = useContext(UserContext)
  // Generate unique IDs for each comment
  const generateCommentId = (index) => `comment-${index}`;

  // Generate unique IDs for each comment like
  const generateCommentLikeId = (commentIndex) =>
    `comment-${commentIndex}-like`;
  const generateCommentReplyId = (commentIndex, replyIndex) =>
    `comment-${commentIndex}-reply-${replyIndex}`;

  function handleDelete(commentIndex) {
    handleCommentDelete(commentIndex);
  }
  // This component renders a form that allows the user to submit comments and replies
  return (
    <form onSubmit={handleCommentSubmit}>
      {/* Map over the comments in the `animal` object and render a `CommentsList` component for each comment */}
      {animal.comments &&
        animal.comments?.map((comment, commentIndex) => (
          <div key={generateCommentId(commentIndex)}>
             
            <CommentsList 
            animal={animal} 
            setAnimals={setAnimals}>
            {user.full_name} {comment.comment}
            </CommentsList>
            <LikeReply
              key={generateCommentLikeId(commentIndex)}
              onClick={() => likeComments(commentIndex)}
            >
              {/* Display a heart icon depending on whether the comment has been liked */}
              {likeComment[commentIndex] ? "♥" : "♡"} {comment.likes} Like
            </LikeReply>
            <LikeReply onClick={(e) => showCommentReplies(commentIndex)}>
              ↳ Reply
            </LikeReply>
            <LikeReply onClick={(e) => handleDelete(commentIndex)}>
              &#9746; Delete
            </LikeReply>
            <ul>
              {comment.replies && Array.isArray(comment.replies) && comment.replies.length > 0
                ? comment.replies.map((reply, replyIndex) => (
                    <Replies
                      key={generateCommentReplyId(commentIndex, replyIndex)}
                    >
                      {reply.reply}
                    </Replies>
                  ))
                : null}
            </ul>

            {/* If `showReply[commentIndex]` is truthy, render a form for submitting a reply to the comment */}
            {showReply[commentIndex] ? (
              <CommentForm>
                <TypeReply
                  type="text"
                  value={newReply}
                  onChange={handleReplyChange}
                  placeholder="Write a reply..."
                />
                <PostCommentBtn
                  className="replyBtn"
                  type="submit"
                  onClick={(e) => handleReplySubmit(e, commentIndex)}
                >
                  Reply
                </PostCommentBtn>
              </CommentForm>
            ) : null}
          </div>
        ))}
      {/* If `showComment` is truthy and there is text on the textarea, render the new comment */}
      {/* {showComment && newComment && <NewReplyLi key="new-comment">{newComment}</NewReplyLi>} */}
      <div className="comment-form">
        <textarea
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
          className="type-comment"
        />
        <PostCommentBtn key="post-comment" type="submit">
          Post
        </PostCommentBtn>
      </div>
    </form>
  );
}

/*******************************
 *   STYLED COMPONENTS          *
 *******************************/
const CommentsList = styled.li`
  list-style: none;
  background-color: rgb(243, 243, 243);
  height: auto;
  padding: 10px;
  margin: 20px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-bottom: -4px;
`;

const LikeReply = styled.button`
  border: none;
  font-size: 12px;
  margin-left: 30px;
  margin-bottom: 10px;
  background-color: white;
  font-weight: 500;
`;

const Replies = styled.li`
  list-style: none;
  border-radius: 20px;
  padding: 5px 10px;
  margin: 5px;
  width: 350px;
  margin-left: 50px;
  background-color: rgb(242, 244, 246);
`;

const CommentForm = styled.div`
  display: flex;
  align-items: center;
`;

const PostCommentBtn = styled.button`
  width: 70px;
  height: 40px;
  background-color: rgb(104, 104, 201);
  color: white;
  border-radius: 5px;
  border: none;
`;

const TypeReply = styled.textarea`
  margin-left: 100px;
  font-size: 12px;
  margin-right: 20px;
  height: 30px;
  width: 200px;
`;

const NewReplyLi = styled.li`
  list-style: none;
`;
