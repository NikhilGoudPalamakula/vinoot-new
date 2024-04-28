import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <Link to="/superadminlogin"><button>Super admin Login</button></Link>
        <Link to="/fl"><button>Francise Staff Login</button></Link>
        <Link to="/fr"><button>Franchise Registration</button></Link>
        
    </div>
  )
}

export default Home