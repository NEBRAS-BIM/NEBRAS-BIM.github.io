import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const About = () => {
  const { t } = useTranslation()

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src="/src/assets/default/about.jpg"
                alt="About AL-NEBRAS OFFICE"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600?text=AL-NEBRAS+OFFICE'
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('about.title')}
              </h1>
              <h2 className="text-2xl text-primary mb-4">
                {t('about.subtitle')}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('about.description')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About

