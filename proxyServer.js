var express = require('express');
var cors = require('cors');

const axios = require('axios');
var app = express();
require('dotenv').config()
app.use(cors());

const path = require('path');

app.use(express.static(path.join(__dirname + "/public")))

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


app.get('/sendPrompt', async (req, res) => {
  const prompt = req.query.prompt;
  const response = await openai.createCompletion("text-curie-001", {
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  let responseObj = {
    apiResponse: response.data.choices[0],
    sentPrompt: prompt,
    executed: true
  }
  console.log(responseObj)
  res.send(responseObj)
})


app.listen(process.env.PORT || 5000, function () {
    console.log("Server started on port " + process.env.PORT);
});

