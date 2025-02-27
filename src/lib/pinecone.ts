import {
  Pinecone,
  PineconeRecord,
} from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import md5 from "md5";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";

import { getEmbeddings } from "./embeddings";
import { convertToAscii } from "./utils";



let pinecone: Pinecone | null = null;

export const getPineconeClient = () => {
  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
  }
  return pinecone;
};

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function loadS3IntoPinecone(fileKey: string) {


  // 1. obtain the pdf -> downlaod and read from pdf
  console.log("downloading from s3");
  console.log("fileKey to download from s3", fileKey);

  const file_name = await downloadFromS3(fileKey);
  if (!file_name) {
    console.error("Error: File was not downloaded from S3.");
    throw new Error("File download failed.");
  }

  console.log("Downloaded file path:", file_name);

  const loader = new PDFLoader(file_name);


  const pages = (await loader.load()) as PDFPage[];
  console.log("pages", pages);

  // 2. split and segment the pdf , each page is broken into smaller chunks 
  const documents = await Promise.all(pages.map(prepareDocument));
  console.log("documents", documents);

  // 3. vectorise and embed individual documents
  const vectors = await Promise.all(documents.flat().map(embedDocument));
  console.log("vectors", vectors);

  // 4. upload to pinecone
  const client = await getPineconeClient();

  const pineconeIndex = await client.index("talk-pdf");

  console.log("inserting vectors into pinecone");

  const namespace = pineconeIndex.namespace(convertToAscii(fileKey));
  console.log("namespace", namespace);
  await namespace.upsert(vectors);

  return documents[0];

}


async function embedDocument(doc: Document) {
  try {
    console.log("document ka pagecontent", doc.pageContent);
    const embeddings = await getEmbeddings(doc.pageContent);
    console.log("Embeddings for document:", embeddings); // Log the embeddings
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord;
  } catch (error) {
    console.log("error embedding document", error);
    throw error;
  }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page: PDFPage) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");
  // split the docs
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs;
}