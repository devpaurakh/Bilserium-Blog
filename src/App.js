import "./App.css";
import Header from "./Component/Header";
import Post from "./Component/Post";
import Sidebar from "./Component/Sidebar";

function App() {
  return (
    <div >
      <Header />
      <Sidebar/>
      <div className="pt-40">
        <Post />
        <Post />
        <Post />
        <Post />
        {/* Add more Post components here */}
      </div>
    </div>
  );
}

export default App;
