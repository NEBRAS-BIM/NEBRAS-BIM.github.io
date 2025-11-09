import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useData } from '../hooks/useData'

const ProjectDetail = () => {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const { projects } = useData()
  const project = projects.find((p) => p.id === parseInt(id))

  if (!project) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/projects" className="btn-primary">
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              to="/projects"
              className="text-primary hover:underline mb-6 inline-block"
            >
              ← {t('nav.projects')}
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {project.title?.[i18n.language] || project.title?.en || project.title}
            </h1>

            {project.images && project.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {project.images.map((img, index) => (
                  <motion.img
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    src={img.url || img}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                    loading="lazy"
                  />
                ))}
              </div>
            )}

            <div className="prose max-w-none dark:prose-invert">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.description?.[i18n.language] || project.description?.en || project.description}
              </p>
              {project.content && (
                <div className="mt-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.content?.[i18n.language] || project.content?.en || project.content}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetail

