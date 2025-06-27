import { GoogleGenAI, type Content } from "@google/genai";


const api_key = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: api_key});

async function chat(message:Content, onChunk: (text:string)=>void) {
  const stream = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: message,
  });
  
  for await (const chunk of stream){
    onChunk(chunk.text || "");
  }

}

export default chat;