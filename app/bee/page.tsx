"use client";

import { useEffect, useState } from "react";
import { Cell, Refresh } from "../Bee";

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
