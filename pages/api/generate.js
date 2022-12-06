// Import Open AI Api
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(req.body.userInput),
    temperature: 0.8,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(profession) {
  const capitalizedProfession =
    profession[0].toUpperCase() + profession.slice(1).toLowerCase();
    return `
        Suggest three important skills you need to master in a certain profession.

        Profession: Frontend Developer
        Skills: HTML, CSS, JavaScript

        Profession: Musician
        Skills: Reading and Writing Music, Music Theory, Learning by Ear
        
        Profession: ${capitalizedProfession}
        Skills:
    `
}
