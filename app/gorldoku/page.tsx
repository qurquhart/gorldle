"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DeleteIcon } from "../Wordle";

export default function page() {
  const sudoku = require("@/lib/sudoku.js");

  const [board, setBoard] = useState<any>();

  const [originalBoard, setOriginalBoard] = useState<any>();

  useEffect(() => {
    init();
  }, []);

  function init() {
    const gen = sudoku.sudoku.generate("easy").split("");
    setBoard(gen);
    setOriginalBoard(gen);
    setIncorrect(false);
    setCorrect(false);
  }

  function updateBoard(newNumber: string) {
    if (originalBoard[selectedIndex] != ".") {
      return;
    }
    var newBoard = [...board];
    // console.log(newBoard);
    newBoard[selectedIndex] = newNumber;
    setBoard(newBoard);
  }

  const [correct, setCorrect] = useState(false);
  const [inCorrect, setIncorrect] = useState(false);

  function validateBoard() {
    const solved = sudoku.sudoku.solve(board);
    if (solved == board.join("")) {
      console.log("valid af");
      setCorrect(true);
      setIncorrect(false);
    } else {
      // console.log(solved);

      // console.log(board.join(""));
      setIncorrect(true);
      setCorrect(false);
    }
  }

  const router = useRouter();

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <div className="max-w-md mx-auto p-3 pt-4 space-y-3 text-center">
      <h1 className="text-5xl pb-2 font-nyt font-bold uppercase">
        <span className="text-[3.25rem]">G</span>orldoku
      </h1>
      <div className="grid m-auto grid-cols-9 text-xl w-max h-max border-black border-t-4 border-l-4 border-b-4">
        {board &&
          board.map((item: any, index: number) => (
            <SodukoCell
              onClick={setSelectedIndex}
              selected={selectedIndex == index}
              key={index}
              original={originalBoard[index] != "."}
              index={index}
              number={item}
            />
          ))}
      </div>
      {!correct && !inCorrect && <br />}
      {correct && (
        <div>
          <div className="bg-green-100 p-2 font-semibold flex items-center justify-between text-green-800 rounded-lg text-start border-2 border-green-200">
            <div className="pl-1">You fuggin didit!</div>
            <button
              onClick={() => {
                init();
              }}
              className=" rounded bg-green-500 text-white text-sm px-3 py-1"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      {inCorrect && (
        <div>
          <div className="bg-yellow-100 p-2 font-semibold flex items-center justify-between text-yellow-800 rounded-lg text-start border-2 border-yellow-200">
            <div className="pl-1">That aint it!</div>
            <button
              onClick={() => {
                setBoard(sudoku.sudoku.solve(board).split(""));
              }}
              className=" rounded bg-yellow-500 text-white text-sm px-3 py-1"
            >
              Fuck It, Solve.
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-5 gap-2">
        <NumberButton onClick={updateBoard} number="1" />
        <NumberButton onClick={updateBoard} number="2" />
        <NumberButton onClick={updateBoard} number="3" />
        <NumberButton onClick={updateBoard} number="4" />
        <NumberButton onClick={updateBoard} number="5" />
        <NumberButton onClick={updateBoard} number="6" />
        <NumberButton onClick={updateBoard} number="7" />
        <NumberButton onClick={updateBoard} number="8" />
        <NumberButton onClick={updateBoard} number="9" />
        <NumberButton onClick={updateBoard} number="." />
      </div>
      <div className="flex gap-4 items-center justify-center pt-4">
        <button
          onClick={() => setBoard(sudoku.sudoku.solve(originalBoard).split(""))}
          className="border rounded-full p-2 px-4"
        >
          Solve
        </button>
        <button
          onClick={() => validateBoard()}
          className="border p-2 px-4 rounded-full"
        >
          Validate
        </button>
      </div>
    </div>
  );
}

export function NumberButton({
  number,
  onClick,
}: {
  number: string;
  onClick: any;
}) {
  return (
    <button
      onClick={() => onClick(number)}
      className="p-3 flex justify-center items-center border-2 rounded-lg border-black/30 bg-gray-100 text-xl font-semibold"
    >
      {number == "." ? <DeleteIcon /> : number}
    </button>
  );
}

export function SodukoCell({
  index,
  number,
  onClick,
  selected,
  original,
}: {
  index: number;
  number: string;
  onClick: any;
  selected: boolean;
  original: boolean;
}) {
  if (original) {
    return (
      <div
        className={`w-10 h-10 ${original ? "bg-gray-200 text-gray-800" : ""} ${
          selected ? "bg-gray-100" : ""
        } border border-black/50 flex items-center justify-center font-bold ${
          index % 3 == 2 ? "border-r-4 border-r-black" : ""
        } ${index > 17 && index < 27 ? "border-b-4 border-b-black" : ""} ${
          index > 44 && index < 54 ? "border-b-4 border-b-black" : ""
        }`}
      >
        {number != "." && number}
      </div>
    );
  }
  return (
    <button
      onClick={() => onClick(index)}
      className={`w-10 h-10 ${original ? "bg-gray-200 text-gray-700" : ""} ${
        selected ? "bg-yellow-100 " : ""
      } border border-black/50 flex items-center justify-center font-bold ${
        index % 3 == 2 ? "border-r-4 border-r-black" : ""
      } ${index > 17 && index < 27 ? "border-b-4 border-b-black" : ""} ${
        index > 44 && index < 54 ? "border-b-4 border-b-black" : ""
      }`}
    >
      {number != "." && number}
    </button>
  );
}
