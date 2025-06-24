import { GoogleGenAI, type Content } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyAxmiforkPSJGi33tZVnohxdk-1EZKdwBE"});

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