import { Routes, Route } from "react-router-dom"

import { 
  Homepage, 
  Signup, 
  Login, 
  BlogHome, 
  BlogCreate 
} from "@/views"

export const Routing = () => {
  return (
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={<BlogHome />} />
        <Route path="/blog/create" element={<BlogCreate /> } />
    </Routes>
  )
}
