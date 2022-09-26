import { Routes, Route, Navigate } from 'react-router-dom'
import UserLayout from './layouts/UserLayout'
import Signup from './pages/Auth/Signup'
import SignIn from './pages/Auth/Signin'
import User from './pages/User/User'
import UserEdit from './pages/User/UserEdit'
import AuthLayout from './layouts/AuthLayout'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<User />} />
          <Route path="edit" element={<UserEdit />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
