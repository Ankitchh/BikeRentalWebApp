import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Sample comments data
const initialComments = [
  {
    id: '1',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    name: 'David Mitchell',
    text: 'I absolutely loved my rental experience! The bikes were in perfect condition and so comfortable to ride.',
    timestamp: '2 days ago',
    likes: 14,
    replies: [
      {
        id: '1-1',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
        name: 'Sarah Johnson',
        text: 'I had the same experience! Their customer service is top-notch too.',
        timestamp: '1 day ago',
        likes: 3,
      },
    ],
  },
  {
    id: '2',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
    name: 'Michael Brown',
    text: 'The booking process was so seamless, and I appreciated the variety of bikes available. Will definitely rent again on my next trip!',
    timestamp: '1 week ago',
    likes: 8,
    replies: [],
  },
];

const CommentSection = () => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const { user, login } = useAuth();
  
  // Add a new comment
  const handleAddComment = (e) => {
    e.preventDefault();
    
    if (!user) {
      login(); // Trigger login if not logged in
      return;
    }
    
    if (newComment.trim() === '') return;
    
    const comment = {
      id: Date.now().toString(),
      avatar: user.profileImage,
      name: user.fullName,
      text: newComment,
      timestamp: 'Just now',
      likes: 0,
      replies: [],
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
  };
  
  // Add a reply to a comment
  const handleAddReply = (commentId) => {
    if (replyText.trim() === '') return;
    
    const reply = {
      id: `${commentId}-${Date.now()}`,
      avatar: user.profileImage,
      name: user.fullName,
      text: replyText,
      timestamp: 'Just now',
      likes: 0,
    };
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply],
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    setReplyText('');
    setReplyingTo(null);
  };
  
  // Toggle like on a comment
  const handleLikeComment = (commentId) => {
    if (!user) {
      login(); // Trigger login if not logged in
      return;
    }
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.likes + 1,
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };
  
  // Toggle like on a reply
  const handleLikeReply = (commentId, replyId) => {
    if (!user) {
      login(); // Trigger login if not logged in
      return;
    }
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === replyId) {
            return {
              ...reply,
              likes: reply.likes + 1,
            };
          }
          return reply;
        });
        
        return {
          ...comment,
          replies: updatedReplies,
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
    >
      <h3 className="text-2xl font-semibold mb-6">Comments & Feedback</h3>
      
      {/* Add a comment */}
      <form onSubmit={handleAddComment} className="mb-8">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <img 
              src={user ? user.profileImage : 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=300'} 
              alt="Your avatar" 
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div className="flex-grow relative">
            <textarea
              className="input min-h-[100px] w-full resize-none"
              placeholder={user ? "Share your thoughts..." : "Login to comment..."}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={!user}
            ></textarea>
            <button
              type="submit"
              className="absolute bottom-3 right-3 text-primary-500 hover:text-primary-600 disabled:text-neutral-400"
              disabled={!user || newComment.trim() === ''}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
      
      {/* Comments list */}
      <div className="space-y-6">
        {comments.map(comment => (
          <div key={comment.id} className="border-b border-neutral-200 pb-6 mb-6 last:border-0 last:mb-0 last:pb-0">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <img 
                  src={comment.avatar} 
                  alt={comment.name} 
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{comment.name}</h4>
                  <span className="text-sm text-neutral-500">{comment.timestamp}</span>
                </div>
                <p className="mt-2 text-neutral-700">{comment.text}</p>
                <div className="flex items-center mt-3 space-x-6">
                  <button 
                    onClick={() => handleLikeComment(comment.id)}
                    className="flex items-center text-neutral-500 hover:text-primary-500 transition-colors"
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    <span className="text-sm">{comment.likes}</span>
                  </button>
                  <button 
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="flex items-center text-neutral-500 hover:text-primary-500 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    <span className="text-sm">Reply</span>
                  </button>
                </div>
                
                {/* Reply input */}
                <AnimatePresence>
                  {replyingTo === comment.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <img 
                            src={user ? user.profileImage : 'https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=300'} 
                            alt="Your avatar" 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-grow relative">
                          <textarea
                            className="input min-h-[80px] text-sm w-full resize-none"
                            placeholder={user ? `Reply to ${comment.name}...` : "Login to reply..."}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            disabled={!user}
                          ></textarea>
                          <div className="absolute bottom-3 right-3 flex space-x-2">
                            <button
                              type="button"
                              onClick={() => setReplyingTo(null)}
                              className="text-neutral-500 hover:text-neutral-700"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAddReply(comment.id)}
                              className="text-primary-500 hover:text-primary-600 disabled:text-neutral-400"
                              disabled={!user || replyText.trim() === ''}
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-4 pl-4 border-l-2 border-neutral-200 space-y-4">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <img 
                            src={reply.avatar} 
                            alt={reply.name} 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium text-sm">{reply.name}</h5>
                            <span className="text-xs text-neutral-500">{reply.timestamp}</span>
                          </div>
                          <p className="mt-1 text-sm text-neutral-700">{reply.text}</p>
                          <button 
                            onClick={() => handleLikeReply(comment.id, reply.id)}
                            className="flex items-center mt-2 text-neutral-500 hover:text-primary-500 transition-colors"
                          >
                            <Heart className="w-3 h-3 mr-1" />
                            <span className="text-xs">{reply.likes}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CommentSection;