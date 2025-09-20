import React from 'react'
import { AppProvider } from './context/AppContext'
import Routers from './components/Routers'

const App = () => {
  return (
    <AppProvider>
      <Routers />
    </AppProvider>
  )
}

export default App