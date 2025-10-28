import React from 'react'
import { useAdmin } from '../../context/AdminContext'
import AdminLayout from './AdminLayout'
import Dashboard from './Dashboard'
import UserManagement from './UserManagement'
import ProductManagement from './ProductManagement'
import OrderManagement from './OrderManagement'
import SubscriptionManagement from './SubscriptionManagement'
import InventoryManagement from './InventoryManagement'
import AnalyticsDashboard from './AnalyticsDashboard'

const AdminDashboard = () => {
  const { activeTab, setActiveTab } = useAdmin()

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'users':
        return <UserManagement />
      case 'products':
        return <ProductManagement />
      case 'orders':
        return <OrderManagement />
      case 'subscriptions':
        return <SubscriptionManagement />
      case 'inventory':
        return <InventoryManagement />
      case 'analytics':
        return <AnalyticsDashboard />
      default:
        return <Dashboard />
    }
  }

  return (
    <AdminLayout>
      {renderContent()}
    </AdminLayout>
  )
}

export default AdminDashboard
