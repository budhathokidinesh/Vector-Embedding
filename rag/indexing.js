//this is for rag
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";

//This is for setting the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

//This is for reading the pdf file
const pdfFilePath = path.join(__dirname, "Dinesh.pdf");

async function init() {
  const loader = new PDFLoader(pdfFilePath);

  //page by page load the pdf file
  const docs = await loader.load();

  //ready the openai embedding model
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large",
  });
  const vectoreStore = await QdrantVectorStore.fromDocuments(docs, embeddings, {
    url: "http://localhost:6333",
    collectionName: "dinesh-collection",
  });
  console.log("Indexing of documents done...");
}
init();
