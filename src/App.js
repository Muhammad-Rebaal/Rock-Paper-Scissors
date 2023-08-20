// This part brings in some special tools we need to make the game work.
import { useState } from "react";
import "./App.css";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";

// These are the different actions and what they beat.
const actions = {
  rock: "scissors",
  paper: "scissors",
  scissors: "rock",
};

// This helps us pick a random action for the computer.
function randomAction() {
  const keys = Object.keys(actions);
  const index = Math.floor(Math.random() * keys.length);

  return keys[index];
}

// This part shows the icons for rock, paper, and scissors.
function ActionIcon({ action, ...props }) {
  const icons = {
    rock: FaHandRock,
    paper: FaHandPaper,
    scissors: FaHandScissors,
  };
  const Icon = icons[action];
  return <Icon {...props} />;
}

// This part shows the players' information.
function Player({ name = "Player", score = 0, action = "rock" }) {
  return (
    <div className="player">
      <div className="score">{`${name}: ${score}`}</div>
      <div className="centericon">
        <div className="action">
          {action && <ActionIcon size={100} action={action} />}
        </div>
      </div>
    </div>
  );
}

// This part shows the buttons for rock, paper, and scissors.
function Actionbutton({ action = "rock", onSelect }) {
  return (
    <button className="round-btn" onClick={() => onSelect(action)}>
      <ActionIcon action={action} />
    </button>
  );
}

// This is the main part of the game.
function App() {
  // These help us keep track of the game's status.
  const [playerAction, setPlayerAction] = useState("rock");
  const [ComputerAction, setComputerAction] = useState("rock");
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [winner, setWinner] = useState(0);

  // This function decides who wins and updates the scores.
  const handleActionSelect = (selectedAction) => {
    const newComputerAction = randomAction();
    setPlayerAction(selectedAction);
    setComputerAction(newComputerAction);

    const newWinner = calculateWinner(selectedAction, newComputerAction);
    setWinner(newWinner);
    if (newWinner === -1) {
      setPlayerScore(playerScore + 1);
    } else if (newWinner === 1) {
      setComputerScore(computerScore + 1);
    }
  };

  // This function figures out who wins based on the actions.
  function calculateWinner(action1, action2) {
    if (action1 === action2) {
      return 0; // It's a tie
    } else if (actions[action1] === action2) {
      return -1; // Player wins
    } else if (actions[action2] === action1) {
      return 1; // Computer wins
    }
    return null; // Something's not right
  }

  // This part shows who wins on the screen.
  function ShowWinner({ winner = 0 }) {
    const text = {
      "-1": "You Win",
      0: "It's a Tie",
      1: "You Lose!",
    };
    return <h2>{text[winner]}</h2>;
  }

  // This is where the game starts.
  return (
    <>
      <div className="center">
        <h1>Rock Paper Scissors</h1>
        <div className="container">
          <Player name={"Player"} score={playerScore} action={playerAction} />
          <Player name={"Computer"} score={computerScore} action={ComputerAction} />
        </div>
        <Actionbutton action="rock" onSelect={handleActionSelect} />
        <Actionbutton action="paper" onSelect={handleActionSelect} />
        <Actionbutton action="scissors" onSelect={handleActionSelect} />
        <div>
          <ShowWinner winner={winner} />
        </div>
      </div>
    </>
  );
}

// This makes the game ready to be used.
export default App;
