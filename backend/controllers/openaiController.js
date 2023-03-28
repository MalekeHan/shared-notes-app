const axios = require('axios');

exports.completionsController = async (req, res) => {
  try {
    //const inputPrompt = `Summarize the following notes for me: ${req.body.prompt}`;
    const inputPrompt = req.body.prompt;
    if (typeof inputPrompt !== 'string') {
      res.status(400).json({ error: 'Prompt must be a string' });
      return;
    }

    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: inputPrompt,
        max_tokens: 150,
        temperature: 0.6,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const completion = response.data.choices[0].text;
    res.status(200).json({ completion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.chatCompletionsController = async (req, res) => {
    try {
      const inputMessages = req.body.messages;
  
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: inputMessages,
          max_tokens: 100,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
  
      const completion = response.data.choices[0].message.content;
  
      // Check if the completion contains a code snippet
      if (completion.includes('```')) {
        const formattedCompletion = `\`\`\`md\n${completion}\n\`\`\``;
        res.status(200).json({ completion: formattedCompletion });
      } else {
        res.status(200).json({ completion });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
