import { useState, useRef, useEffect } from 'react'
import { Send, ArrowRight, AlertCircle, ArrowLeft, Home } from 'lucide-react'
import useAppStore, { PHASES } from '../stores/useAppStore'
import { sendChatMessage, getMockResponse } from '../utils/api'

export default function ChatPhase() {
  const { messages, taskBackground, selectedPersona, selectedIndustry, addMessage, setPhase } = useAppStore()
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const initChat = async () => {
      if (messages.length === 0) {
        setIsLoading(true)
        try {
          // 调用 API 获取 AI 自然开场白
          const aiReply = await sendChatMessage(
            '你好，我是来做需求调研的',  // 自然的触发语
            selectedPersona,
            selectedIndustry,
            []
          )
          addMessage({ role: 'assistant', content: aiReply })
        } catch (err) {
          console.error('初始化对话失败:', err)
          // 如果失败，回退到简单开场
          addMessage({
            role: 'assistant',
            content: `${taskBackground}你能帮我分析一下吗？`
          })
        } finally {
          setIsLoading(false)
        }
      }
    }

    initChat()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setError(null)
    addMessage({ role: 'user', content: userMessage })
    setIsLoading(true)

    try {
      // 使用真实的 DeepSeek API
      const aiReply = await sendChatMessage(
        userMessage,
        selectedPersona,
        selectedIndustry,
        messages
      )
      addMessage({ role: 'assistant', content: aiReply })
    } catch (err) {
      console.error('发送消息失败:', err)
      setError(err.message)

      // 如果 API 失败，回退到模拟模式
      const fallbackResponse = getMockResponse(selectedPersona)
      addMessage({ role: 'assistant', content: fallbackResponse })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    if (confirm('确定要返回首页吗？当前进度将会丢失。')) {
      const { reset } = useAppStore.getState()
      reset()
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="text-sm">返回首页</span>
            </button>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">需求访谈</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">与业务方深入沟通，挖掘真实需求</p>
            </div>
          </div>
          <button
            onClick={() => setPhase(PHASES.DOCUMENTING)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            进入文档编写
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6">
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="mb-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-sm text-red-800 dark:text-red-200">
              <AlertCircle className="w-4 h-4" />
              <span>API 调用失败: {error}（已使用模拟响应）</span>
            </div>
          )}

          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
              placeholder="输入你的问题..."
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              💡 提示：尝试问一些结构化的问题，比如"具体的流程是什么"、"遇到异常情况怎么办"等
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
