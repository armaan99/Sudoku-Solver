import "./App.css";
import GameBoard from "./components/game_board/GameBoard";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <GameBoard></GameBoard>
    </div>
  );
}

export default App;
