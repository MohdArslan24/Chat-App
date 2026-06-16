import React from 'react'
import MessageSkeleton from './MessageSkeleton';

function Loader() {
  return (
    <div className="flex-1 overflow-y-auto p-5 pb-0 flex flex-col">
      <div className="flex flex-col mt-4">
        {/* Generate multiple skeleton messages */}
        {[...Array(5)].map((_, index) => (
          <MessageSkeleton key={index} isMe={index % 2 === 0} />
        ))}
      </div>
    </div>
  )
}

export default Loader
