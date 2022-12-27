import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header'
import Home from './components/Home'
import Users from './components/Users'
import PageNotFound from './components/PageNotFound'
import Footer from './components/Footer'

const App = () => {

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route path='/user' element={<Users />}/>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App