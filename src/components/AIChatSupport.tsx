import {useState,useEffect} from "react"
import fetchAPI from "../api/fetchAPI.ts";




const BubbleMessage = ({message,id,isUser}: { message: string,id:number,isUser:boolean }) => {
    function cleanText(input: string): string {

        const cleaned = input
            // Convert markdown italics to <em>
            .replace(/\*([^*]+)\*/g, '<em>$1</em>')
            //convert the Hash + to subtitles
            .replace(/##+ (.+)/g, '<strong>$1</strong>')



            // Convert markdown bold to <strong>
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            // Convert numbered lists
            .replace(/(\d+\.\s+)(.+)/g, '<li>$2</li>')
            // Convert dashed lists
            .replace(/-\s+(.+)/g, '<li>$1</li>')
            .replace(/<\/?em>/g, '')    // Remove <em> and </em> tags
            .replace(/\*+/g, '');
        // Preserve paragraphs
            //.replace(/\n\n/g, '</p><p>')
            // Convert single newlines to line breaks
            //.replace(/\n/g, '<br/>');


        return cleaned;

    }

    const formattedHTML = cleanText(message);
    return (
        <div key={id} className={` w-2/3 min-h-10 h-auto  flex text-wrap  items-center ${isUser ? 'justify-end' : 'justify-start'} `}>
            <p className={`text-wrap`}>{isUser ? message : formattedHTML}</p>
        </div>
    )
}


const AiChatSupport = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [message, setMessgae] = useState<{ text: string; isUser: boolean; id: number }[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [input, setInput] = useState("");



    const handleClick = () => {
    setIsOpen((prev) => !prev)
    }


    interface InputUser {
        text:string,
        isUser: boolean,
    }
    const handleMessage = (inputUser: InputUser) => {
        const { text, isUser } = inputUser;
        setMessgae((prevMessages) => {
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
    useEffect(() => {


    }, []);
    const sendHandler = async () =>{
        console.log(input)
        setIsLoading(true);
        handleMessage({ text: input, isUser: true })
        const aiRespone = await  fetchAPI({prompt: input});
        setInput("")

        if(aiRespone){
            setIsLoading(false);
            handleMessage({ text: aiRespone, isUser: false })
        }
    }
    return (
        <div  className={`fixed  bottom-4 right-4 cursor-pointer ${isOpen ? 'lg:w-10':'lg:w-24'}  lg:h-10 transition-all ease-in-out duration-500  py-1 px-1 rounded-2xl bg-slate-400 sm:w-24 flex justify-start item-end`}>
            {/*the shape with the chat is minimized with an avatar or icon and a simple text that ask the user is he want a support or help */}
                        <div onClick={handleClick} className={`flex justify-around items-center w-full transition-all ease-in-out duration-500 `}>
                            <img className={`rounded-full bg-blue-50`} width={28} height={28}/>
                        <h6 className={`text-right font-semibold  ${isOpen ? 'hidden':'block'}`}>Help?</h6>
                        </div>
            {/*The Chat Window*/}
                    <div className={`absolute bottom-12 right-1 w-96 h-96  bg-slate-400 rounded-2xl  ${isOpen ? 'scale-100':'scale-0'} flex flex-col justify-center items-center  transition-all ease-in-out duration-500`}>

                                        <div className={`w-[95%] overflow-hidden bg-slate-200  h-[95%] rounded-2xl flex flex-col justify-center items-center `}>
                                            <div className={`w-full h-[90%] flex flex-col justify-start items-center py-2 overflow-x-hidden overflow-y-auto`}>
                                            {/* the chat box */}
                                            {message.map((item) => (
                                                // Each child in a list should have a unique "key" prop
                                                <div key={item.id} className={`flex flex-row border-b-[1px] border-slate-400 w-full h-auto items-center ${item.isUser? 'justify-end' : 'justify-start'} p-2`}>
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
                                                </div>
                                            ))}


                                            </div>
                            {/* the messgae input box*/}
                            <div className={`w-full h-[10%] bg-slate-300`}>
                                <input type={`text`} value={input}  onChange={(e) => setInput(e.target.value)} className={`w-[85%] h-full  bg-transparent px-2`}/>
                                <button onClick={sendHandler} className={`w-[15%] h-full hover:bg-slate-500 font-semibold  hover:text-white transition-all duration-300 ease-in-out`}>{isLoading? '...Loading' : 'Send'}</button>
                            </div>
                                        </div>
                        </div>



    </div>
    )
}
export default AiChatSupport
