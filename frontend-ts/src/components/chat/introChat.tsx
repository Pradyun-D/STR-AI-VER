import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import {Send} from 'lucide-react'
import {useState, useEffect} from 'react'
import chat from '@/geminiResponse'
import { motion } from 'framer-motion'
const IntroChatInterface = ({emptyChat, setEmptyChat, addMessage, message, setMessage, clicked, setClicked, opacity, setOpacity, stream, setStream}: {emptyChat: boolean, setEmptyChat: (emptyChat: boolean) => void, addMessage: (message:string) => void, message:string, setMessage: (message:string) => void, clicked:boolean, setClicked: (clicked:boolean) => void, opacity:number, setOpacity: (opacity:number) => void, stream:string, setStream: (stream:string) => void}) => {
  
  // const [message, setMessage] = useState('')
  // const [clicked, setClicked] = useState(false)
  // const [opacity, setOpacity] =useState(0.2);

  useEffect(() => {
    if(clicked && message.length>0) {
        setClicked(false)
        addMessage(message) 
        setEmptyChat(false)
        let response = ""

        chat(
            {parts:[{text:message}],role:"user"},
            (chunk)=> {
                response+=chunk;
                setStream(response);
            }
        ).then(()=>{
            addMessage(response);
            setStream("");
        });
        setMessage('')
    }
    }, [clicked, message])

  useEffect(()=>{
    if(message.trim().length>0) setOpacity(1)
    else setOpacity(0.2)
  },[message])
    
    return (  
      <div className="flex flex-1 w-full flex-col justify-center items-center gap-4 px-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h2 className="font-semibold text-lg">Ask me any DSA concept</h2>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02, boxShadow: "0px 8px 20px rgba(0,0,0,0.1)" }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative w-full max-w-4xl bg-white border border-gray-200 shadow-xl rounded-xl p-4 transition-all hover:shadow-2xl">
          <Textarea   
            placeholder="Enter a concept..."
            className="min-h-[80px] resize-none border-0 ring-0 focus:outline-none focus:ring-red-500 rounded-lg pr-16  rounded-br-none text-sm placeholder:text-gray-400"
            id="chat"
            value={message}
            onChange={(e)=>{setMessage(e.target.value)}}
            onKeyDown={(e)=>{if(e.key==='Enter')setClicked(true)}}   
          />
          <Button 
            size="icon"
            variant="ghost"
            className="absolute bottom-3 right-3 h-8 w-8 p-0"
            style={{opacity:opacity}}
            onClick={()=>{if(message.length>0)setClicked(true)}}
          >
            <Send className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    );
}
 
export default IntroChatInterface;