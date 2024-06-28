const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const reverseAlphabet = (text) => {
  return text
    .split('')
    .map(char => {
      if (char >= 'a' && char <= 'z') {
        return String.fromCharCode(219 - char.charCodeAt(0));
      } else if (char >= 'A' && char <= 'Z') {
        return String.fromCharCode(155 - char.charCodeAt(0));
      }
      return char;
    })
    .join('');
};

app.post('/reverse', (req, res) => {
  const inputText = req.body.text;
  const reversedText = reverseAlphabet(inputText);
  res.json({ reversed: reversedText });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
