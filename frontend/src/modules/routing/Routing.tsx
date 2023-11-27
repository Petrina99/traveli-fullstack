import { Routes, Route } from "react-router-dom"

import { Homepage, Signup, Login } from "../../views"

export const Routing = () => {
  return (
    <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login /> } />
    </Routes>
  )
}
