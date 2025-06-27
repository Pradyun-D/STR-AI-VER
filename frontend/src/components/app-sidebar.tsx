import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { 
  BookOpen, 
  Users, 
  Lightbulb, 
  User, 
  Plus,
} from "lucide-react"
// import { ModeToggle } from "./mode-toggle"

export function AppSidebar() {
  return (
    <Sidebar className="overflow-hidden backdrop-blur-xl bg-white/30 dark:bg-white/10 shadow-md" collapsible="icon" variant="inset">
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Learning Modes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Learn Anything">
                  <BookOpen className="h-4 w-4" />
                  <span>Learn Anything</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Solve Together">
                  <Users className="h-4 w-4" />
                  <span>Solve Together</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Explain the Solution">
                  <Lightbulb className="h-4 w-4" />
                  <span>Explain a Solution</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Know About Yourself">
                  <User className="h-4 w-4" />
                  <span>Know About Yourself</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />


        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="New Chat">
                  <Plus className="h-4 w-4" />
                  <span>New Chat</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>


        <SidebarSeparator />

        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>Binary Tree Traversal</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>Dynamic Programming</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>Graph Algorithms</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* <SidebarSeparator />
        <SidebarFooter>
          <ModeToggle />
        </SidebarFooter> */}

      </SidebarContent>
    </Sidebar>
  )
}