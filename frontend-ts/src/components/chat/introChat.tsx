import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import {Send} from 'lucide-react'
import {useEffect} from 'react'
import chat from '@/geminiResponse'
import { motion } from 'framer-motion'

const IntroChatInterface = ({setEmptyChat, insert, message, setMessage, clicked, setClicked, opacity, setOpacity,setStream, setUpdateRequired}: {setEmptyChat: (emptyChat: boolean) => void, insert: (message:string) => void, message:string, setMessage: (message:string) => void, clicked:boolean, setClicked: (clicked:boolean) => void, opacity:number, setOpacity: (opacity:number) => void,setStream: (stream:string) => void, setUpdateRequired: (updateRequired:boolean) => void}) => {
  
  // const [message, setMessage] = useState('')
  // const [clicked, setClicked] = useState(false)
  // const [opacity, setOpacity] =useState(0.2);

  useEffect(() => {
    if(clicked && message.length>0) {
      setClicked(false)
      insert(message) 
      setEmptyChat(false)
      setUpdateRequired(true)
      let response = ""

      chat(
          {parts:[{text:message}],role:"user"},
          (chunk)=> {
              response+=chunk;
              setStream(response);
          }
      ).then(()=>{
          insert(response);
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
    <div className="flex flex-1 w-full flex-col justify-center items-center gap-6 px-4">
      <div >
        <h2 className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Ask me any DSA concept
        </h2>
      </div>
      
      <motion.div 
        whileHover={{ scale: 1.02, boxShadow: "0px 20px 40px rgba(0,0,0,0.1)" }}
        transition={{ type: "spring", stiffness: 200 }}
        className="relative w-full max-w-4xl backdrop-blur-sm border border-white/20 shadow-2xl rounded-2xl p-6 transition-all"
      >
        <Textarea   
          placeholder="Ask any DSA concept like 'Explain Binary Search' or 'Explain Graph Traversal'..."
          className="min-h-[60px] resize-none border-0 ring-0 focus:outline-none focus-visible:ring-0 shadow-none bg-transparent text-gray-800 placeholder:text-gray-500 text-lg pr-16"
          id="chat"
          value={message}
          onChange={(e)=>{setMessage(e.target.value)}}
          onKeyDown={(e)=>{if(e.key==='Enter')setClicked(true)}}   
        />
        <Button 
          size="icon"
          variant="ghost"
          className="absolute bottom-4 right-4 h-12 w-12 p-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
          style={{opacity:opacity}}
          onClick={()=>{if(message.length>0)setClicked(true)}}
        >
          <Send className="h-5 w-5 text-white" />
        </Button>
      </motion.div>

    </div>
  );
}
 
export default IntroChatInterface;