import { useState } from 'react';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

//! Function to call the backend api
const fetchImagesAPI = async () => {
  const res = await axios.get('http://localhost:9000/images');
  return res.data;
};

const generateImageAPI = async (prompt) => {
  const res = await axios.post('http://localhost:9000/generate-image', {
    prompt
  });
  return res.data;
};

const Images = () => {
  const [prompt, setPrompt] = useState('');
  const [currentImage, setCurrentImage] = useState('');
  const queryClient = useQueryClient();
  //loading
  const { data = [], isPending, isError, error } = useQuery({
    queryFn: fetchImagesAPI,
    queryKey: ['images']
  });
  const mutation = useMutation({
    mutationFn: generateImageAPI,
    mutationKey: ['gpt-image'],
    onSuccess: (image) => {
      setCurrentImage(image);
      queryClient.invalidateQueries({ queryKey: ['images'] });
    }
  });

  const handleGenerateImage = () => {
    if (!prompt) {
      alert('Please enter a prompt');
      return;
    }
    mutation.mutate(prompt);
  };

  return (
    <main style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', boxSizing: 'border-box', display: 'grid', gridTemplateRows: 'auto minmax(0, 1fr) auto', gap: '16px', padding: '24px', overflow: 'hidden', background: '#d6e6da', color: '#20382a', fontFamily: 'Arial, sans-serif' }}>
      <section style={{ display: 'flex', gap: '12px', minWidth: 0 }}>
        <input
          type="text"
          placeholder="Describe the image you want to create"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') handleGenerateImage();
          }}
          style={{ flex: 1, minWidth: 0, padding: '12px', border: '1px solid #91ae99', borderRadius: '8px', fontSize: '16px', background: '#edf5ef', color: '#20382a' }}
        />
        <button type="button" onClick={handleGenerateImage} disabled={mutation.isPending} style={{ padding: '12px 18px', border: 0, borderRadius: '8px', background: '#3f7654', color: '#ffffff', cursor: mutation.isPending ? 'wait' : 'pointer' }}>
          {mutation.isPending ? 'Generating...' : 'Generate'}
        </button>
      </section>

      <section style={{ minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #91ae99', borderRadius: '12px', background: '#e8f1ea', overflow: 'hidden' }}>
        {currentImage ? (
          <img src={currentImage} alt={prompt || 'Generated image'} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        ) : (
          <span>{mutation.isPending ? 'Creating your image...' : 'Your generated image will appear here.'}</span>
        )}
      </section>

      <section>
        <h2 style={{ margin: '0 0 8px', fontSize: '16px' }}>Previous images</h2>
        {isPending ? (
          <span>Loading images...</span>
        ) : isError ? (
          <span>{error.message}</span>
        ) : (
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
            {data.map((image) => (
              <button key={image._id || image.public_id || image.url} type="button" onClick={() => setCurrentImage(image.url)} style={{ flex: '0 0 auto', width: '92px', height: '92px', padding: 0, border: '1px solid #91ae99', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', background: 'transparent' }}>
                <img src={image.url} alt={image.prompt || 'Previously generated image'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Images;