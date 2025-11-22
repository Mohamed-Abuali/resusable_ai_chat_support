import { useState} from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { BubbleMessage } from './AIChatSupportBubble'
import { Spinner } from "@/components/ui/spinner"
import fetchAPI from "../api/fetchAPI.ts";
 interface InputUser {
        text:string,
        isUser: boolean,
    }

interface BoxProp{
    isOpen:boolean;

}    
const AIChatSupportBox = ({isOpen}:BoxProp) => {

    const [message, setMessage] = useState<{ text: string; isUser: boolean; id: number }[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [input, setInput] = useState("");


    const handleMessage = (inputUser: InputUser) => {
        const { text, isUser } = inputUser;
        setMessage((prevMessages) => {
            return [
                ...prevMessages,
                {
                    text,
                    isUser,
                    id: Date.now(),
                },
            ];
        });
    };

    const sendHandler = async () =>{
       
        setIsLoading(true);
        handleMessage({ text: input, isUser: true })
        const aiResponse = await  fetchAPI({prompt: input});
        setInput("")

        if(aiResponse){
            setIsLoading(false);
            handleMessage({ text: aiResponse, isUser: false })
        }
    }



  return (
    <Card className={`w-[clamp(300px,40vw,500px)] ${isOpen ? 'block':'hidden'}`}>
                <CardHeader>
                    <CardTitle>AI Chat Support</CardTitle>

                </CardHeader>
          <CardContent>
            {/*the shape with the chat is minimized with an avatar or icon and a simple text that ask the user is he want a support or help */}
                    <ScrollArea className="h-72 w-full rounded-md">
            {/*The Chat Window*/}
                                  
                                            {/* the chat box */}
                                            {message.map((item) => (
                                                // Each child in a list should have a unique "key" prop
                                                <div key={item.id} className={` p-2`}>
                                                    {item.isUser ? (
                                                        <BubbleMessage
                                                            id={item.id}
                                                            message={item.text}
                                                            isUser={item.isUser}

                                                        />
                                                    ) : (
                                                        <BubbleMessage
                                                            id={item.id}
                                                            message={item.text}
                                                            isUser={item.isUser}

                                                        />
                                                    )}
                                                     <Separator className="mt-2 bg-gray-800" />
                                                </div>
                                            ))}

                            </ScrollArea>
                                         
                                        </CardContent>
                        <CardFooter className="flex-row gap-2">
                            {/* the message input box*/}
                                  
                                        <Input type={`text`} value={input}  onChange={(e) => setInput(e.target.value)} className={`w-[85%] h-full  bg-transparent px-2`}/>
                                        <Button onClick={sendHandler} className={`w-[15%] cursor-pointer h-full hover:bg-slate-500 font-semibold  hover:text-white transition-all duration-300 ease-in-out`}>{isLoading? <Spinner /> : 'Send'}</Button>
                        </CardFooter>
    
    
        </Card>
  )
}

export default AIChatSupportBox