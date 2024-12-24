"use client";

import { DeleteIcon } from "./Wordle";

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
