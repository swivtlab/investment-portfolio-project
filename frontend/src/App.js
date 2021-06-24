import Header from "./components/include/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div
        id="background-overlay"
      >
        <img
          className="spinner-border"
          src={"/loader.gif"}
          alt="Loader"
        />
      </div>
    </div>
  );
}

export default App;
