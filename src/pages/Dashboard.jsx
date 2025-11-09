import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import JSZip from 'jszip'
import ImageUploader from '../components/ImageUploader'
import { useData } from '../hooks/useData'

const Dashboard = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { projects, news } = useData()
  const [activeTab, setActiveTab] = useState('projects')
  const [editingItem, setEditingItem] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [formData, setFormData] = useState({
    title: { en: '', ar: '' },
    description: { en: '', ar: '' },
    content: { en: '', ar: '' },
    date: new Date().toISOString().split('T')[0],
    category: '',
    images: [],
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  useEffect(() => {
    // Auto-logout after 12 hours
    const authData = localStorage.getItem('auth')
    if (authData) {
      const { timestamp } = JSON.parse(authData)
      const twelveHours = 12 * 60 * 60 * 1000
      if (Date.now() - timestamp > twelveHours) {
        handleLogout()
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('auth')
    toast.success('Logged out successfully')
    navigate('/login')
  }

  const handleAdd = () => {
    setEditingItem(null)
    setFormData({
      title: { en: '', ar: '' },
      description: { en: '', ar: '' },
      content: { en: '', ar: '' },
      date: new Date().toISOString().split('T')[0],
      category: '',
      images: [],
    })
    setShowModal(true)
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      title: item.title || { en: '', ar: '' },
      description: item.description || { en: '', ar: '' },
      content: item.content || { en: '', ar: '' },
      date: item.date || new Date().toISOString().split('T')[0],
      category: item.category || '',
      images: item.images || [],
    })
    setShowModal(true)
  }

  const handleDelete = (id) => {
    if (window.confirm(t('dashboard.confirmDelete'))) {
      const items = activeTab === 'projects' ? projects : news
      const updated = items.filter((item) => item.id !== id)
      localStorage.setItem(activeTab, JSON.stringify(updated))
      toast.success('Item deleted successfully')
      window.location.reload()
    }
  }

  const handleSave = () => {
    if (!formData.title.en && !formData.title.ar) {
      toast.error('Title is required')
      return
    }

    const items = activeTab === 'projects' ? projects : news
    let updated

    if (editingItem) {
      updated = items.map((item) =>
        item.id === editingItem.id
          ? { ...item, ...formData, id: editingItem.id }
          : item
      )
    } else {
      const newItem = {
        ...formData,
        id: Date.now(),
      }
      updated = [...items, newItem]
    }

    localStorage.setItem(activeTab, JSON.stringify(updated))
    toast.success('Saved successfully')
    setShowModal(false)
    window.location.reload()
  }

  const handleExport = async () => {
    try {
      const zip = new JSZip()
      const uploadsFolder = zip.folder('uploads')

      // Get all images from projects and news
      const allImages = []
      projects.forEach((project) => {
        if (project.images) {
          project.images.forEach((img) => {
            if (img.file) {
              allImages.push(img)
            }
          })
        }
      })
      news.forEach((item) => {
        if (item.image && typeof item.image === 'object' && item.image.file) {
          allImages.push(item.image)
        }
      })

      // Add images to ZIP
      for (const img of allImages) {
        if (img.file) {
          const blob = await fetch(img.url).then((r) => r.blob())
          uploadsFolder.file(img.name, blob)
        }
      }

      // Create README
      const readme = `# Export Assets

## Instructions

1. Extract this ZIP file
2. Copy all images from the 'uploads' folder
3. Paste them into: src/assets/uploads/
4. Commit and push to GitHub

This ensures your uploaded images persist across deployments.
`
      zip.file('README.md', readme)

      // Generate ZIP
      const blob = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'al-nebras-assets.zip'
      a.click()
      URL.revokeObjectURL(url)

      toast.success(t('dashboard.exportSuccess'))
    } catch (error) {
      toast.error('Export failed')
      console.error(error)
    }
  }

  const handlePasswordChange = () => {
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'

    if (passwordData.currentPassword !== adminPassword) {
      toast.error('Current password is incorrect')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error(t('dashboard.passwordMismatch'))
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    // Note: In a real app, you'd update this on the server
    // For now, we'll just show a success message
    toast.success(t('dashboard.passwordChanged'))
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    setShowSettings(false)
  }

  const items = activeTab === 'projects' ? projects : news

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom section-padding">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">{t('dashboard.title')}</h1>
          <div className="flex gap-4">
            <button onClick={handleExport} className="btn-secondary">
              {t('dashboard.export')}
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="btn-secondary"
            >
              {t('dashboard.settings')}
            </button>
            <button onClick={handleLogout} className="btn-secondary">
              {t('dashboard.logout')}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'projects'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {t('dashboard.projects')}
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'news'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {t('dashboard.news')}
          </button>
        </div>

        {/* Add Button */}
        <div className="mb-6">
          <button onClick={handleAdd} className="btn-primary">
            {t('dashboard.add')} {activeTab === 'projects' ? t('dashboard.projects') : t('dashboard.news')}
          </button>
        </div>

        {/* Items List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              {item.images && item.images.length > 0 && (
                <img
                  src={item.images[0].url || item.images[0]}
                  alt={item.title?.en || item.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-semibold mb-2">
                {item.title?.[i18n.language] || item.title?.en || item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {item.description?.[i18n.language] || item.description?.en || item.description}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="btn-secondary flex-1"
                >
                  {t('dashboard.edit')}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  {t('dashboard.delete')}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Edit/Add Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold mb-6">
                {editingItem ? t('dashboard.edit') : t('dashboard.add')}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title (English)
                  </label>
                  <input
                    type="text"
                    value={formData.title.en}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: { ...formData.title, en: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title (Arabic)
                  </label>
                  <input
                    type="text"
                    value={formData.title.ar}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: { ...formData.title, ar: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description (English)
                  </label>
                  <textarea
                    value={formData.description.en}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: { ...formData.description, en: e.target.value },
                      })
                    }
                    rows="3"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description (Arabic)
                  </label>
                  <textarea
                    value={formData.description.ar}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: { ...formData.description, ar: e.target.value },
                      })
                    }
                    rows="3"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
                  />
                </div>

                {activeTab === 'news' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Content (English)
                      </label>
                      <textarea
                        value={formData.content.en}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            content: { ...formData.content, en: e.target.value },
                          })
                        }
                        rows="5"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Content (Arabic)
                      </label>
                      <textarea
                        value={formData.content.ar}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            content: { ...formData.content, ar: e.target.value },
                          })
                        }
                        rows="5"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
                  />
                </div>

                {activeTab === 'projects' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Images
                  </label>
                  <ImageUploader
                    images={formData.images}
                    onChange={(images) => setFormData({ ...formData, images })}
                    multiple={true}
                    maxImages={10}
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button onClick={handleSave} className="btn-primary flex-1">
                  {t('dashboard.save')}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-secondary flex-1"
                >
                  {t('dashboard.cancel')}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full"
            >
              <h2 className="text-2xl font-bold mb-6">
                {t('dashboard.changePassword')}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('dashboard.currentPassword')}
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('dashboard.newPassword')}
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('dashboard.confirmPassword')}
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handlePasswordChange}
                  className="btn-primary flex-1"
                >
                  {t('dashboard.save')}
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="btn-secondary flex-1"
                >
                  {t('dashboard.cancel')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard

