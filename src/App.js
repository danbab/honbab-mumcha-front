import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
//import LoginPage from "pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BoardPage from "./pages/BoardPage";
import BoardDetailPage from "./pages/BoardDetailPage";
import ChatPage from "./pages/ChatPage";
import BoardFoodPage from "./pages/BoardFoodPage";
//import WritePage from "pages/WritePage";
//import MyPagePage from "pages/MyPagePage";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/*<Route path="/login" element={<LoginPage />} />*/}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/boardList" element={<BoardPage />} />
        <Route path="/boardFoodPage" element={<BoardFoodPage />} />
        <Route path="/boardDetail" element={<BoardDetailPage />} />
        {/*<Route path="/write" element={<WritePage />} />*/}
        {/*<Route path="/my" element={<MyPagePage />} />*/}
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
