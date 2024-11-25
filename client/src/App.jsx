import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Chats from "./pages/Chats";
import Footer from "./components/Footer";
import { AppContextProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
      <AppContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile/chats" element={<Chats />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </AppContextProvider>
    </>
  );
}

export default App;
