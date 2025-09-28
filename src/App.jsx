import React from 'react'
import { AppProvider } from './context/AppContext'
import Routers from './components/Routers'

const App = () => {
  return (
    <div id="app-root" className="desktop-zoom">
      <AppProvider>
        <Routers />
      </AppProvider>
    </div>
  )
}

export default App