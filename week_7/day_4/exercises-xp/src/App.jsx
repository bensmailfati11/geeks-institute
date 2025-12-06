import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorBoundary from "./ErrorBoundary";
import PostList from "./PostList";
import Example1 from "./Example1";
import Example2 from "./Example2";
import Example3 from "./Example3";
// start Exercice : 1
function HomeScreen() {
  return <h1>Home Page</h1>;
}

function ProfileScreen() {
  return <h1>Profile Page</h1>;
}

function ShopScreen() {
  throw new Error("Shop crashed!");
}


const sendData = async () => {
  try {
    const response = await fetch("https://webhook.site/08faf5ea-2081-49e0-a1ca-e20fe89dcace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        key1: "myusername",
        email: "mymail@gmail.com",
        name: "Isaac",
        lastname: "Doe",
        age: 27
      })
    });

    const data = await response.text(); 
    console.log("RESPONSE:", data);

  } catch (error) {
    console.log("Error:", error);
  }
};



function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <NavLink className="nav-link text-white mx-3" to="/">Home</NavLink>
        <NavLink className="nav-link text-white mx-3" to="/profile">Profile</NavLink>
        <NavLink className="nav-link text-white mx-3" to="/shop">Shop</NavLink>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <HomeScreen />
              </ErrorBoundary>
            }
          />

          <Route
            path="/profile"
            element={
              <ErrorBoundary>
                <ProfileScreen />
              </ErrorBoundary>
            }
          />

          <Route
            path="/shop"
            element={
              <ErrorBoundary>
                <ShopScreen />
              </ErrorBoundary>
            }
          />
        </Routes>

      </div>
       {/* /* // END Exercice : 1 */}

   

    {/* // Exercice : 2 */}
    <PostList />

    {/* Exercise :3 */}
     <Example1 />
      <Example2 />
      <Example3 />

      {/* Exercise :4 */}
      <div style={{ padding: "20px" }}>
      <button onClick={sendData}>Send JSON</button>
    </div>
    </BrowserRouter>
   
    
  );
}

export default App;
