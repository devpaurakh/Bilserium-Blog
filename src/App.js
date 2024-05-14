import "./App.css";
import Homepage from "./page/Homepage/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PopularPage from "./page/PopularPage/PopularPage";
import Login from "./page/Login";
import Signup from "./page/Signup";
import NoInternetPage from "./page/NoInternetPage";
import CreatePost from "./page/CreatePost";
import ProfilePage from "./page/ProfilePage";
import AdminPannel from "./Component/AdminPannel";
import DetailPage from "./page/DetailPage";
import AdminUserList from "./Component/AdminUserList";
import AdminAllPost from "./Component/AdminAllPost";
import AdminDetailPage from "./Component/AdminDetailPage";
import ChanagePassword from "./Component/ChanagePassword";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/chanagePassword" element={<ChanagePassword />} />
          <Route path="/popular" element={<PopularPage />} />
          <Route path="/adminUserlist" element={<AdminUserList />} />
          <Route path="/adminAllPost" element={<AdminAllPost />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/adminPostDetail" element={<AdminDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/admin" element={<AdminPannel />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NoInternetPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
