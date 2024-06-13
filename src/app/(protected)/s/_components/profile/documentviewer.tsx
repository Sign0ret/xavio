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
      <div>DocumentViewer</div>
      {pdfLink && (
        <a href={pdfLink} download>
          <button>Descargar PDF</button>
        </a>
      )}
    </div>
  );
}