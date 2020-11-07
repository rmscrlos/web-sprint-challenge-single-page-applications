import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div>
      {/* //showcase */}
      <div className="showcase">
        <div className="img">
            <Link to="/pizza" className="pizza">Pizza?</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
