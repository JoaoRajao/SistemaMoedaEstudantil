"use client";

import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  Home,
  Search,
  Settings,
  User2,
  GraduationCap,
  Briefcase,
  BookOpen,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Menu items with updated icons.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Aluno",
    icon: GraduationCap,
    subItems: [
      { title: "Crud", url: "/aluno/crud" },
      { title: "Menu", url: "/aluno/menu" },
    ],
  },
  {
    title: "Professor",
    icon: BookOpen,
    subItems: [
      { title: "Crud", url: "/professor/crud" },
      { title: "Menu", url: "/professor/menu" },
    ],
  },
  {
    title: "Empresa",
    icon: Briefcase,
    subItems: [
      { title: "Crud", url: "/empresa/crud" },
      { title: "Menu", url: "/empresa/menu" },
    ],
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const router = useRouter();

  return (
    <Sidebar>
      {/* Sidebar Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  Tipo de Usuario
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem asChild>
                  <a href="/admin/login">Admin</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/aluno/login">Aluno</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/professor/login">Professor</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/empresa/login">Empresa</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Sidebar Content with Actions and Submenus */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* Collapsible Menu with SubItems */}
                  <Collapsible defaultOpen className="group/collapsible">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                          {item.subItems && <ChevronDown className="ml-auto" />}
                        </a>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    {/* Sidebar Menu SubItems */}
                    {item.subItems && (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>{subItem.title}</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={() => router.push("/aluno/perfil")}>
                  <span>Perfil Aluno</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/empresa/perfil")}
                >
                  <span>Perfil Empresa</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
