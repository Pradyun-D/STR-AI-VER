import {useState, useEffect} from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import {Send} from 'lucide-react'
import chat from '@/geminiResponse'
import ReactMarkdown from 'react-markdown';
import { ChatMessageList } from '../ui/chat/chat-message-list'
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '../ui/chat/chat-bubble'
import { motion } from 'framer-motion'

const Chat = ({addMessage, chatMessages, message, setMessage, clicked, setClicked, opacity, setOpacity, stream, setStream}: {addMessage:(message:string)=>void, chatMessages:string[], message:string, setMessage: (message:string) => void, clicked:boolean, setClicked: (clicked:boolean) => void, opacity:number, setOpacity: (opacity:number) => void, stream:string, setStream: (stream:string) => void }) => {



    useEffect(() => {
    if(clicked && message.length>0) {
        setClicked(false)
        addMessage(message) 
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
        // <div className="flex flex-col items-center justify-center min-h-full bg-gray-50">
        <div className="flex flex-col h-[87vh] w-full mb-3 bg-white px-4">
            <div className="flex-1 overflow-y-auto w-full max-w-4xl">
                <div className="older-messages">
                    <ChatMessageList>
                        {
                            
                            chatMessages.map((message, index)=>{
                                
                                if(index%2===0){
                                    return(
                                        <ChatBubble key={index} variant='sent' className="bg-[#6b21a8] text-white rounded-md px-1 py-1 max-w-[80%] w-fit">
                                        {/* <ChatBubbleAvatar fallback='User' /> */}
                                        <ChatBubbleMessage variant='sent'>
                                        <ReactMarkdown>{message}</ReactMarkdown>
                                        </ChatBubbleMessage>
                                        </ChatBubble>
                                    )

                                }
                                else{
                                    return(
                                        // <ChatBubble key={index} variant='received'>
                                        // <ChatBubbleAvatar fallback='AI' />
                                        // <ChatBubbleMessage variant='received'>
                                        //   <ReactMarkdown>{message}</ReactMarkdown>.
                                        // </ChatBubbleMessage>
                                        // </ChatBubble>
                                        <div key={index} className="text-left max-w-4xl mb-4"><ReactMarkdown>{message}</ReactMarkdown></div>
                                    )
                                }
                                
                            })
                        }                        
                    </ChatMessageList>
                    
                    
                </div>  
                {
                    stream && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-left"><ReactMarkdown>{stream}</ReactMarkdown></motion.div>)
                }                     
            </div>            
                {/* </div> */}
            
            <motion.div
                whileHover={{scale:1.01}}
                className="relative max-w-4xl w-full shadow-md rounded-xl p-4 mb-2 ">
                <Textarea   
                    placeholder="Enter a concept..."
                    className="h-[40px] resize-none border-0 ring-0 focus:outline-none"
                    id="chat"
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                    onKeyDown={(e)=>{if(e.key==='Enter'){e.preventDefault(); setClicked(true)}}}                    
                />
                <Button 
                    size="sm" 
                    className="absolute bottom-3 right-3 h-8 w-8 p-0"
                    style={{opacity:opacity}}
                >
                    <Send className="h-4 w-4" />
                </Button>
            </motion.div>
        </div>
        // </div>

    );
}
 
export default Chat;