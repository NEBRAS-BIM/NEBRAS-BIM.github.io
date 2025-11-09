import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useData } from '../hooks/useData'

const Projects = () => {
  const { t, i18n } = useTranslation()
  const { projects } = useData()

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
              {t('projects.title')}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('projects.subtitle')}
            </p>
          </motion.div>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                {t('projects.noProjects')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  {project.images && project.images.length > 0 && (
                    <img
                      src={project.images[0].url || project.images[0]}
                      alt={project.title?.en || project.title}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title?.[i18n.language] || project.title?.en || project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {project.description?.[i18n.language] || project.description?.en || project.description}
                    </p>
                    <Link
                      to={`/projects/${project.id}`}
                      className="text-primary hover:underline font-medium"
                    >
                      {t('projects.viewDetails')} →
                    </Link>
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

export default Projects

