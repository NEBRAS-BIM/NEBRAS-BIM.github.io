import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const Services = () => {
  const { t } = useTranslation()

  const services = [
    {
      key: 'architecture',
      icon: '🏛️',
      color: 'from-blue-500 to-blue-700',
    },
    {
      key: 'structural',
      icon: '🏗️',
      color: 'from-green-500 to-green-700',
    },
    {
      key: 'supervision',
      icon: '👷',
      color: 'from-orange-500 to-orange-700',
    },
    {
      key: 'interior',
      icon: '🎨',
      color: 'from-purple-500 to-purple-700',
    },
    {
      key: 'bim',
      icon: '💻',
      color: 'from-indigo-500 to-indigo-700',
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
              {t('services.title')}
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white dark:bg-gray-900 rounded-lg p-8 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center text-3xl mb-6`}
                >
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  {t(`services.${service.key}.title`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t(`services.${service.key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services

