"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Bot, User, X, Minimize2, Maximize2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  suggestions?: string[]
}

const ayurvedaKnowledge = {
  doshas: {
    vata: "Air and space elements, governs movement and nervous system",
    pitta: "Fire and water elements, governs metabolism and digestion",
    kapha: "Earth and water elements, governs structure and immunity",
  },
  treatments: {
    abhyanga: "Full body oil massage to balance doshas and improve circulation",
    shirodhara: "Continuous oil pouring on forehead for mental relaxation",
    panchakarma: "Five-action detoxification and rejuvenation therapy",
    nasya: "Nasal administration of medicines for head and neck disorders",
    basti: "Medicated enemas for vata disorders and detoxification",
  },
  lifestyle: {
    diet: "Eat according to your dosha type and seasonal changes",
    exercise: "Gentle yoga and pranayama for mind-body balance",
    sleep: "Early to bed, early to rise following natural circadian rhythms",
  },
}

const quickSuggestions = [
  "What is my dosha type?",
  "Benefits of Panchakarma",
  "Ayurvedic diet recommendations",
  "How to reduce stress naturally?",
  "Best time for meditation",
  "Seasonal wellness tips",
]

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Namaste! I'm AyurBot, your AI assistant for Ayurvedic wellness. I can help you understand doshas, treatments, lifestyle recommendations, and answer questions about your therapy journey. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
      suggestions: quickSuggestions.slice(0, 3),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase()

    // Dosha-related queries
    if (
      message.includes("dosha") ||
      message.includes("vata") ||
      message.includes("pitta") ||
      message.includes("kapha")
    ) {
      if (message.includes("vata")) {
        return {
          content: `Vata dosha represents ${ayurvedaKnowledge.doshas.vata}. People with dominant Vata tend to be creative, energetic, but may experience anxiety or digestive issues when imbalanced. Warm, nourishing foods and regular routines help balance Vata.`,
          suggestions: ["Vata balancing foods", "Vata daily routine", "Vata yoga practices"],
        }
      } else if (message.includes("pitta")) {
        return {
          content: `Pitta dosha represents ${ayurvedaKnowledge.doshas.pitta}. Pitta-dominant individuals are typically focused and intelligent but may experience anger or inflammation when imbalanced. Cooling foods and moderate exercise help balance Pitta.`,
          suggestions: ["Pitta cooling foods", "Pitta meditation", "Pitta lifestyle tips"],
        }
      } else if (message.includes("kapha")) {
        return {
          content: `Kapha dosha represents ${ayurvedaKnowledge.doshas.kapha}. Kapha types are usually calm and stable but may experience sluggishness or weight gain when imbalanced. Light, spicy foods and vigorous exercise help balance Kapha.`,
          suggestions: ["Kapha energizing foods", "Kapha exercise routine", "Kapha morning routine"],
        }
      } else {
        return {
          content:
            "The three doshas - Vata, Pitta, and Kapha - are the fundamental energies that govern all physiological and psychological functions. Understanding your dominant dosha helps create a personalized wellness plan. Would you like to learn about a specific dosha?",
          suggestions: ["Tell me about Vata", "Tell me about Pitta", "Tell me about Kapha"],
        }
      }
    }

    // Treatment-related queries
    if (message.includes("panchakarma")) {
      return {
        content: `${ayurvedaKnowledge.treatments.panchakarma}. It includes five main procedures: Vamana (therapeutic vomiting), Virechana (purgation), Basti (enemas), Nasya (nasal treatments), and Raktamokshana (bloodletting). This comprehensive treatment helps eliminate toxins and restore balance.`,
        suggestions: ["Panchakarma preparation", "Panchakarma duration", "Post-Panchakarma care"],
      }
    }

    if (message.includes("abhyanga")) {
      return {
        content: `${ayurvedaKnowledge.treatments.abhyanga}. This daily self-care practice uses warm herbal oils suited to your dosha type. Regular Abhyanga improves skin health, reduces stress, and promotes better sleep.`,
        suggestions: ["Abhyanga oil selection", "Abhyanga technique", "Best time for Abhyanga"],
      }
    }

    if (message.includes("shirodhara")) {
      return {
        content: `${ayurvedaKnowledge.treatments.shirodhara}. This deeply relaxing treatment calms the nervous system, reduces anxiety, improves sleep quality, and enhances mental clarity. It's particularly beneficial for Vata and Pitta imbalances.`,
        suggestions: ["Shirodhara benefits", "Shirodhara preparation", "After Shirodhara care"],
      }
    }

    // Lifestyle queries
    if (message.includes("diet") || message.includes("food")) {
      return {
        content:
          "Ayurvedic nutrition emphasizes eating according to your dosha type, the season, and your digestive fire (Agni). Fresh, whole foods prepared with love and eaten mindfully are key principles. Each dosha benefits from specific tastes and food qualities.",
        suggestions: ["Vata diet plan", "Pitta diet plan", "Kapha diet plan"],
      }
    }

    if (message.includes("stress") || message.includes("anxiety")) {
      return {
        content:
          "Ayurveda views stress as primarily a Vata imbalance. Natural stress reduction includes: regular meditation, pranayama (breathing exercises), Abhyanga massage, warm baths with essential oils, and maintaining consistent daily routines. Herbs like Ashwagandha and Brahmi are also beneficial.",
        suggestions: ["Meditation techniques", "Breathing exercises", "Stress-reducing herbs"],
      }
    }

    if (message.includes("sleep") || message.includes("insomnia")) {
      return {
        content:
          "Good sleep is essential for health in Ayurveda. Sleep recommendations include: going to bed by 10 PM, avoiding screens before bed, gentle oil massage, warm milk with spices, and creating a calm bedroom environment. Poor sleep often indicates Vata imbalance.",
        suggestions: ["Sleep routine tips", "Bedtime rituals", "Natural sleep aids"],
      }
    }

    // Default response
    return {
      content:
        "I'd be happy to help you with Ayurvedic wellness guidance! I can provide information about doshas, treatments like Panchakarma and Abhyanga, dietary recommendations, lifestyle tips, and answer questions about your therapy journey. What specific aspect of Ayurveda interests you?",
      suggestions: quickSuggestions.slice(0, 3),
    }
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = generateBotResponse(content)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse.content,
        sender: "bot",
        timestamp: new Date(),
        suggestions: botResponse.suggestions,
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Card
              className={`w-96 shadow-2xl border-green-200 ${isMinimized ? "h-16" : "h-[600px]"} transition-all duration-300`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">AyurBot</CardTitle>
                    <p className="text-xs opacity-90">Ayurvedic AI Assistant</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="h-8 w-8 p-0 text-white hover:bg-white/20"
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 p-0 text-white hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {!isMinimized && (
                <CardContent className="p-0 flex flex-col h-[calc(600px-80px)]">
                  {/* Messages Area */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`flex items-start space-x-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                          >
                            <div
                              className={`h-8 w-8 rounded-full flex items-center justify-center ${message.sender === "user" ? "bg-green-600" : "bg-green-100"}`}
                            >
                              {message.sender === "user" ? (
                                <User className="h-4 w-4 text-white" />
                              ) : (
                                <Bot className="h-4 w-4 text-green-600" />
                              )}
                            </div>
                            <div
                              className={`rounded-lg p-3 ${message.sender === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800"}`}
                            >
                              <p className="text-sm">{message.content}</p>
                              {message.suggestions && (
                                <div className="mt-2 space-y-1">
                                  {message.suggestions.map((suggestion, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="cursor-pointer hover:bg-green-50 text-xs mr-1 mb-1"
                                      onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                      {suggestion}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex items-start space-x-2">
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                              <Bot className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="bg-gray-100 rounded-lg p-3">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                                <div
                                  className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Input Area */}
                  <div className="p-4 border-t">
                    <div className="flex space-x-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask about Ayurveda, doshas, treatments..."
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => handleSendMessage(inputValue)}
                        disabled={!inputValue.trim() || isTyping}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
