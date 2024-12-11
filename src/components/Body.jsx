import { useEffect, useState } from "react";

function Body() {
  const [gameOn, setGameOn] = useState(false);
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [score, setScore] = useState(0);

  let forestgreen = "forestgreen";
  let darkred = "darkred";

  // Function to start the game
  const gameStart = () => {
    setGameOn(!gameOn);
    setUserInput([]);

    // Display "Simon says"
    // code not useful anymore but kept for reference
    // const simon = document.querySelector(".simon");
    // const originalStyle = getComputedStyle(simon).visibility;

    // setTimeout(() => {
    //   simon.style.visibility = "visible";
    //   setTimeout(() => {
    //     simon.style.visibility = originalStyle;
    //   }, 3000);
    // }, 500);
  };

  // Function to shine colors
  const shine = (color, delay) => {
    const box = document.querySelector(`.${color}`);
    const originalColor = getComputedStyle(box).backgroundColor;

    setTimeout(() => {
      box.style.backgroundColor = color;
      setTimeout(() => {
        box.style.backgroundColor = originalColor;
      }, 500);
    }, delay);
  };

  // Function to shine sequence
  const shineSequence = (seq) => {
    seq.forEach((item, index) => {
      shine(item, index * 1000);
    });
  };

  const simonText = "Simon says GameOn!!!";

  // useEffect to generate random sequence
  useEffect(() => {
    if (gameOn) {
      const colorArray = ["red", "blue", "green", "yellow"];
      const freshSequence = [];

      for (let i = 0; i < colorArray.length; i++) {
        const randomIndex = Math.floor(Math.random() * colorArray.length);
        freshSequence.push(colorArray[randomIndex]);
      }

      setSequence(freshSequence);
      console.log("Generated sequence:", freshSequence);

      // Call shineSequence after the sequence has been set
      setTimeout(() => {
        shineSequence(freshSequence);
      }, 2000);
    }
  }, [gameOn]);

  // Function to get user input
  const getUserInput = (e) => {
    setUserInput((prevInput) => [...prevInput, e.target.value]);
  };

  // Function to check if arrays are equal
  const checkArray = (firArray, secArray) => {
    if (firArray.length !== secArray.length) {
      return false;
    }
    for (let i = 0; i < firArray.length; i++) {
      if (firArray[i] !== secArray[i]) {
        return false;
      }
    }
    return true;
  };

  // useEffect to compare sequence and userInput
  useEffect(() => {
    if (sequence.length === userInput.length && userInput.length > 0) {
      console.log("User input:", userInput);
      console.log("Expected sequence:", sequence);
      if (checkArray(sequence, userInput)) {
        console.log("User input matches the sequence!");
        setScore(score + 1);
        shine(forestgreen, 0);
      } else {
        console.log("User input does not match the sequence.");
        setScore(0);
        shine(darkred, 0);
      }
      setUserInput([]); // Reset user input after comparison
    }
  }, [userInput, sequence]);

  useEffect(() => {
    setIsDisabled(!isDisabled);
  }, [gameOn]);

  return (
    <div className="bg-[url('/img/background1.jpeg')] bg-contain bg-repeat h-screen bg-left-top">
      <div className="w-[50%] mx-auto flex justify-center flex-col">
        <button
          onClick={gameStart}
          className="text-[24px] flex mx-auto my-4 outline-0 transform hover:scale-105 shadow-md transition ease duration-500 border-y-black rounded-[10px] shadow-slate-900"
        >
          <div className="m-auto">
            <div
              className={`border-[2px] ${
                gameOn ? "border-green-800" : "border-red-800"
              } w-[40px] h-[20px] rounded-[100px] relative bg-[#f5f5f5]`}
            >
              <div id="switches" className={!gameOn ? "right" : "left"}></div>
            </div>
          </div>
        </button>

        <p
          className={`simon text-center p-[20px] ${
            gameOn ? "visible" : "hidden"
          } text-2xl font-extrabold`}
        >
          Simon says Game On!!!
        </p>
        <div className="colorBox relative flex justify-center w-[400px] h-[400px] mx-auto flex-wrap rounded-full overflow-hidden shadow-xl shadow-black">
          <button
            onClick={getUserInput}
            disabled={isDisabled}
            value="red"
            className={`red bg-red-600 w-[50%] shadow-md shadow-black rounded-br-[50px]`}
          >
            Red
          </button>
          <button
            onClick={getUserInput}
            disabled={isDisabled}
            value="blue"
            className={`blue bg-blue-600 w-[50%] shadow-md shadow-black rounded-bl-[50px]`}
          >
            Blue
          </button>
          <div className="darkred forestgreen text-center m-7 bg-black text-white font-extrabold w-[40px] h-[40px] rounded-full flex flex-col justify-center absolute top-[150px]">
            {score}
          </div>
          <button
            onClick={getUserInput}
            disabled={isDisabled}
            value="green"
            className={`green bg-green-600 w-[50%] shadow-md shadow-black rounded-tr-[50px]`}
          >
            Green
          </button>
          <button
            onClick={getUserInput}
            disabled={isDisabled}
            value="yellow"
            className={`yellow bg-yellow-600 w-[50%] shadow-md shadow-black rounded-tl-[50px]`}
          >
            Yellow
          </button>
        </div>
      </div>
    </div>
  );
}

export default Body;
