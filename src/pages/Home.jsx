import React from 'react'
import GetStatedPanel from '../components/layouts/GetStatedPanel'
import { useEffect } from 'react'


const Home = () => {
  useEffect(() => {
    localStorage.removeItem("lg_cannot_go_back")
  }, [])
  
  return (
    <div>
        <GetStatedPanel />
    </div>
  )
}

export default Home
