import React from 'react'
import { AppProvider } from './context/AppContext'
import { AdminProvider } from './context/AdminContext'
import Routers from './components/Routers'

const App = () => {
  return (
    <AppProvider>
      <AdminProvider>
        <Routers />
      </AdminProvider>
    </AppProvider>
  )
}

export default App