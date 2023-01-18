import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Coordinate transformations";
  }, []);

  return (
    <div className="App">
      <h1>Coordiante transformations</h1>
    </div>
  );
}

export default App;
