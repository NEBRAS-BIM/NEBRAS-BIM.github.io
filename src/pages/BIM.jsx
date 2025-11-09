import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const BIM = () => {
  const { t } = useTranslation()

  const workflowSteps = [
    {
      title: { en: 'Planning & Design', ar: 'التخطيط والتصميم' },
      description: {
        en: 'Initial project planning and 3D modeling',
        ar: 'التخطيط الأولي للمشروع والنمذجة ثلاثية الأبعاد',
      },
      icon: '📐',
    },
    {
      title: { en: 'Modeling', ar: 'النمذجة' },
      description: {
        en: 'Detailed 3D BIM modeling',
        ar: 'نمذجة BIM ثلاثية الأبعاد مفصلة',
      },
      icon: '🏗️',
    },
    {
      title: { en: 'Coordination', ar: 'التنسيق' },
      description: {
        en: 'Clash detection and coordination',
        ar: 'كشف التعارضات والتنسيق',
      },
      icon: '🔗',
    },
    {
      title: { en: 'Documentation', ar: 'التوثيق' },
      description: {
        en: 'Construction documentation and drawings',
        ar: 'توثيق البناء والرسومات',
      },
      icon: '📄',
    },
  ]

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('bim.title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              {t('bim.subtitle')}
            </p>
            <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              {t('bim.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md text-center"
              >
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">
                  {step.title.en}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {step.description.en}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default BIM

