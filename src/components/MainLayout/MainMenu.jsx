import React from 'react'
import { NavLink } from 'react-router'
import { pagesRoutes } from '@/router/routes'

const MainMenu = () => {
  return (
    <nav>
      <ul style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
        {pagesRoutes
          .filter((route) => !route.meta.notInMenu)
          .map(({ path, meta }) => (
            <li key={path} style={{ marginRight: '15px' }}>
              <NavLink
                to={path}
                style={({ isActive }) => ({
                  color: isActive ? '#61dafb' : 'white',
                  textDecoration: 'none',
                  fontWeight: isActive ? 'bold' : 'normal',
                })}
                end={path === '/'}
              >
                {meta.title}
              </NavLink>
            </li>
          ))}
      </ul>
    </nav>
  )
}

export default MainMenu
