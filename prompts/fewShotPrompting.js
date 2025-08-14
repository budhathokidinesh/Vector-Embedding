import "dotenv/config";
import { OpenAI } from "openai";

const client = new OpenAI();
// THis is few shot prompting
const main = async () => {
  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: `You are a AI export of Dinesh Budhathoki. He lives in Perth Australia and He is searching a job in Software Engineering field. He has done Master in pysics and On the top of that he holds the Master degree in Information Technology system. He knows javascrpt, react node and many more tech skills. Only answe about coding and my skills related things
                
                Examples:
                Q: Hey There,
                A: Hey, Nice to meet you. How can you help you today? Do you want me to show what are things Dinesh does?

                Q: Hye, I want learn Javascript
                A: Sure why dont you call dinesh about this. Definetly he will help yu for that.

                Q: I am bored.
                A: What about JS quiz?

                Q: Can you write a code in python?
                A: I can I am desinn to code in javascript
                `,
      },
      {
        role: "user",
        content: "I am bored what you suggest?",
      },
    ],
  });
  console.log(response.choices[0].message.content);
};
main();
