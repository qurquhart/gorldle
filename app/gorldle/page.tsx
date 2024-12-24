"use client";

import { wordList } from "@/lib/wordList";
import { useEffect, useState } from "react";
import { Key, Letter } from "../Wordle";

export default function Home() {
  const min = 0;

  const max = wordList.length;

  const randomWord =
    wordList[Math.floor(Math.random() * (max - min + 1) + min)];

  const [word, setWord] = useState(randomWord.split(""));

  const [input, setInput] = useState("");

  const [error, setError] = useState(false);

  // const [override, setOverride] = useState(false);

  const [guessCount, setGuessCount] = useState(0);

  const [guess1, setGuess1] = useState(["", "", "", "", ""]);
  const [guess2, setGuess2] = useState(["", "", "", "", ""]);
  const [guess3, setGuess3] = useState(["", "", "", "", ""]);
  const [guess4, setGuess4] = useState(["", "", "", "", ""]);
  const [guess5, setGuess5] = useState(["", "", "", "", ""]);

  const guesses = [guess1, guess2, guess3, guess4, guess5];

  function updateInput(letter: string) {
    if (input.length < 5) {
      setInput(input + letter);
    }
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

  const [correctList, setCorrectList] = useState<Array<string>>([]);
  const [incorrectList, setIncorrectList] = useState<Array<string>>([]);
  const [inWordList, setInWordList] = useState<Array<string>>([]);

  useEffect(() => {
    for (const guess in guesses) {
      for (const letter in guesses[guess]) {
        if (word.includes(guesses[guess][letter])) {
          if (guesses[guess][letter] == word[letter]) {
            // correctList.push(guesses[guess][letter]);
            if (!correctList.includes(guesses[guess][letter])) {
              setCorrectList([...correctList, guesses[guess][letter]]);
            }
          } else {
            // inWordList.push(guesses[guess][letter]);
            if (!inWordList.includes(guesses[guess][letter])) {
              setInWordList([...inWordList, guesses[guess][letter]]);
            }
          }
        } else {
          if (!incorrectList.includes(guesses[guess][letter])) {
            setIncorrectList([...incorrectList, guesses[guess][letter]]);
          }
        }
      }
    }
    console.log(correctList, inWordList);
  }, [guesses]);

  function checkStatus(letter: string) {
    if (correctList && correctList.includes(letter)) {
      return "correct";
    }
    if (inWordList && inWordList.includes(letter)) {
      return "inWord";
    }
    if (incorrectList && incorrectList.includes(letter)) {
      return "incorrect";
    }
    return "default";
  }

  function backspace() {
    if (input.length != 0) {
      setInput(input.slice(0, -1));
    }
  }

  useEffect(() => {
    setError(false);
  }, [input]);

  const [failure, setFailure] = useState(false);

  async function submitGuess(override?: boolean) {
    setError(false);
    if (guessCount < 5) {
      if (input.length == 5) {
        if (!override) {
          const valid = await checkWord(input);

          if (!valid) {
            setError(true);
            return;
          }
        }

        if (guessCount == 0) {
          setGuess1(input.split(""));
        }
        if (guessCount == 1) {
          setGuess2(input.split(""));
        }
        if (guessCount == 2) {
          setGuess3(input.split(""));
        }
        if (guessCount == 3) {
          setGuess4(input.split(""));
        }
        if (guessCount == 4) {
          setGuess5(input.split(""));
          if (input != word.join("")) {
            setFailure(true);
          }
        }

        console.log(input, word.join(""));
        // win condition
        if (input === word.join("")) {
          console.log("You fuggin' didit");
          setWin(true);
        }

        setInput("");

        setGuessCount(guessCount + 1);
      }
    }
  }

  // const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  const row1 = "qwertyuiop".split("");
  const row2 = "asdfghjkl".split("");
  const row3 = "-zxcvbnm_".split("");

  function playAgain() {
    console.log("reset");
    setGuess1(["", "", "", "", ""]);
    setGuess2(["", "", "", "", ""]);
    setGuess3(["", "", "", "", ""]);
    setGuess4(["", "", "", "", ""]);
    setGuess5(["", "", "", "", ""]);
    setInput("");
    setError(false);
    setWin(false);
    setFailure(false);
    setCorrectList([]);
    setInWordList([]);
    setIncorrectList([]);
    setGuessCount(0);
    setWord(randomWord.split(""));
  }

  const [win, setWin] = useState(false);

  return (
    <div className="max-w-md mx-auto p-6 pt-6 space-y-4 text-center">
      <h1 className="text-5xl pb-3 font-nyt font-bold uppercase">
        <span className="text-[3.25rem]">G</span>orldle
      </h1>
      {/* Input: {input} <br /> guess1: {guess1}
      <br /> guess2: {guess2}
      <br /> guess3: {guess3}
      <br /> guess4: {guess4}
      <br /> guess5: {guess5} */}
      <div className="grid gap-2">
        {guesses.map((guess: any, index: number) => {
          if (guessCount == index) {
            return (
              <div className="grid grid-cols-5 gap-2" key={index}>
                {"12345".split("").map((letter: any, index: number) => {
                  return (
                    <Letter
                      key={index}
                      state={"default"}
                      letter={input[index] ? input[index] : " "}
                    />
                  );
                })}
              </div>
            );
          }
          return (
            <div className="grid grid-cols-5 gap-2" key={index}>
              {guess.map((letter: any, index: number) => {
                return (
                  <Letter
                    key={index}
                    state={
                      word.includes(letter)
                        ? word[index] == letter
                          ? "correct"
                          : "inWord"
                        : "incorrect"
                    }
                    letter={letter}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      {win && !failure && (
        <div>
          <div className="bg-green-100 p-2 font-semibold flex items-center justify-between text-green-800 rounded-lg text-start border-2 border-green-200">
            <div className="pl-1">You fuggin didit!</div>
            <button
              onClick={() => {
                playAgain();
              }}
              className=" rounded bg-green-500 text-white text-sm px-3 py-1"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {failure && (
        <div>
          <div className="bg-red-100 p-2 font-semibold flex items-center justify-between text-red-800 rounded-lg text-start border-2 border-red-200">
            <div className="pl-1">You fuggin didn't do it!</div>
            <button
              onClick={() => {
                playAgain();
              }}
              className=" rounded bg-red-500 text-white text-sm px-3 py-1"
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {!win && !failure && (
        <div
          className={error ? "opacity-100" : "opacity-0 pointer-events-none"}
        >
          <div className="bg-yellow-100 p-2 font-semibold flex items-center justify-between text-yellow-800 rounded-lg text-start border-2 border-yellow-200">
            <div className="pl-1">I don't think that's a word...</div>
            <button
              onClick={() => {
                submitGuess(true);
              }}
              className=" rounded bg-yellow-500 text-white text-sm px-3 py-1"
            >
              Fuck You
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-3">
        <div className="flex justify-between w-full">
          {row1.map((item: any, index: number) => {
            return (
              <Key
                key={index}
                onClick={updateInput}
                state={checkStatus(item)}
                letter={item}
              />
            );
          })}
        </div>
        <div className="flex gap-2">
          {row2.map((item: any, index: number) => {
            return (
              <Key
                key={index}
                onClick={updateInput}
                state={checkStatus(item)}
                letter={item}
              />
            );
          })}
        </div>
        <div className="flex justify-between w-full">
          {row3.map((item: any, index: number) => {
            return (
              <Key
                key={index}
                onClick={updateInput}
                backspace={backspace}
                submit={submitGuess}
                state={checkStatus(item)}
                letter={item}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
