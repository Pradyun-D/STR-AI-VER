import './App.css'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import IntroChatInterface from './components/chat/introChat'
import ChatArea from './components/chat/chatArea'
import {useState, useEffect} from 'react'
import { useUser, useSession } from '@clerk/clerk-react'
import { createClient } from '@supabase/supabase-js'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { useClerk } from '@clerk/clerk-react'
import LandingPage from './components/landingPage'
// import { ThemeProvider } from "@/components/theme-provider"

const SignOutButton = () => {
  const { signOut } = useClerk()

  return (
    <button 
      onClick={() => signOut()}
      className="text-red-500 hover:text-red-700 transition-colors"
    >
      Sign out
    </button>
  )
}

function App() {
  const [emptyChat, setEmptyChat] = useState(true)
  const [message, setMessage] = useState('')
  const [clicked, setClicked] = useState(false)
  const [opacity, setOpacity] = useState(0.2)
  const [stream, setStream] = useState("")
  const [updateRequired, setUpdateRequired] = useState(false)
  const [chatMessages, setChatMessages] = useState<any[]>([])
  const { session } = useSession()
  const { user } = useUser()  

  useEffect(() => {
    const setup = async () => {
      const token = await session?.getToken();
      console.log("Token:", token);
    };
    if (session) setup();
  }, [session]);  
  
  // client to access the db
  function createClerkSupabaseClient() {
    return createClient(
      import.meta.env.VITE_SUPABASE_URL!,
      import.meta.env.VITE_SUPABASE_ANON_KEY!,
      {
        async accessToken() {
          return session?.getToken() ?? null
        },
      },
    )
  }
  const client = createClerkSupabaseClient()

  //Hook to retrieve the old chat messages from the db whenever the user logs in 
  useEffect(() => {
    if (!user) return
    const fetch = async()=>{
      const { data, error } = await client.from('aboutuser').select().eq('user_id', user?.id)
      if (data) setChatMessages(data);
      if (error) {
        console.error("Supabase fetch error:", error);
      }
    }
    fetch()
  }, [user])
  
  //Hook to retrieve the old chat messages from the db
  useEffect(()=>{
    if(updateRequired){

      const fetch = async()=>{
        const { data, error } = await client.from('aboutuser').select().eq('user_id', user?.id)
        if(data) setChatMessages(data)
        if(error) console.error("Supabase insert error:", error);
        setUpdateRequired(false)
      }
      fetch()
    }
  },[updateRequired])

  //insert message to the db
  async function insert(message:string) {
    await client.from('aboutuser').insert({
      user_id: user?.id,
      learnings: {newLearning: message},
      name: user?.fullName || "Anonymous"
    })
    const fetch = async()=>{
      const { data, error } = await client.from('aboutuser').select().eq('user_id', user?.id)
      if(data) setChatMessages(data)
      if(error) console.error("Supabase insert error:", error);
    }
    fetch()
  }    

  return (
    // <ThemeProvider>
      <div className=" min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <SignedOut>
          <LandingPage />
        </SignedOut>
        
        <SignedIn>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className='!m-0 !rounded-none !shadow-none min-h-screen bg-gradient-to-br from-indigo-50 via-sky-100 to-purple-200'>
              <div className="flex flex-col w-full min-h-screen items-center">
                <div className="flex w-full justify-between items-center p-4 backdrop-blur-lg bg-white/5 border-b border-gray-200 dark:border-gray-800 ">  
                  <div className="text-2xl text-gray-800">
                    <h2 className="text-2xl">STR-AI-VER</h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Avatar className="ring-2 ring-white/20 shadow-lg">
                          <AvatarImage src={user?.imageUrl} />
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='mr-4 bg-white/95 border-0 shadow-xl'>
                        <DropdownMenuLabel className="text-gray-700">{user?.fullName}</DropdownMenuLabel>
                        <hr />
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem className='text-red-500 hover:bg-red-50'>
                          <SignOutButton />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="flex-1 flex justify-center items-center w-full px-4 pr-0">
                  {(!chatMessages.length && emptyChat) ? 
                    <IntroChatInterface 
                      setEmptyChat={setEmptyChat} 
                      insert={insert} 
                      message={message} 
                      setMessage={setMessage} 
                      clicked={clicked} 
                      setClicked={setClicked} 
                      opacity={opacity} 
                      setOpacity={setOpacity} 
                      setStream={setStream} 
                      // updateRequired={updateRequired} 
                      setUpdateRequired={setUpdateRequired}
                    /> : 
                    <ChatArea 
                      insert={insert} 
                      chatMessages={chatMessages} 
                      message={message} 
                      setMessage={setMessage} 
                      clicked={clicked} 
                      setClicked={setClicked} 
                      opacity={opacity} 
                      setOpacity={setOpacity} 
                      stream={stream} 
                      setStream={setStream} 
                      setUpdateRequired={setUpdateRequired}
                    />
                  }
                </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </SignedIn>
      </div>
    // </ThemeProvider>
  )
}

export default App