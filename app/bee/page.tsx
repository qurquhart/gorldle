"use client";

import { useEffect, useState } from "react";

export default function page() {
  const [input, setInput] = useState("");

  const [letters, setLetters] = useState("      ".split(""));

  const [heroLetter, setHeroLetter] = useState(" ");

  const [correctGuesses, setCorrectGuesses] = useState<Array<string>>([]);

  const [statusText, setStatusText] = useState("Make a guess...");

  function initGame() {
    const alphabet = ShuffleLetters("abcdefghijklmnopqrstuvwxyz");

    const pickedLetters = [
      alphabet[1],
      alphabet[2],
      alphabet[3],
      alphabet[4],
      alphabet[5],
      alphabet[6],
    ];
    setHeroLetter(alphabet[0]);
    setLetters(pickedLetters);
  }

  useEffect(() => {
    initGame();
  }, []);

  function updateInput(letter: string) {
    if (input.length < 25) {
      setInput(input + letter);
    }
  }

  function backspace() {
    // if (input.length != 0) {
    //   setInput(input.slice(0, -1));
    // }
    setInput("");
  }

  function ShuffleLetters(letters: string) {
    var a = letters.split(""),
      n = a.length;

    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    setLetters(a);
    return a;
  }

  async function checkWord(word: string) {
    const options = {};
    const isWord = await fetch(
      "https://api.dictionaryapi.dev/api/v2/entries/en/" + word,
      options
    );
    if (isWord.status == 200) {
      return true;
    }
    return false;
  }

  async function submit() {
    const valid = await checkWord(input);

    console.log("submit init", valid);

    if (valid) {
      if (!input.includes(heroLetter)) {
        setStatusText("Doesn't contain " + heroLetter.toUpperCase());
        setInput("");
        return;
      }
      if (input.length < 4) {
        setStatusText("Too short.");
        setInput("");
        return;
      }
      if (correctGuesses && !correctGuesses.includes(input)) {
        setCorrectGuesses([...correctGuesses, input]);
        if (totalPoints > 10) {
          setStatusText("Killin it!");
          setInput("");
          return;
        }
        if (totalPoints > 20) {
          setStatusText("Grillin it!");
          setInput("");
          return;
        }
        if (totalPoints > 30) {
          setStatusText("Holy fucking shit!");
          setInput("");
          return;
        }
        if (totalPoints > 40) {
          setStatusText("You a bad bitch!");
          setInput("");
          return;
        }
        setStatusText("Great job!");
        setInput("");
        return;
      } else {
        setStatusText("Already guessed");
        setInput("");
      }
    } else {
      setStatusText("Invalid Word");
      setInput("");
    }
  }

  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    var points = 0;
    for (const word in correctGuesses) {
      points += correctGuesses[word].length;
    }
    setTotalPoints(points);
  }, [correctGuesses]);

  return (
    <div className="max-w-md mx-auto p-6 pt-8 space-y-4 text-center">
      <div>
        <h1 className="text-5xl pb-4 py-3 font-nyt font-bold uppercase">
          <span className="text-[3.25rem]">G</span>orling{" "}
          <span className="text-[3.25rem]">B</span>ee
        </h1>
      </div>
      <div className="flex pb-4 font-semibold text-gray-500 items-center w-min m-auto gap-2">
        Score:{" "}
        <span className="min-w-10 rounded-full bg-yellow-400 text-black font-bold p-2 w-min px-3 flex items-center justify-center">
          {totalPoints}
        </span>{" "}
      </div>
      <div className="rounded-lg border text-2xl font-semibold tracking-wide w-max m-auto h-12 flex items-center justify-center px-4 min-w-[50%]">
        {input != "" ? (
          <>
            {input.split("").map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className={
                    item == heroLetter
                      ? "text-yellow-400 uppercase"
                      : "uppercase"
                  }
                >
                  {item}
                </div>
              );
            })}
          </>
        ) : (
          <div className="italic opacity-50 text-lg">{statusText}</div>
        )}
      </div>
      <div className="w-full flex justify-center py-20 pb-18">
        <div className="grid relative">
          <div className="absolute left-[33.33%] top-[27%]">
            <Cell onClick={updateInput} center letter={heroLetter} />
          </div>
          <div className="relative flex gap-0 rotate-180 w-min">
            <div className="rotate-180">
              <Cell onClick={updateInput} letter={letters[0]} />
            </div>
            <div className="translate-y-[63%] rotate-180">
              <Cell onClick={updateInput} letter={letters[1]} />
            </div>
            <div className="rotate-180">
              <Cell onClick={updateInput} letter={letters[2]} />
            </div>
          </div>
          <div className="relative mt-6 flex gap-0 w-min">
            <div>
              <Cell onClick={updateInput} letter={letters[3]} />
            </div>
            <div className="translate-y-[63%]">
              <Cell onClick={updateInput} letter={letters[4]} />
            </div>
            <div className="">
              <Cell onClick={updateInput} letter={letters[5]} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 w-min m-auto">
        <button
          onClick={() => backspace()}
          className="h-12 px-5 border rounded-full"
        >
          Delete
        </button>
        <button
          onClick={() => ShuffleLetters(letters.join(""))}
          className="h-12 w-12 flex justify-center items-center border rounded-full"
        >
          <div className="">
            <Refresh />
          </div>
        </button>
        <button
          onClick={() => submit()}
          className="h-12 px-5 border rounded-full"
        >
          Enter
        </button>
      </div>
      <br />
      <br />
      <div className="grid gap-2  max-w-96 px-4 m-auto">
        <div className="grid grid-cols-4 font-bold text-gray-500 text-xs pb-2 border-b">
          <div className="capitalize col-span-3 font-semibold text-start">
            Word
          </div>
          <div className="text-end">Points</div>
        </div>
        {correctGuesses?.map((item: any, index: number) => {
          return (
            <div className="grid grid-cols-4 fadeIn" key={index}>
              <div className="capitalize col-span-3 font-semibold text-start">
                {item}
              </div>
              <div className="text-end">{item.length}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Refresh() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.6651 2.37192L7.51899 3.85674C9.42081 2.75656 11.633 2.31597 13.8112 2.60353C15.9894 2.89109 18.0115 3.89068 19.5626 5.44671C21.1138 7.00273 22.107 9.0279 22.3877 11.207C22.6685 13.3861 22.2209 15.5969 21.1148 17.4953L19.8814 16.7837C20.8309 15.1571 21.2159 13.2623 20.9766 11.3941C20.7374 9.52598 19.8871 7.78937 18.5583 6.45462C17.2296 5.11988 15.4968 4.26191 13.6297 4.01426C11.7626 3.76662 9.8661 4.1432 8.2353 5.08539H8.23056L9.33113 6.99241L5.86813 5.91556L6.6651 2.37192ZM3.87572 17.4715C2.9984 15.9535 2.53728 14.2307 2.53894 12.4774C2.54061 10.724 3.005 9.00217 3.88521 7.48577L5.11861 8.19734C4.17475 9.82458 3.79466 11.718 4.03737 13.5834C4.28009 15.4488 5.13202 17.1819 6.46085 18.5134C7.78968 19.845 9.52102 20.7004 11.386 20.9469C13.2509 21.1935 15.1451 20.8172 16.7742 19.8767L15.7163 18.0503L19.1793 19.1271L18.3824 22.666L17.481 21.1101C15.193 22.43 12.4744 22.7872 9.92305 22.1031C7.3717 21.419 5.19649 19.7496 3.87572 17.4621V17.4715Z"
        fill="black"
      />
    </svg>
  );
}

export function Cell({
  letter,
  center,
  onClick,
}: {
  letter: string;
  center?: boolean;
  onClick: any;
}) {
  return (
    <button onClick={() => onClick(letter)} className="relative fadeIn">
      <svg
        className="w-28 flex justify-center items-center h-auto -m-3"
        viewBox="0 0 120 103.92304845413263"
        data-testid="hive-cell-outer"
      >
        <polygon
          className={!center ? "fill-gray-100" : "fill-yellow-300"}
          points="0,51.96152422706631 30,0 90,0 120,51.96152422706631 90,103.92304845413263 30,103.92304845413263"
          stroke="white"
          strokeWidth="7.5"
          data-testid="cell-fill"
        ></polygon>
      </svg>
      <div className="fadeIn flex justify-center items-center uppercase font-bold text-3xl absolute inset-0 z-50">
        {letter}
      </div>
    </button>
  );
}
