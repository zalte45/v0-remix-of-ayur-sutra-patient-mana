"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Search, Plus, MessageCircle } from "lucide-react"

interface Message {
  id: number
  senderId: string
  senderName: string
  senderType: "doctor" | "patient"
  content: string
  timestamp: string
  read: boolean
}

interface Conversation {
  id: string
  participantName: string
  participantType: "doctor" | "patient"
  participantAvatar: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  messages: Message[]
}

interface ChatInterfaceProps {
  userType: "doctor" | "patient"
  currentUserId: string
  currentUserName: string
}

export function ChatInterface({ userType, currentUserId, currentUserName }: ChatInterfaceProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock conversations data
  const [conversations, setConversations] = useState<Conversation[]>(
    userType === "doctor"
      ? [
          {
            id: "conv-1",
            participantName: "Priya Sharma",
            participantType: "patient",
            participantAvatar: "PS",
            lastMessage: "Thank you for the session today. I'm feeling much better!",
            lastMessageTime: "2 hours ago",
            unreadCount: 2,
            messages: [
              {
                id: 1,
                senderId: "patient-1",
                senderName: "Priya Sharma",
                senderType: "patient",
                content: "Hello Dr. Kumar, I wanted to ask about the Abhyanga massage frequency.",
                timestamp: "10:30 AM",
                read: true,
              },
              {
                id: 2,
                senderId: currentUserId,
                senderName: currentUserName,
                senderType: "doctor",
                content:
                  "Hello Priya! For your current condition, I recommend 3 sessions per week for optimal results.",
                timestamp: "10:45 AM",
                read: true,
              },
              {
                id: 3,
                senderId: "patient-1",
                senderName: "Priya Sharma",
                senderType: "patient",
                content: "That sounds perfect. Should I continue with the herbal supplements as well?",
                timestamp: "11:00 AM",
                read: true,
              },
              {
                id: 4,
                senderId: currentUserId,
                senderName: currentUserName,
                senderType: "doctor",
                content: "Yes, please continue with the Triphala supplements. Take them 30 minutes before meals.",
                timestamp: "11:15 AM",
                read: true,
              },
              {
                id: 5,
                senderId: "patient-1",
                senderName: "Priya Sharma",
                senderType: "patient",
                content: "Thank you for the session today. I'm feeling much better!",
                timestamp: "2:30 PM",
                read: false,
              },
            ],
          },
          {
            id: "conv-2",
            participantName: "Amit Patel",
            participantType: "patient",
            participantAvatar: "AP",
            lastMessage: "When should I schedule my next consultation?",
            lastMessageTime: "1 day ago",
            unreadCount: 1,
            messages: [
              {
                id: 1,
                senderId: "patient-2",
                senderName: "Amit Patel",
                senderType: "patient",
                content: "Dr. Kumar, the digestive issues have improved significantly after the Panchakarma treatment.",
                timestamp: "Yesterday 3:00 PM",
                read: true,
              },
              {
                id: 2,
                senderId: currentUserId,
                senderName: currentUserName,
                senderType: "doctor",
                content: "That's wonderful to hear, Amit! The treatment is working well for you.",
                timestamp: "Yesterday 3:15 PM",
                read: true,
              },
              {
                id: 3,
                senderId: "patient-2",
                senderName: "Amit Patel",
                senderType: "patient",
                content: "When should I schedule my next consultation?",
                timestamp: "Yesterday 4:00 PM",
                read: false,
              },
            ],
          },
          {
            id: "conv-3",
            participantName: "Sunita Reddy",
            participantType: "patient",
            participantAvatar: "SR",
            lastMessage: "The Shirodhara session was amazing!",
            lastMessageTime: "2 days ago",
            unreadCount: 0,
            messages: [
              {
                id: 1,
                senderId: "patient-3",
                senderName: "Sunita Reddy",
                senderType: "patient",
                content: "The Shirodhara session was amazing! I slept so well last night.",
                timestamp: "2 days ago 6:00 PM",
                read: true,
              },
              {
                id: 2,
                senderId: currentUserId,
                senderName: currentUserName,
                senderType: "doctor",
                content:
                  "I'm so glad to hear that! Shirodhara is excellent for improving sleep quality and reducing stress.",
                timestamp: "2 days ago 6:30 PM",
                read: true,
              },
            ],
          },
        ]
      : [
          {
            id: "conv-1",
            participantName: "Dr. Rajesh Kumar",
            participantType: "doctor",
            participantAvatar: "RK",
            lastMessage: "Yes, please continue with the Triphala supplements. Take them 30 minutes before meals.",
            lastMessageTime: "2 hours ago",
            unreadCount: 1,
            messages: [
              {
                id: 1,
                senderId: currentUserId,
                senderName: currentUserName,
                senderType: "patient",
                content: "Hello Dr. Kumar, I wanted to ask about the Abhyanga massage frequency.",
                timestamp: "10:30 AM",
                read: true,
              },
              {
                id: 2,
                senderId: "doctor-1",
                senderName: "Dr. Rajesh Kumar",
                senderType: "doctor",
                content:
                  "Hello Priya! For your current condition, I recommend 3 sessions per week for optimal results.",
                timestamp: "10:45 AM",
                read: true,
              },
              {
                id: 3,
                senderId: currentUserId,
                senderName: currentUserName,
                senderType: "patient",
                content: "That sounds perfect. Should I continue with the herbal supplements as well?",
                timestamp: "11:00 AM",
                read: true,
              },
              {
                id: 4,
                senderId: "doctor-1",
                senderName: "Dr. Rajesh Kumar",
                senderType: "doctor",
                content: "Yes, please continue with the Triphala supplements. Take them 30 minutes before meals.",
                timestamp: "11:15 AM",
                read: false,
              },
            ],
          },
        ],
  )

  const filteredConversations = conversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const selectedConv = conversations.find((conv) => conv.id === selectedConversation)

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return

    const newMsg: Message = {
      id: Date.now(),
      senderId: currentUserId,
      senderName: currentUserName,
      senderType: userType,
      content: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      read: true,
    }

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === selectedConversation) {
          return {
            ...conv,
            messages: [...conv.messages, newMsg],
            lastMessage: newMessage.trim(),
            lastMessageTime: "Just now",
          }
        }
        return conv
      }),
    )

    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-[calc(100vh-12rem)] bg-background">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Messages</h3>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Chat
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
                  selectedConversation === conversation.id
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-accent/50"
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>{conversation.participantAvatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm truncate">{conversation.participantName}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{conversation.lastMessageTime}</span>
                        {conversation.unreadCount > 0 && (
                          <Badge variant="default" className="h-5 w-5 p-0 text-xs flex items-center justify-center">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground truncate mt-1">{conversation.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>{selectedConv.participantAvatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedConv.participantName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedConv.participantType === "doctor" ? "Ayurvedic Doctor" : "Patient"}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {selectedConv.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === currentUserId ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.senderId === currentUserId ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.senderId === currentUserId ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
