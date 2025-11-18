import {GoogleGenerativeAI } from '@google/generative-ai'

import bankingIntents from '../../conversation_intents.json' assert { type: 'json' };
const jsonString = JSON.stringify(bankingIntents);

const genAI = new GoogleGenerativeAI('AIzaSyBwG0Z3KKMp-DtAJCmxEGjBBEV1WH5vrU8')

const model = genAI.getGenerativeModel({

    model :  "gemini-1.5-flash",
    systemInstruction:`${jsonString}`
})

interface fetchPrams {
    prompt:string
}

const fetchAPI= async (prams : fetchPrams= { prompt: 'Hello' }) => {
    const {prompt} = prams;
    console.log(prompt)





    try {
        const result = await model.generateContent(prompt)

        if (!result) {

            console.log("...loading")
        }
        console.log(result.response.text())


        return result.response.text();

    }catch (err:any){
        throw new err.message(err.message)
    }

}



export default  fetchAPI ;