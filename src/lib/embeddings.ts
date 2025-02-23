// import { Pinecone } from "@pinecone-database/pinecone";

// const client = new Pinecone({
//   apiKey: 
// });

// const model = "multilingual-e5-large"; // Specify the model you want to use

// export async function getEmbeddings(text: string) {
//   try {
//     const response = await client.inference.embed({
//       model: model,
//       input: [text.replace(/\n/g, " ")],
//       params: { inputType: "passage", truncate: "END" }, // Adjust parameters as needed
//     });

//     console.log("Pinecone embedding response:", response);
//     return response.data[0].embedding as number[];
//   } catch (error) {
//     console.error("Error generating embeddings with Pinecone:", error);
//     throw error;
//   }
// }

import { Pinecone } from '@pinecone-database/pinecone';

const client = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const model = 'multilingual-e5-large';
export async function getEmbeddings(text: string): Promise<number[]> {
  try {
    const response = await client.inference.embed(
      model,
      [text.replace(/\n/g, " ")],
      { inputType: 'passage', truncate: 'END' }
    );

    console.log('Pinecone embedding response:', response);

    if (response && response.length > 0) {
      return response[0].values as number[];
    } else {
      throw new Error('No embeddings returned.');
    }
  } catch (error) {
    console.error('Error generating embeddings:', error);
    throw error;
  }
}
