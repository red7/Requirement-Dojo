import { useState } from 'react'
import { Briefcase, User, ArrowRight, Edit2, Trash2, Award, ChevronDown } from 'lucide-react'
import useAppStore, { INDUSTRIES, PERSONAS, PHASES, TRAINING_STEPS } from '../stores/useAppStore'

export default function InitPhase() {
  const { selectedIndustry, selectedPersona, userName, history, setIndustry, setPersona, setPhase, setTaskBackground, setUserName, deleteRecord, clearHistory } = useAppStore()
  const [showNameEdit, setShowNameEdit] = useState(!userName)
  const [nameInput, setNameInput] = useState(userName)
  const [showHistory, setShowHistory] = useState(false)

  const handleStart = () => {
    if (selectedIndustry && selectedPersona) {
      const tasks = {
        finance: '客户反馈理财产品推荐不够精准，经常推送不相关的产品',
        compliance: '合规审批流程冗长，文档审核平均需要3-5天',
        healthcare: '医疗挂号系统效率低下，患者经常无法预约到合适的时间',
        ecommerce: '用户购物车放弃率高达70%，转化率持续下降',
        sports: '运动数据记录分散，用户难以追踪长期训练效果'
      }

      setTaskBackground(tasks[selectedIndustry])
      setPhase(PHASES.CHAT)
    }
  }

  const handleSaveName = () => {
    if (nameInput.trim()) {
      setUserName(nameInput.trim())
      setShowNameEdit(false)
    }
  }

  const handleDeleteRecord = (id) => {
    if (confirm('确定要删除这条训练记录吗？')) {
      deleteRecord(id)
    }
  }

  const handleClearHistory = () => {
    if (confirm('确定要清空所有历史记录吗？此操作不可恢复。')) {
      clearHistory()
    }
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
  }

  const getIndustryLabel = (id) => {
    return INDUSTRIES.find(i => i.id === id)?.label || id
  }

  const getPersonaLabel = (id) => {
    return PERSONAS.find(p => p.id === id)?.label || id
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-600 dark:text-emerald-400'
    if (score >= 60) return 'text-blue-600 dark:text-blue-400'
    if (score >= 40) return 'text-amber-600 dark:text-amber-400'
    return 'text-rose-600 dark:text-rose-400'
  }

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-emerald-50 dark:bg-emerald-950/30'
    if (score >= 60) return 'bg-blue-50 dark:bg-blue-950/30'
    if (score >= 40) return 'bg-amber-50 dark:bg-amber-950/30'
    return 'bg-rose-50 dark:bg-rose-950/30'
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6">
        <div className="max-w-4xl w-full py-4 md:py-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
            需求分析模拟训练
          </h1>
          <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 font-light">
            在实战中磨练你的需求洞察力
          </p>
        </div>

        {/* 训练流程说明 */}
        <div className="bg-gradient-to-br from-primary/[0.03] to-primary/[0.06] dark:from-primary/[0.06] dark:to-primary/[0.12] rounded-xl p-3 md:p-4 mb-4 md:mb-5 border border-primary/10">
          <h3 className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 md:mb-3 text-center">
            训练流程
          </h3>
          <div className="flex items-start justify-between relative">
            {TRAINING_STEPS.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center flex-1 relative">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-base md:text-xl mb-1 md:mb-1.5 shadow-sm relative z-10">
                  {step.icon}
                </div>
                <div className="text-[11px] md:text-xs font-medium text-gray-900 dark:text-white text-center">
                  {step.label}
                </div>

                {/* 连接线 */}
                {index < TRAINING_STEPS.length - 1 && (
                  <div className="absolute top-4 md:top-5 left-[50%] w-full h-px bg-primary/20 z-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 用户昵称 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-5 mb-4 md:mb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              {showNameEdit ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSaveName()}
                    placeholder="请输入你的昵称"
                    autoFocus
                    className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={handleSaveName}
                    className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors"
                  >
                    保存
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {userName || '学员'}
                  </span>
                  <button
                    onClick={() => setShowNameEdit(true)}
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
            {history.length > 0 && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Award className="w-4 h-4" />
                历史记录 ({history.length})
                <ChevronDown className={`w-3 h-3 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* 历史记录列表 */}
        {showHistory && history.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-5 mb-4 md:mb-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">训练历史</h3>
              <button
                onClick={handleClearHistory}
                className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 font-medium"
              >
                清空全部
              </button>
            </div>
            <div className="space-y-2 max-h-40 md:max-h-52 overflow-y-auto">
              {history.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-750 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`text-2xl font-bold px-3 py-1 rounded-lg ${getScoreBg(record.averageScore)} ${getScoreColor(record.averageScore)}`}>
                      {record.averageScore}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {getIndustryLabel(record.industry)} · {getPersonaLabel(record.persona)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {formatDate(record.date)} · {record.userName} · {record.messageCount} 条对话
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteRecord(record.id)}
                    className="p-2 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Industry Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-6 mb-4 md:mb-5">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <Briefcase className="w-4 h-4 text-gray-400" />
            <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">选择行业场景</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
            {INDUSTRIES.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setIndustry(industry.id)}
                className={`p-3 md:p-4 rounded-xl border transition-all duration-200 ${
                  selectedIndustry === industry.id
                    ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-750'
                }`}
              >
                <div className="text-2xl md:text-3xl mb-1">{industry.icon}</div>
                <div className={`text-xs md:text-sm font-medium ${
                  selectedIndustry === industry.id
                    ? 'text-primary'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {industry.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <User className="w-4 h-4 text-gray-400" />
            <h2 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">选择对话难度</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PERSONAS.map((persona) => (
              <button
                key={persona.id}
                onClick={() => setPersona(persona.id)}
                className={`p-4 md:p-5 rounded-xl border transition-all duration-200 text-left ${
                  selectedPersona === persona.id
                    ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-750'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-sm md:text-base font-semibold ${
                    selectedPersona === persona.id
                      ? 'text-primary'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {persona.label}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium">
                    {'★'.repeat(persona.difficulty)}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{persona.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="flex justify-center mb-6 md:mb-8">
          <button
            onClick={handleStart}
            disabled={!selectedIndustry || !selectedPersona}
            className="flex items-center gap-2 px-8 md:px-10 py-3 md:py-4 bg-primary text-white rounded-xl font-medium text-sm md:text-base transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            开始挑战
            <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
          </button>
        </div>
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="text-center space-y-1 pb-[50px]">
        <p className="text-xs md:text-sm text-gray-400">
          Powered by Sinan 的产品课
        </p>
        <p className="text-xs md:text-sm text-gray-400">
          训练主题和对话基于 AI 生成，请自行斟酌使用
        </p>
      </div>
    </div>
  )
}
