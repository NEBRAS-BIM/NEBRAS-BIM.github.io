import { useState, useEffect } from 'react'
import projectsData from '../data/projects.json'
import newsData from '../data/news.json'
import homeData from '../data/home.json'

export const useData = () => {
  const [projects, setProjects] = useState([])
  const [news, setNews] = useState([])
  const [home, setHome] = useState(null)

  useEffect(() => {
    // Load from localStorage first, fallback to JSON files
    const storedProjects = localStorage.getItem('projects')
    const storedNews = localStorage.getItem('news')
    const storedHome = localStorage.getItem('homeData')

    setProjects(
      storedProjects ? JSON.parse(storedProjects) : projectsData
    )
    setNews(storedNews ? JSON.parse(storedNews) : newsData)
    setHome(storedHome ? JSON.parse(storedHome) : homeData)

    // Listen for storage changes (for cross-tab updates)
    const handleStorageChange = (e) => {
      if (e.key === 'projects') {
        setProjects(JSON.parse(e.newValue))
      } else if (e.key === 'news') {
        setNews(JSON.parse(e.newValue))
      } else if (e.key === 'homeData') {
        setHome(JSON.parse(e.newValue))
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return { projects, news, homeData: home }
}

