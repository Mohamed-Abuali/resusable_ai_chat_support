import { GoogleGenAI } from "@google/genai";

import bankingIntents from '../../conversation_intents.json' assert { type: 'json' };
const jsonString = JSON.stringify(bankingIntents);

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const ai = new GoogleGenAI({ apiKey: 'AIzaSyBkj5ytpx0afYuc_dKspwMtrgr7vhoxb6o' });


interface fetchPrams {
    prompt:string
}

const fetchAPI= async (prams : fetchPrams= { prompt: 'Hello' }) => {
    const {prompt} = prams;
   





    try {
        const result = await ai.models.generateContent({
            model:"gemini-2.5-flash", 
            contents:prompt,
            config:{
                systemInstruction:`${jsonString}`,
            },
     } )

        if(!result) return 'something went wrong please wait and try again later';
        
        return result?.text;
        

    }catch (err:unknown){
        throw new Error(err instanceof Error ? err.message : String(err))
    }

}



export default  fetchAPI ;