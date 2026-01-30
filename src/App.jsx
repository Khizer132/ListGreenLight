import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserInfo from './components/layouts/UserInfo'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Payment from './components/layouts/Payment'
import UploadPhotos from './components/layouts/UploadPhotos'
import SendUploadLink from './components/layouts/SendUploadLink'
import Analysis from './components/layouts/Analysis'
import Approval from './components/layouts/Approval'

const App = () => {
  return (
    <div className='bg-gray-50'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        {/* <Route path="/" element={<GetStatedPanel />}>
        </Route> */}
        <Route path="/user-info" element={<UserInfo />} >
        </Route>
        <Route path="/payment" element={<Payment />} >
        </Route>
        <Route path="/upload-link-sent" element={<SendUploadLink />} >
        </Route>
        <Route path="/upload-photos/:token" element={<UploadPhotos />} >
        </Route>
        <Route path="/analysis" element={<Analysis />} >
        </Route>
        <Route path="/final-approval" element={<Approval />} >
        </Route>
      </Routes>
      <Footer />
      
    </div>
  )
}

export default App
