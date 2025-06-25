import {useEffect} from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import {Send} from 'lucide-react'
import chat from '@/geminiResponse'
import ReactMarkdown from 'react-markdown';
import { ChatMessageList } from '../ui/chat/chat-message-list'
import { ChatBubble, ChatBubbleMessage } from '../ui/chat/chat-bubble'
import { motion } from 'framer-motion'

const Chat = ({insert, chatMessages, message, setMessage, clicked, setClicked, opacity, setOpacity, stream, setStream,setUpdateRequired}: {insert:(message:string)=>void, chatMessages:any[], message:string, setMessage: (message:string) => void, clicked:boolean, setClicked: (clicked:boolean) => void, opacity:number, setOpacity: (opacity:number) => void, stream:string, setStream: (stream:string) => void, setUpdateRequired: (updateRequired:boolean) => void }) => {

    useEffect(() => {
    if(clicked && message.length>0) {
        setClicked(false)
        insert(message) 
        let response = ""

        chat(
            {parts:[{text:message}],role:"user"},
            (chunk)=> {
                response+=chunk;
                setStream(response);
            }
        ).then(()=>{
            insert(response);
            setUpdateRequired(true)
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
        <div className="flex flex-col h-[87vh] w-full mb-3 rounded-2xl px-6 pr-0 ">
            <div className="flex-1 overflow-y-auto w-full mx-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent rounded-xl">
                <div className="older-messages max-w-4xl mx-auto">
                    <ChatMessageList>
                        {
                            chatMessages.map((item, index)=>{
                                if(index%2===0){
                                    return(
                                        <ChatBubble key={index} variant='sent' className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg px-4 py-2 max-w-[80%] w-fit shadow mb-5">
                                            <ChatBubbleMessage variant='sent'>
                                                <div className="prose prose-sm prose-invert max-w-none">
                                                    <ReactMarkdown>{item.learnings.newLearning}</ReactMarkdown>
                                                </div>
                                            </ChatBubbleMessage>
                                        </ChatBubble>
                                    )
                                }
                                else{
                                    return(
                                        <div key={index} className="text-left max-w-4xl mb-10 ">
                                            <div className="prose prose-sm max-w-none">
                                                <ReactMarkdown>{item.learnings.newLearning}</ReactMarkdown>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }                        
                    </ChatMessageList>
                </div>  
                {
                    stream && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            className="text-left max-w-4xl mb-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-emerald-900 dark:to-green-900 rounded-2xl p-4 border border-green-100 dark:border-emerald-800 shadow-md"
                        >
                            <div className="prose prose-sm max-w-none">
                                <ReactMarkdown>{stream}</ReactMarkdown>
                            </div>
                        </motion.div>
                    )
                }                     
            </div>            
            
            <motion.div
                whileHover={{scale:1.02}}
                className="relative max-w-4xl w-full bg-gray-50/90 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-3 mb-4 border border-gray-200 dark:border-gray-700 mx-auto shadow-lg"
            >
                <Textarea   
                    placeholder="Enter a concept..."
                    className="min-h-[40px] resize-none border-0 ring-0 focus:outline-none focus-visible:ring-0 shadow-none bg-transparent text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-lg pr-16"
                    id="chat"
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                    onKeyDown={(e)=>{if(e.key==='Enter'){e.preventDefault(); setClicked(true)}}}                    
                />
                <Button 
                    size="sm" 
                    className="absolute bottom-2 right-2 h-8 w-8 p-0 bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 dark:from-sky-400 dark:to-violet-400 dark:hover:from-sky-500 dark:hover:to-violet-500 shadow-lg"
                    style={{opacity:opacity}}
                    onClick={() => {
                        if(message.length > 0) setClicked(true)
                    }}
                >
                    <Send className="h-4 w-4 text-white" />
                </Button>
            </motion.div>
        </div>
    );
}
 
export default Chat;