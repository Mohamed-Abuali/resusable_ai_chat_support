import React from 'react'
import { Button } from "@/components/ui/button"

interface ButtonProp{
    onClick:() => void;
    isOpen:boolean;
}


const AIChatSupportButton = ({onClick,isOpen}:ButtonProp) => {
  return (
        <Button onClick={onClick} className={`flex justify-around cursor-pointer items-center w-32 p-3 transition-all ease-in-out duration-500 `}>   
                 <h6 className={`text-right font-semibold`}>{isOpen ? 'Close':'Help?'}</h6>
        </Button>
  )
}

export default AIChatSupportButton