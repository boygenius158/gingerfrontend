// app/u/layout.js

import React from 'react';

export default function ULayout({ children }) {
  return (
    <div>
      {/* Header or navigation that stays the same across all "u" pages */}
      <header>
        <h1>User Dashboard</h1>
        <nav>
          <ul>
            <li><a href="/u/profile">Profile</a></li>
            <li><a href="/u/settings">Settings</a></li>
          </ul> 
        </nav>
      </header>

      {/* The main content area */}
      <main>
        {children} {/* This renders the specific page content */}
      </main>

      {/* Optional Footer */}
      <footer>
        <p>All rights reserved, User Dashboard</p>
      </footer>
    </div>
  );
}
