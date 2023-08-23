// AttachmentItem.js
import React from 'react';

const AttachmentItem = ({ filename, size }) => {
  return (
    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
      <div className="flex w-0 flex-1 items-center">
        {/* Icon if needed */}
        <div className="ml-4 flex min-w-0 flex-1 gap-2">
          <span className="truncate font-medium">{filename}</span>
          <span className="flex-shrink-0 text-gray-400">{size}</span>
        </div>
      </div>
      <div className="ml-4 flex-shrink-0">
        <a href="#" className="font-medium txt-primary hover:txt-primary-hover">
          Download
        </a>
      </div>
    </li>
  );
};

export default AttachmentItem;
