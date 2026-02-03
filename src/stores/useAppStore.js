import { create } from 'zustand'

export const PHASES = {
  INIT: 'init',
  CHAT: 'chat',
  DOCUMENTING: 'documenting',
  DESIGN: 'design',
  REVIEW: 'review'
}

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

const useAppStore = create((set, get) => ({
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
