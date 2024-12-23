"use client";

export function Letter({
  state = "default",
  letter,
}: {
  state?: "default" | "correct" | "inWord" | "incorrect";
  letter?: string;
}) {
  const states = {
    default: "text-black",
    incorrect: "bg-gray-400 text-white border-gray-400",
    correct: "bg-green-500 text-white border-green-600",
    inWord: "bg-yellow-400 text-white border-yellow-500",
  };

  const global =
    "aspect-square transition-all border border-4 rounded-lg flex items-center justify-center font-semibold uppercase text-4xl";

  if (letter == "") {
    return (
      <div className={"bg-white border " + global}>{letter ? letter : ""}</div>
    );
  }

  return (
    <div className={states[state] + " " + global}>{letter ? letter : ""}</div>
  );
}

export function Key({
  state = "default",
  letter,
  onClick,
  backspace,
  submit,
}: {
  state?: "default" | "correct" | "inWord" | "incorrect";
  letter: string;
  onClick: any;
  backspace?: any;
  submit?: any;
}) {
  const states = {
    default: "text-black bg-gray-200",
    incorrect: "bg-gray-400 text-white border-gray-400",
    correct: "bg-green-500 text-white border-green-600",
    inWord: "bg-yellow-400 text-white border-yellow-500",
  };

  const global =
    "py-3 text-black transition-all rounded-lg flex items-center justify-center font-semibold uppercase text-base";

  if (letter == "-") {
    return (
      <button
        onClick={() => submit()}
        className={states[state] + " px-2 text-sm " + global}
      >
        ENTER
      </button>
    );
  }

  if (letter == "_") {
    return (
      <button
        onClick={() => backspace()}
        className={states[state] + " px-2 " + global}
      >
        <DeleteIcon />
      </button>
    );
  }

  return (
    <button
      onClick={() => onClick(letter)}
      className={states[state] + " w-8 " + global}
    >
      {letter}
    </button>
  );
}

export function DeleteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7.91987 5C7.33602 5 6.78132 5.25513 6.40136 5.69842L2.11564 10.6984C1.47366 11.4474 1.47366 12.5526 2.11564 13.3016L6.40136 18.3016C6.78132 18.7449 7.33602 19 7.91987 19L19 19C20.1046 19 21 18.1046 21 17L21 7C21 5.89543 20.1046 5 19 5L7.91987 5Z"
        stroke="#292929"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M15 10.0001L11 14.0001"
        stroke="#292929"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M11 10.0001L15 14.0001"
        stroke="#292929"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
