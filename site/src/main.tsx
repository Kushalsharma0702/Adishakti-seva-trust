import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

document.addEventListener('dragstart', (e) => { if (e.target instanceof HTMLElement && (e.target.tagName === 'IMG' || e.target.closest('a, svg'))) e.preventDefault() })

createRoot(document.getElementById('root')!).render(<App />)
