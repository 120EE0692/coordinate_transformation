import { useState, useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Coordinate transformations";
  }, []);

  const [coordinate, setCoordinate] = useState("Cartesian");

  const [variables, setVariables] = useState(["x", "y", "z"]);

  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);

  const [cartesian, setCartesian] = useState([]);
  const [cylindrical, setCylindrical] = useState([]);
  const [spherical, setSpherical] = useState([]);

  useEffect(() => {
    switch (coordinate) {
      case "Cartesian":
        setVariables(["x", "y", "z"]);
        break;
      case "Cylindrical":
        setVariables(["r", "θ", "z"]);
        break;
      case "Spherical":
        setVariables(["r", "θ", "φ"]);
        break;
      default:
        setVariables(["x", "y", "z"]);
    }
  }, [coordinate]);

  const transform = () => {
    const pi = Math.PI;

    switch (coordinate) {
      case "Cartesian":
        const φ = Math.atan(b / a) * (180 / pi);
        setCartesian([a, b, c]);
        setCylindrical([Math.sqrt(a ** 2 + b ** 2), φ, c]);
        setSpherical([
          Math.sqrt(a ** 2 + b ** 2 + c ** 2),
          φ,
          Math.atan(Math.sqrt(a ** 2 + b ** 2) / c) * (180 / pi),
        ]);
        break;
      case "Cylindrical":
        setCartesian([a * Math.cos(b), a * Math.sin(b), c]);
        setCylindrical([a, b, c]);
        setSpherical([
          Math.sqrt(a ** 2 + c ** 2),
          b,
          (Math.atan(a / c) * 180) / pi,
        ]);
        break;
      case "Spherical":
        setCartesian([
          a * Math.sin(b) * Math.cos(c),
          a * Math.sin(b) * Math.sin(c),
          a * Math.cos(b),
        ]);
        setCylindrical([a * Math.sin(b), b, a * Math.cos(b)]);
        setSpherical([a, b, c]);
        break;
    }
  };

  return (
    <div className="App">
      <h1>Coordiante transformations</h1>

      <label for="coordinate">Choose coordiante type:</label>
      <select
        value={coordinate}
        onChange={(e) => setCoordinate(e.target.value)}
        name="coordinate"
        id="coordinate"
      >
        <option value="Cartesian">Cartesian</option>
        <option value="Cylindrical">Cylindrical</option>
        <option value="Spherical">Spherical</option>
      </select>

      <div>
        <br />
        <div
          style={{ display: "flex", flexDirection: "column", maxWidth: "50vw" }}
        >
          <div>
            {variables[0]} :{" "}
            <input
              type="number"
              name="x"
              id="x"
              onChange={(e) => setA(e.target.value)}
            />
          </div>
          <div>
            {variables[1]} :{" "}
            <input
              type="number"
              name="y"
              id="y"
              onChange={(e) => setB(e.target.value)}
            />
          </div>
          <div>
            {variables[2]} :{" "}
            <input
              type="number"
              name="z"
              id="z"
              onChange={(e) => setC(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <br />
        <button onClick={transform}>Transform</button>
      </div>

      <div
        style={{
          height: "150px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <div>
          Cartesian (x, y, z): ({cartesian[0]}, {cartesian[1]}, {cartesian[2]})
        </div>
        <div>
          Cylindrical (r, θ, z): ({cylindrical[0]}, {cylindrical[1]},{" "}
          {cylindrical[2]})
        </div>
        <div>
          Spherical (r, θ,φ): ({spherical[0]}, {spherical[1]}, {spherical[2]})
        </div>
      </div>
    </div>
  );
}

export default App;
