'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ThreeDot } from 'react-loading-indicators'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface ChatWindowProps {
  onClose: () => void
}

interface ApiResponse {
  content: string
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m here to help you with your business registration process. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [chatHistory, setChatHistory] = useState<Array<{role: 'user' | 'assistant', content: string}>>([])
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connected')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    // Add user message to messages
    setMessages(prev => [...prev, userMessage])
    
    // Add user message to chat history
    const updatedHistory = [...chatHistory, { role: 'user' as const, content: inputValue }]
    setChatHistory(updatedHistory)
    
    const currentUserInput = inputValue
    setInputValue('')
    setIsTyping(true)
    setConnectionStatus('connecting')

    try {
      // Call the Next.js API route which proxies to Flask
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: currentUserInput,
          history: JSON.stringify(updatedHistory)
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setConnectionStatus('connected')
      
      // Extract content from the API response
      const botResponse = Array.isArray(data) ? data[0]?.content : data?.content
      
      if (botResponse) {
        // Keep HTML content for rich formatting
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev, botMessage])
        
        // Add plain text version to chat history
        const plainTextForHistory = stripHtmlTags(botResponse)
        setChatHistory(prev => [...prev, { role: 'assistant', content: plainTextForHistory }])
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error('Error calling chatbot API:', error)
      setConnectionStatus('disconnected')
      
      // Determine error type and provide appropriate fallback
      let fallbackResponse: string
      
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        fallbackResponse = "I'm having trouble connecting to the server. The chatbot service might be temporarily unavailable. Please try again in a few moments, or continue with our other services."
      } else if (error instanceof Error && error.message.includes('Flask API')) {
        fallbackResponse = "The AI service is currently offline. I can still help you with basic questions about business registration. What would you like to know?"
      } else {
        // Fall back to context-aware responses
        fallbackResponse = getFallbackResponse(currentUserInput)
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse,
        sender: 'bot',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
      setChatHistory(prev => [...prev, { role: 'assistant', content: fallbackResponse }])
    } finally {
      setIsTyping(false)
    }
  }

  // Helper function to strip HTML tags from response
  const stripHtmlTags = (html: string): string => {
    // Create a temporary div element to parse HTML
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    
    // Extract text content and preserve basic formatting
    let text = tempDiv.textContent || tempDiv.innerText || ''
    
    // Clean up extra whitespace and format lists
    text = text.replace(/\s+/g, ' ').trim()
    
    return text
  }

  // Component to render formatted bot messages
  const BotMessageContent: React.FC<{ content: string }> = ({ content }) => {
    // Check if content contains HTML
    if (content.includes('<') && content.includes('>')) {
      return (
        <div 
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
          style={{
            color: 'inherit',
            lineHeight: '1.4'
          }}
        />
      )
    }
    return <span>{content}</span>
  }

  // Fallback function for when API is unavailable
  const getFallbackResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase()
    
    if (lowerInput.includes('business registration') || lowerInput.includes('register')) {
      return 'I can help you with business registration! You can start the process by clicking on "Business Registration" in the navigation menu. What type of business are you looking to register?'
    } else if (lowerInput.includes('document') || lowerInput.includes('file')) {
      return 'For business registration, you\'ll typically need documents like your business plan, ID copies, and proof of address. Our system will guide you through the specific requirements for your business type.'
    } else if (lowerInput.includes('fee') || lowerInput.includes('cost') || lowerInput.includes('price')) {
      return 'Registration fees vary depending on your business type and structure. I can connect you with our team for detailed pricing information. Would you like me to arrange that?'
    } else if (lowerInput.includes('time') || lowerInput.includes('how long')) {
      return 'The registration process typically takes 3-5 business days once all required documents are submitted. Our streamlined process helps speed things up!'
    } else {
      return 'Thank you for your question! I\'m currently having trouble connecting to our knowledge base. Please try again in a moment, or contact our support team for immediate assistance.'
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed bottom-24 right-6 w-[400px] h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-primary text-white p-4 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-sm">mr.Registar Assistant</h3>
            <p className="text-xs text-white/80 flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${
                connectionStatus === 'connected' ? 'bg-green-400' :
                connectionStatus === 'connecting' ? 'bg-yellow-400 animate-pulse' :
                'bg-red-400'
              }`}></span>
              {connectionStatus === 'connected' ? 'Online' :
               connectionStatus === 'connecting' ? 'Connecting...' :
               'Offline'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                message.sender === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.sender === 'bot' ? (
                <BotMessageContent content={message.text} />
              ) : (
                message.text
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
            <div className='bg-gray-100 w-fit px-3 py-2 rounded-lg'>
                <ThreeDot color="#343a78" size="small" text="" textColor="#3b53e4" />
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="bg-primary text-white px-3 py-2 rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
