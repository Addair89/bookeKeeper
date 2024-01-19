import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import ShowBook from './pages/ShowBook'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'
import CreateBook from './pages/CreateBook'

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
      <Route path='/books/create' element={<CreateBook />} />
    </Routes>
  )
}

export default App;