//this is for rag
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import "dotenv/config";

async function init() {
  const pdfFilePath = "./Dinesh.pdf";
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
