import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  deleteComment,
  listComments,
  updateComment,
} from "../actions/commentActions";
import RatingComponent from "../components/Utilities/RatingComponent";

const CommentManager = ({ productId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.commentList.comments);
  const userId = JSON.parse(localStorage.getItem("userAuth"))?.id;

  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [showLoginWarning, setShowLoginWarning] = useState(false); // For modal warning

  useEffect(() => {
    // Fetch comments when the component mounts
    dispatch(listComments(productId));
  }, [dispatch, productId]);

  const handleAddComment = () => {
    if (!userId) {
      setShowLoginWarning(true); // Show warning modal if the user is not logged in
      return;
    }
    if (newComment.trim()) {
      dispatch(createComment(newComment, productId, rating));
      setNewComment("");
      setRating(0); // Reset rating after submission
    }
  };

  const handleEditComment = (commentId, commentText) => {
    setEditCommentId(commentId);
    setEditCommentText(commentText);
  };

  const handleUpdateComment = () => {
    if (editCommentText.trim()) {
      dispatch(updateComment({ id: editCommentId, text: editCommentText }));
      setEditCommentId(null);
      setEditCommentText("");
    }
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId));
  };

  const toggleComments = () => {
    setCommentsVisible(!commentsVisible);
  };

  const handleRatingSubmit = (newRating) => {
    setRating(newRating);
  };

  const closeLoginWarning = () => {
    setShowLoginWarning(false);
  };

  return (
    <div className="comment-manager p-4">
      <button className="text-blue-500 underline" onClick={toggleComments}>
        {commentsVisible ? "Hide Reviews" : "Show Reviews"}
      </button>

      {commentsVisible && (
        <div>
          <div className="mt-4">
            <RatingComponent onRatingSubmit={handleRatingSubmit} />
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={handleAddComment}
              className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            >
              Add Review
            </button>
          </div>

          <div>
            {comments.map((comment) => (
              <div key={comment._id} className="mb-4 p-2 border rounded">
                {editCommentId === comment._id ? (
                  <div>
                    <input
                      type="text"
                      value={editCommentText}
                      onChange={(e) => setEditCommentText(e.target.value)}
                      className="border p-2 mb-2 w-full"
                    />
                    <button
                      onClick={handleUpdateComment}
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setEditCommentId(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <RatingComponent
                      rating={comment?.rating}
                      onRatingSubmit={() => {}}
                    />{" "}
                    {/* Display rating */}
                    <p>{comment.text}</p>
                    <div className="text-sm text-gray-500">
                      Posted by: {comment?.author?.name}
                    </div>
                    <div className="mt-2">
                      <button
                        onClick={() =>
                          handleEditComment(comment?._id, comment?.text)
                        }
                        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {showLoginWarning && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl mb-4">You are not logged in</h3>
            <p>Please log in to add a review or rating.</p>
            <div className="mt-4">
              <button
                onClick={closeLoginWarning}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Redirect to login or take any login action
                  window.location.href = "/user/login";
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CommentManager.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default CommentManager;
