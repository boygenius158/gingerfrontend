'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bookmark, Compass, Heart, Home, Instagram, MessageCircle, MoreHorizontal, PlusSquare, Search, Send, User } from "lucide-react"
import Image from "next/image"

export function InstagramHomeComponent() {
  return (
    (<div className="flex min-h-screen bg-background">
      {/* Sidebar for large screens */}
      <aside className="hidden lg:flex flex-col w-64 border-r p-5 space-y-6">
        <Instagram className="h-8 w-8" />
        <nav className="space-y-4">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="h-5 w-5 mr-3" />
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Search className="h-5 w-5 mr-3" />
            Search
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Compass className="h-5 w-5 mr-3" />
            Explore
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <MessageCircle className="h-5 w-5 mr-3" />
            Messages
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Heart className="h-5 w-5 mr-3" />
            Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <PlusSquare className="h-5 w-5 mr-3" />
            Create
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <User className="h-5 w-5 mr-3" />
            Profile
          </Button>
        </nav>
      </aside>
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-10 bg-background border-b lg:hidden">
          <div className="container flex items-center justify-between h-16 px-4">
            <Instagram className="h-8 w-8" />
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <PlusSquare className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon">
                <Send className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-4 pb-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center space-y-1">
                    <Avatar className="w-16 h-16 border-2 border-primary p-1">
                      <AvatarImage src={`/placeholder.svg?height=64&width=64`} alt={`User ${i + 1}`} />
                      <AvatarFallback>U{i + 1}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">User {i + 1}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {[...Array(5)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={`Post author ${i + 1}`} />
                    <AvatarFallback>A{i + 1}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">author{i + 1}</p>
                    <p className="text-xs text-muted-foreground">Location {i + 1}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Image
                    src={`/placeholder.svg?height=400&width=400`}
                    alt={`Post ${i + 1}`}
                    className="w-full h-auto aspect-square object-cover" />
                </CardContent>
                <CardFooter className="flex flex-col items-start space-y-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex space-x-4">
                      <Button variant="ghost" size="icon">
                        <Heart className="h-6 w-6" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MessageCircle className="h-6 w-6" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Send className="h-6 w-6" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Bookmark className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">1,234 likes</p>
                    <p className="text-sm">
                      <span className="font-medium">author{i + 1}</span> This is a sample caption for post {i + 1}...
                    </p>
                    <p className="text-sm text-muted-foreground">View all 100 comments</p>
                    <p className="text-xs text-muted-foreground uppercase">2 hours ago</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>

        {/* Footer navigation for small screens */}
        <footer className="sticky bottom-0 z-10 bg-background border-t lg:hidden">
          <div className="container flex items-center justify-between h-16 px-4">
            <Button variant="ghost" size="icon">
              <Home className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <PlusSquare className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6" />
            </Button>
          </div>
        </footer>
      </div>
    </div>)
  );
}