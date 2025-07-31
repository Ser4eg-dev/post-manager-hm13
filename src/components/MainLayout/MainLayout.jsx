import React from 'react'
import { Outlet } from 'react-router'
import MainMenu from './MainMenu'

const MainLayout = () => {
  return (
    <div
      style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}
    >
      <header
        style={{ background: '#282c34', padding: '10px', color: 'white' }}
      >
        <h1>React + RTK Query додаток</h1>
        <MainMenu />
      </header>
      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </main>
      <footer
        style={{
          background: '#282c34',
          padding: '10px',
          color: 'white',
          textAlign: 'center',
        }}
      >
        © React RTK Query App
      </footer>
    </div>
  )
}

export default MainLayout
