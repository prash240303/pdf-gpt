import { Pinecone } from "@pinecone-database/pinecone";
import { convertToAscii } from "./utils";
import { getEmbeddings } from "./embeddings";

export async function getMatchesFromEmbeddings(
  embeddings: number[],
  fileKey: string
) {
  try {
    const client = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
    const pineconeIndex = await client.index("talk-pdf");
    const namespace = pineconeIndex.namespace(convertToAscii(fileKey));
    const queryResult = await namespace.query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
    });

    if (!queryResult || !queryResult.matches) {
      throw new Error("Unexpected response format from Pinecone.");
    }

    return queryResult.matches || [];
  } catch (error) {
    console.log("Error querying embeddings:", error);
    throw new Error("Failed to query embeddings from Pinecone");
  }
}

export async function getContext(query: string, fileKey: string) {
  try {
    const queryEmbeddings = await getEmbeddings(query);

    // Ensure queryEmbeddings is defined and not empty
    if (!queryEmbeddings || queryEmbeddings.length === 0) {
      throw new Error('Failed to generate embeddings.');
    }

    const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);

    const qualifyingDocs = matches.filter(
      (match) => match.score && match.score > 0.7
    );

    type Metadata = {
      text: string;
      pageNumber: number;
    };

    let docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);
    return docs.join("\n").substring(0, 3000);
  } catch (error) {
    console.log("Error getting context:", error);
    throw new Error("Failed to get context from embeddings");
  }
}
