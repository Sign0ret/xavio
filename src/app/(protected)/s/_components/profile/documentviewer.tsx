import { useCurrentUser } from '@/hooks/use-current-user';
import React, { useState, useEffect } from 'react';

export default function DocumentViewer() {
  const user = useCurrentUser();
  const [pdfLink, setPdfLink] = useState('');

  useEffect(() => {
    const fetchPdfLink = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/getUserCv?userId=${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch PDF link');
        }

        const data = await response.json();
        setPdfLink(data.cv || '');
      } catch (error) {
        console.error('Error fetching PDF link:', error);
      }
    };

    fetchPdfLink();
  }, [user]);

  return (
    <div>
      
      {pdfLink && (
        <a href={pdfLink} download>
          <button className='bg-purple-600 text-white w-full h-full py-24 rounded-md text-2xl border-2 border-transparent hover:bg-white hover:text-black hover:border-purple-600 transition duration-300 ease-in-out font-bold'>Descargar <br /> CV</button>
        </a>
      )}
    </div>
  );
}