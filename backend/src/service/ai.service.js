const  { GoogleGenAI }= require("@google/genai")

const ai = new GoogleGenAI({
  apiKey:process.env.GOOGLE_API_KEY
});
let memory=[];
async function Chatbot(prompt) {

   const contents=[
    ...memory.map(m=>({
      role:m.role,
      parts: [{text:m.text}]
    })),
    {
      role:"user",
      parts:[
        {
          text:prompt
        },
      ]
    }

   ]


  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
  });

  const text =response.text
  memory.push({role:'user',text:prompt})
  memory.push({role:'model',text})

  return text;
}

module.exports= Chatbot;

