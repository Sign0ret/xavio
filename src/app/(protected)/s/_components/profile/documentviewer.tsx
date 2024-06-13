// components/DocumentViewer.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

const DocumentViewer: React.FC = () => {
 /*  const [user, setUser] = useState<any>(null);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await currentUser();
      setUser(user);
      if (user) {
        const userData = await db.user.findUnique({
          where: { id: user.id },
          select: { image: true }
        });
        setDocumentUrl(userData?.image || null);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div className='text-white'>Error fetching the user</div>;
  }

  if (!documentUrl) {
    return <div className='text-white'>No document found</div>;
  }
 */
  return (
    <div className="w-full h-full border-2 border-gray-300 rounded-lg p-4 text-white">
      {/* {documentUrl.endsWith('.pdf') ? ( */}
        <iframe
        
          src="/cv.pdf"
          width="100%"
          height="100%"
          className="rounded-lg"
          frameBorder={0}
        >
          Your browser does not support iframes
        </iframe>
      {/* ) : (
        <a
          href={documentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          View Document
        </a>
      )} */}
    </div>
  );
};

export default DocumentViewer;
