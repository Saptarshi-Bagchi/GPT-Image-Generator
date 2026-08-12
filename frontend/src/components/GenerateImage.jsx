import { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

//! Function to call the backend api
const generateImageAPI = async (prompt) => {
  const res = await axios.post('http://localhost:9000/generate-image', {
    prompt
  });
  return res.data;
}

const GenerateImage = () => {
  const [prompt, setPrompt] = useState('');
  //!mutation
  const mutation = useMutation({
    mutationFn: generateImageAPI,
    mutationKey: ['gpt-image']
  });
  //! Submit handler
  const handleGenerateImage = () => {
    if (!prompt) {
      alert('Please enter a prompt');
      return;
    }
    mutation.mutate(prompt);
  };
  console.log(mutation)
  return (
    <div>
      <input
        type="text"
        placeholder="Enter prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button type="submit" onClick={handleGenerateImage}>
        {mutation?.isPending ? 'Generating please wait...':'Generate Image'}
      </button>
    </div>
  )
}

export default GenerateImage