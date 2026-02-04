import { TRAINING_STEPS } from '../stores/useAppStore'

export default function ProgressSteps({ currentStep }) {
  const currentIndex = TRAINING_STEPS.findIndex(step => step.id === currentStep)

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          {TRAINING_STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    index <= currentIndex
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                  }`}
                >
                  {index < currentIndex ? '✓' : step.icon}
                </div>
                <div className="mt-1 text-xs font-medium text-center">
                  <div
                    className={`${
                      index === currentIndex
                        ? 'text-primary'
                        : index < currentIndex
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </div>
                </div>
              </div>

              {/* Connector */}
              {index < TRAINING_STEPS.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 mt-[-20px]">
                  <div
                    className={`h-full transition-all ${
                      index < currentIndex
                        ? 'bg-primary'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
