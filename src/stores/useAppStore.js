import { create } from 'zustand'

export const PHASES = {
  INIT: 'init',
  CHAT: 'chat',
  DOCUMENTING: 'documenting',
  DESIGN: 'design',
  AI_INTEGRATION: 'ai_integration',
  REVIEW: 'review'
}

export const TRAINING_STEPS = [
  { id: 'chat', label: '需求访谈', icon: 'MessageCircle' },
  { id: 'documenting', label: '需求分析', icon: 'FileText' },
  { id: 'design', label: '方案设计', icon: 'Lightbulb' },
  { id: 'ai_integration', label: 'AI 融合', icon: 'Sparkles' },
  { id: 'review', label: '训练评分', icon: 'BarChart3' }
]

export const INDUSTRIES = [
  { id: 'finance', label: '金融', icon: '💰' },
  { id: 'compliance', label: '合规', icon: '📋' },
  { id: 'healthcare', label: '医疗', icon: '🏥' },
  { id: 'ecommerce', label: '电商', icon: '🛒' },
  { id: 'sports', label: '运动', icon: '⚽' }
]

export const PERSONAS = [
  {
    id: 'beginner',
    label: '初级难度',
    description: '适合入门练习，需求提供方逻辑较为清晰，表达比较流畅、完整',
    difficulty: 2
  },
  {
    id: 'realistic',
    label: '高级难度',
    description: '面向项目实际情况，业务方表达不流畅，不连贯，有情绪，存在隐藏需求',
    difficulty: 4
  }
]

// LocalStorage 工具函数
const STORAGE_KEYS = {
  USER_NAME: 'requirement_dojo_user_name',
  HISTORY: 'requirement_dojo_history'
}

const loadUserName = () => {
  return localStorage.getItem(STORAGE_KEYS.USER_NAME) || ''
}

const saveUserName = (name) => {
  localStorage.setItem(STORAGE_KEYS.USER_NAME, name)
}

const loadHistory = () => {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.HISTORY)
    return history ? JSON.parse(history) : []
  } catch (error) {
    console.error('加载历史记录失败:', error)
    return []
  }
}

const saveHistory = (history) => {
  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history))
  } catch (error) {
    console.error('保存历史记录失败:', error)
  }
}

const useAppStore = create((set, get) => ({
  // User info
  userName: loadUserName(),

  // Current phase
  currentPhase: PHASES.INIT,

  // User selections
  selectedIndustry: null,
  selectedPersona: null,

  // Generated task
  taskBackground: '',
  hiddenConstraints: [],
  corePainPoints: [],

  // Chat messages
  messages: [],

  // Document content
  documentContent: {
    businessGoals: '',
    painPoints: [],
    coreFeatures: []
  },

  // Design solution
  designSolution: '',
  aiIntegration: '',

  // Review scores
  reviewScores: null,

  // History records
  history: loadHistory(),

  // Actions
  setPhase: (phase) => set({ currentPhase: phase }),

  setIndustry: (industry) => set({ selectedIndustry: industry }),

  setPersona: (persona) => set({ selectedPersona: persona }),

  setTaskBackground: (task) => set({ taskBackground: task }),

  addMessage: (message) => set((state) => ({
    messages: [...state.messages, { ...message, id: Date.now() }]
  })),

  updateDocument: (content) => set((state) => ({
    documentContent: { ...state.documentContent, ...content }
  })),

  setDesignSolution: (solution) => set({ designSolution: solution }),

  setAIIntegration: (integration) => set({ aiIntegration: integration }),

  setReviewScores: (scores) => set({ reviewScores: scores }),

  // 设置用户昵称
  setUserName: (name) => {
    saveUserName(name)
    set({ userName: name })
  },

  // 保存训练记录
  saveTrainingRecord: () => {
    const state = get()
    const record = {
      id: Date.now(),
      userName: state.userName || '学员',
      date: new Date().toISOString(),
      industry: state.selectedIndustry,
      persona: state.selectedPersona,
      scores: state.reviewScores,
      averageScore: state.reviewScores
        ? Math.round((state.reviewScores.insight + state.reviewScores.logic + state.reviewScores.aiFirst + state.reviewScores.professionalism + state.reviewScores.feasibility) / 5)
        : 0,
      documentContent: state.documentContent,
      designSolution: state.designSolution,
      aiIntegration: state.aiIntegration,
      messageCount: state.messages.length
    }

    const newHistory = [record, ...state.history]
    saveHistory(newHistory)
    set({ history: newHistory })
  },

  // 删除训练记录
  deleteRecord: (id) => {
    const state = get()
    const newHistory = state.history.filter(record => record.id !== id)
    saveHistory(newHistory)
    set({ history: newHistory })
  },

  // 清空所有历史记录
  clearHistory: () => {
    saveHistory([])
    set({ history: [] })
  },

  reset: () => set({
    currentPhase: PHASES.INIT,
    selectedIndustry: null,
    selectedPersona: null,
    taskBackground: '',
    hiddenConstraints: [],
    corePainPoints: [],
    messages: [],
    documentContent: {
      businessGoals: '',
      painPoints: [],
      coreFeatures: []
    },
    designSolution: '',
    aiIntegration: '',
    reviewScores: null
  })
}))

export default useAppStore
