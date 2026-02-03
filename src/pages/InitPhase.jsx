import { Briefcase, User, ArrowRight } from 'lucide-react'
import useAppStore, { INDUSTRIES, PERSONAS, PHASES } from '../stores/useAppStore'

export default function InitPhase() {
  const { selectedIndustry, selectedPersona, setIndustry, setPersona, setPhase, setTaskBackground } = useAppStore()

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            需求分析模拟训练
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-light">
            在实战中磨练你的需求洞察力
          </p>
        </div>

        {/* Industry Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">选择行业场景</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {INDUSTRIES.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setIndustry(industry.id)}
                className={`p-5 rounded-2xl border transition-all duration-200 ${
                  selectedIndustry === industry.id
                    ? 'border-primary bg-primary/5 dark:bg-primary/10 scale-105'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-750'
                }`}
              >
                <div className="text-3xl mb-2">{industry.icon}</div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{industry.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <User className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">选择对话难度</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PERSONAS.map((persona) => (
              <button
                key={persona.id}
                onClick={() => setPersona(persona.id)}
                className={`p-6 rounded-2xl border transition-all duration-200 text-left ${
                  selectedPersona === persona.id
                    ? 'border-primary bg-primary/5 dark:bg-primary/10 scale-[1.02]'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-750'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">{persona.label}</h3>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium">
                    {'★'.repeat(persona.difficulty)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{persona.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="flex justify-center">
          <button
            onClick={handleStart}
            disabled={!selectedIndustry || !selectedPersona}
            className="flex items-center gap-2 px-10 py-4 bg-primary text-white rounded-2xl font-medium text-base transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            开始挑战
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 space-y-1.5">
          <p className="text-sm text-gray-400">
            Powered by Sinan的产品课
          </p>
          <p className="text-sm text-gray-400">
            训练主题和对话基于 AI 生成，请自行斟酌使用
          </p>
        </div>
      </div>
    </div>
  )
}
