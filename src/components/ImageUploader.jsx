import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const ImageUploader = ({ images = [], onChange, multiple = true, maxImages = 10 }) => {
  const [previews, setPreviews] = useState(images)
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    const remainingSlots = maxImages - previews.length
    const filesToAdd = files.slice(0, remainingSlots)

    filesToAdd.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          const newPreview = {
            id: Date.now() + Math.random(),
            url: reader.result,
            file: file,
            name: file.name,
          }
          const updatedPreviews = [...previews, newPreview]
          setPreviews(updatedPreviews)
          onChange(updatedPreviews)
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const removeImage = (id) => {
    const updatedPreviews = previews.filter((img) => img.id !== id)
    setPreviews(updatedPreviews)
    onChange(updatedPreviews)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {previews.map((img) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group"
          >
            <img
              src={img.url}
              alt={img.name}
              className="w-full h-32 object-cover rounded-lg"
            />
            <button
              onClick={() => removeImage(img.id)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove image"
            >
              ×
            </button>
          </motion.div>
        ))}
      </div>

      {previews.length < maxImages && (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-primary transition-colors text-gray-500 dark:text-gray-400"
        >
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p>Click to upload images</p>
            <p className="text-sm mt-1">
              {previews.length}/{maxImages} images
            </p>
          </div>
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}

export default ImageUploader

