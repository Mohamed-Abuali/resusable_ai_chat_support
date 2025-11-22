import {useState} from "react"
import AIChatSupportBox from "./AIChatSupportBox"
import AIChatSupportButton from "./AIChatSupportButton"







interface Customize {
    color?: string,
    show?: boolean,
    shape?:number,
    avatar?: string,


}




const AiChatSupport = (prams:Customize) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)



    //This handler function to check and change the state of the open and close of the component UI
    const handleClick = () => {
    setIsOpen((prev) => !prev)
    }

   




    return (
        <div className="flex-col gap-2 flex items-end absolute right-5 bottom-5">
            <AIChatSupportBox isOpen={isOpen}/>
            <AIChatSupportButton onClick={handleClick} isOpen={isOpen}/>
        </div>
         
    )

}


export default AiChatSupport











