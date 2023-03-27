const axios = require('axios');

exports.openaiController = async (req, res) => {
  try {
    const inputPrompt = req.body.prompt;

    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: inputPrompt,
        max_tokens: 100,
        temperature: 0.5,
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
