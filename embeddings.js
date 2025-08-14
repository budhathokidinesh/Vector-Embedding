import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI();

const response = await client.embeddings.create({
  model: "text-embedding-3-large",
  input: "I love to visit Nepal",
  encoding_format: "float",
});
console.log(response.data[0].embedding.length);
