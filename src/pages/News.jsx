import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useData } from '../hooks/useData'

const News = () => {
  const { t, i18n } = useTranslation()
  const { news } = useData()

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
              {t('news.title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('news.subtitle')}
            </p>
          </motion.div>

          {news.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                {t('news.noNews')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title?.en || item.title}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="p-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {new Date(item.date).toLocaleDateString(i18n.language === 'ar' ? 'ar-SA' : 'en-US')}
                    </p>
                    <h3 className="text-xl font-semibold mb-2">
                      {item.title?.[i18n.language] || item.title?.en || item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                      {item.summary?.[i18n.language] || item.summary?.en || item.summary}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default News

