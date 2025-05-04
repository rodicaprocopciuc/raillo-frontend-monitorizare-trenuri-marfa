
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Layout.css';

const Layout = ({ children }) => {
  const [showReportMenu, setShowReportMenu] = useState(false);

  return (
    <div className="layout-container">
      <aside className="sidebar">
        {/* Logo titlu */}
        <NavLink to="/home" className="app-title" style={{ textDecoration: 'none' }}>
          RailLo
        </NavLink>

        <nav className="menu">
          <NavLink
            to="/home"
            className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
          >
            Home
          </NavLink>
          <NavLink
            to="/trenuri"
            className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
          >
            Trenuri
          </NavLink>
          <NavLink
            to="/vagoane"
            className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
          >
            Vagoane
          </NavLink>

          <div
            className="submenu-toggle"
            onClick={() => setShowReportMenu(!showReportMenu)}
          >
            Rapoarte ▾
          </div>
          {showReportMenu && (
            <div className="submenu">
              <NavLink
                to="/rapoarte"
                className={({ isActive }) => isActive ? 'submenu-item active' : 'submenu-item'}
              >
                Statistici trenuri
              </NavLink>
              <NavLink
                to="/raportnou"
                className={({ isActive }) => isActive ? 'submenu-item active' : 'submenu-item'}
              >
                Distribuție status
              </NavLink>
            </div>
          )}

          <NavLink
            to="/utilizatori"
            className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
          >
            Utilizatori
          </NavLink>

          {/*  Link nou pentru Alerte */}
          <NavLink
            to="/alerte"
            className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
          >
            Alerte
          </NavLink>
        </nav>
      </aside>

      <div className="content-wrapper">
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
