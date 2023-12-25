import { Routes, Route } from "react-router-dom"

import { 
  Homepage, 
  Signup, 
  Login, 
  BlogHome, 
  BlogCreate,
  PostSingle,
  Profile,
  BlogLocations
} from "@/views"

export const Routing = () => {
  return (
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={<BlogHome />} />
        <Route path="/blog/location/:loc" element={<BlogLocations />} />
        <Route path="/blog/create" element={<BlogCreate /> } />
        <Route path="/blog/:id" element={<PostSingle />} />
        <Route path="/profile/:id" element={<Profile />} />
    </Routes>
  )
}
