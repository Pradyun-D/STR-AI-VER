import { rootAuthLoader } from '@clerk/react-router/ssr.server'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import type { Route } from './+types/root'


export async function loader(args: Route.LoaderArgs) {
  return rootAuthLoader(args)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App></App>
  </StrictMode>,
)
