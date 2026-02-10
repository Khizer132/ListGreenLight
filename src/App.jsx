import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import UserInfo from './components/layouts/UserInfo'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Payment from './components/layouts/Payment'
import UploadPhotos from './components/layouts/UploadPhotos'
import SendUploadLink from './components/layouts/SendUploadLink'
import Analysis from './components/layouts/Analysis'
import Approval from './components/layouts/Approval'
import Approved from './components/layouts/Approved'

const App = () => {
  const location = useLocation()
  const isApprovedPage = location.pathname === '/approved'

  return (
    <div className='bg-gray-50'>
      {!isApprovedPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/user-info" element={<UserInfo />} >
        </Route>
        <Route path="/payment" element={<Payment />} >
        </Route>
        <Route path="/upload-link-sent" element={<SendUploadLink />} >
        </Route>
        <Route path="/upload-photos/:token" element={<UploadPhotos />} >
        </Route>
        <Route path="/analysis/:token" element={<Analysis />} >
        </Route>
        <Route path="/final-approval" element={<Approval />} >
        </Route>
        <Route path="/approved" element={<Approved />} >
        </Route>
      </Routes>
      {!isApprovedPage && <Footer />}
      
    </div>
  )
}

export default App
