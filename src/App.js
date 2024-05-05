import "./App.css";
import Header from "./Component/Header";
import Sidebar from "./Component/Sidebar";
import Homepage from "./Component/Homepage/Homepage";


function App() {
  return (
    <div>
      <Header />
      <Sidebar />
      <div>
       <Homepage/>
      </div>
    </div>
  );
}

export default App;
