"use client";

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
