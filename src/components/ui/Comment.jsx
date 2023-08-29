import React, { useState } from 'react';

/* Icon Imports */
import UserIconWithTag from './UserIconWithTag';
import SmsIcon from '@mui/icons-material/Sms';
import CommentForm from './CommentForm';

function Comment({ userData, comment, date }) {

    /* useState */
    const [isReplied, setIsReplied] = useState(false);
    const [newReply, setNewReply] = useState('');

    /* Functions */
    const submitReply = () => {
        console.log('Reply');
    };

    return (
        <div>
            <article className="p-5 pt-1 mb-6 text-base bg-white rounded-lg border border-gray-200">
                <footer className="flex justify-between items-center mb-1">
                    <div className="flex items-center w-full flex-wrap">
                        <div className="mr-3">
                            <UserIconWithTag
                                userPhotoUrl={userData?.userPhotoUrl}
                                username={`${userData?.firstName} ${userData?.lastName}`} />
                        </div>
                        <p className="text-xs text-gray-700 xs:pb-6 sm:pl-3 sm:border-l border-gray-200">
                            Posted:
                            <span className="ml-2">
                                {date}
                            </span>
                        </p>
                    </div>
                </footer>
                <p className="text-gray-700 text-sm">
                    {comment}
                </p>
                <div className="flex items-center mt-4 space-x-4 text-xs">
                    <button
                        type="button"
                        className="flex items-center text-gray-500
                            hover:underline dark:text-gray-400"
                        onClick={() => setIsReplied(!isReplied)}>
                        <SmsIcon style={{ fontSize: '15px', marginRight: '5px' }} />
                        Reply
                    </button>
                </div>
                {
                    isReplied &&
                    <CommentForm
                        comment={newReply} setComment={setNewReply}
                        handleSubmit={submitReply} type='reply' />
                }
            </article>
        </div>
    );
}

export default Comment;
