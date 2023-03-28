import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// To call the notesController
export const saveNote = async (note) => {
    try {
      const response = await api.post('/api/notes', { content: note });
      return response.data;
    } catch (error) {
      console.error('Error saving note:', error);
      throw error;
    }
  };
  
  // To call the openaiController
  export const generateSummary = async (note) => {
    try {
      const response = await api.post('/api/openai/generate', { prompt: note });
      return response.data;
    } catch (error) {
      console.error('Error generating summary:', error);
      throw error;
    }
  };
  
  