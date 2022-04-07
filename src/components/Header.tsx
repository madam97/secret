import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="nav-header">
      <Link className="logo" to="/">SecretServer</Link>

      <nav className="nav">
        <ul>
          <li>
            <Link to="/secret/new">New secret</Link>
          </li>
          <li>
            <Link to="/secret/read">Read secret</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}