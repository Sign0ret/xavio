
import React, { useState } from 'react';

export const UploadLink: React.FC = () => {
  const [link, setLink] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para el link
    console.log('Link:', link);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">
          Link
        </label>
        <input
          type="url"
          id="link"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
      </div>
    </form>
  );
}