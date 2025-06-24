import './App.css'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ArrowRight } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import IntroChatInterface from './components/chat/introChat'
import ChatArea from './components/chat/chatArea'
import {useState, useEffect} from 'react'
// import { ClerkProvider, useUser, useSession } from '@clerk/clerk-react'
// import { createClient } from '@supabase/supabase-js'



function App() {
  const [emptyChat, setEmptyChat] = useState(true)
  const [message, setMessage] = useState('')
  const [clicked, setClicked] = useState(false)
  const [opacity, setOpacity] =useState(0.2);
  const [stream, setStream] = useState("");
  // const [retrivedState, setRetrivedState] = useState(false)
  // const [oldMessages, setOldMessages] = useState<string[]>([])
  // const [updateRequired, setUpdateRequired] = useState(false)

  // useEffect(()=>{
  //   if(updateRequired){

  //     //read messages from db
  //     const { data, error } = await client.from('aboutuser').select()

      //update chatMessages

      //set updateRequired to false
  //     setUpdateRequired(false)
  //   }
  // },[updateRequired])

  const [chatMessages, setChatMessages] = useState<string[]>([])
  // const { session } = useSession()
  // const { user } = useUser()

  //   // Create a custom Supabase client that injects the Clerk session token into the request headers
  // function createClerkSupabaseClient() {
  //   return createClient(
  //     process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //     process.env.NEXT_PUBLIC_SUPABASE_KEY!,
  //     {
  //       async accessToken() {
  //         return session?.getToken() ?? null
  //       },
  //     },
  //   )
  // }

  // const client = createClerkSupabaseClient()


  // async function readMessages() {
  //   const { data, error } = await client.from('aboutuser').select()
  //   if (!error){
  //     setRetrivedState(true)
  //     return data
  //   } 
  //   else{
  //     setRetrivedState(false)
  //     return null
  //   }
  // }  
  
  // async function insertMessage(message:string) {
  //   await client.from('aboutuser').insert({
  //     learnings: {newLearning: message}
  //   })
  //   window.location.reload()
  // }    

  // useEffect(() => {
  //   if (!user) return
  //   readMessages()
  // }, [user])

  const addMessage = (message:string)=>{
    setChatMessages(prev=>[...prev,message])
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className='!m-0 !rounded-none !shadow-none min-h-screen '>
        <div className="flex flex-col w-full min-h-screen items-center">
          <div className="flex w-full justify-end p-2 m-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='mr-2'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem className='text-red-500'>Logout <ArrowRight className='w-4 h-4' /></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex-1 flex justify-center items-center w-3xl">
            {emptyChat ? <IntroChatInterface emptyChat={emptyChat} setEmptyChat={setEmptyChat} addMessage={addMessage} message={message} setMessage={setMessage} clicked={clicked} setClicked={setClicked} opacity={opacity} setOpacity={setOpacity} stream={stream} setStream={setStream}/> : <ChatArea addMessage={addMessage} chatMessages={chatMessages} message={message} setMessage={setMessage} clicked={clicked} setClicked={setClicked} opacity={opacity} setOpacity={setOpacity} stream={stream} setStream={setStream} />}
          </div>
        </div>

      </SidebarInset>


    </SidebarProvider>
  )
}

export default App