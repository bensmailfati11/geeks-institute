import React from "react";
import BuggyCounter from "./BuggyCounter";
import ErrorBoundary from "./ErrorBoundary";
import FavoriteColor from "./FavoriteColor";


function App() {
  return (
    <div style={{ padding: "40px" }}>
      {/* Exercice 1 */}
      <h2>Simulation 1: Two counters inside ONE ErrorBoundary</h2>
      <ErrorBoundary>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>

      <hr />

      <h2>Simulation 2: Each counter has its own ErrorBoundary</h2>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>

      <hr />

      <h2>Simulation 3: No ErrorBoundary (white screen)</h2>
      <BuggyCounter />

      {/* Exercice 2 */}

      <hr />
      <h2>Lifecycle Exercise</h2>
      <FavoriteColor />



    </div>
  );
}


 {/* Exercice 3 */}


// {/* // -------- Child Component -------- */}
// class Child extends React.Component {
//   componentWillUnmount() {
//     alert("The Child component is unmounted!");
//   }

//   render() {
//     return <h1>Hello World!</h1>;
//   }
// }

// // -------- Main App --------
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { show: true };
//   }

//   removeChild = () => {
//     this.setState({ show: false });
//   };

//   render() {
//     return (
//       <div style={{ padding: "40px" }}>
//         <h2>Unmounting Phase</h2>

//         {this.state.show && <Child />}
//         <button onClick={this.removeChild}>Delete</button>

//         <hr />

//         <h2>Lifecycle Updating</h2>
//         <FavoriteColor />
//       </div>
//     );
//   }
// }

export default App;


