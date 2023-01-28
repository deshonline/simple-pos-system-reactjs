import React from 'react'
import { Link } from 'react-router-dom'

function MainLayout({ children }) {
    return (
        <div>
            <header>
                <nav className="navbar navbar-dark bg-custom-2">
                    <div className="container">
                        <Link to="/" className="navbar-brand"><i class="fa-solid fa-house"></i>  Simple POS System</Link>
                    </div>
                </nav>
            </header>
            <main>
                <div>
                    <div className='container mt-3'>
                    </div>
                    {children}
                </div>
            </main>
        </div>
    )
}

export default MainLayout