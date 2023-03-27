import React from 'react'

// styles
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="error-page-container">
        <div className="not-found-container">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>Sorry, it appears the page you’re looking for has been moved or no longer exists.</p>
        </div>
    </div>
  )
}
