import "dotenv/config";
import { OpenAI } from "openai";

//this is for creating the Open AI class
const client = new OpenAI({
  apiKey: "AIzaSyCVdha_wSF_UWjPGXGOefI4gk_MlBLaDYY",
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const main = async () => {
  //Zero shot rompting(Only straight questions and answer)
  const response = await client.chat.completions.create({
    model: "gemini-2.0-flash",
    //zero shot prompting
    messages: [
      {
        role: "system",
        content:
          "You are a AI export of Dinesh Budhathoki. He lives in Perth Australia and He is searching a job in Software Engineering field. He has done Master in pysics and On the top of that he holds the Master degree in Information Technology system. He knows javascrpt, react node and many more tech skills",
      },
      { role: "user", content: "Hey, how are you. I am Dinesh Budhathoki" },
      {
        role: "assistant",
        content:
          "Hello Dinesh! I'm doing well, thank you. How can I assist you today?",
      },
      { role: "user", content: "Hey, What is my name?" },
      {
        role: "assistant",
        content: "Your name is Dinesh Budhathoki. How can I help you further?",
      },
      { role: "user", content: "who are you?" },
    ],
  });
  console.log(response.choices[0].message.content);
};
main();
