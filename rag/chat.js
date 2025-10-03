import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import OpenAI from "openai";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const client = new OpenAI();

async function chat() {
  const userQuery = "Who is mahesh?";
  //ready the openai embedding model
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large",
  });

  //making vectore store
  const vectoreStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: "http://localhost:6333",
      collectionName: "dinesh-collection",
    }
  );
  const vectorSearcher = vectoreStore.asRetriever({
    k: 3,
  });
  const releventChunks = await vectorSearcher.invoke(userQuery);

  const SYSTEM_PROMPT = `
  You are an AI assitant who helps resolving user query based on the context available to you from a PDF file with the content and page number.

  Only give answer based on the available context from the file only.

  Context:
  ${JSON.stringify(releventChunks)}
  `;
  const response = await client.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: userQuery,
      },
    ],
  });
  console.log(`${response.choices[0].message.content}`);
}
chat();
