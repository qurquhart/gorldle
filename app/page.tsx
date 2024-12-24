import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-md mx-auto p-6 pt-8 space-y-4 text-center">
      <div className="flex justify-center">
        <Image alt="tree" src="/tree.webp" width={200} height={200} />
      </div>
      <div className="italic pt-4 text-gray-400">
        Merry Christmas Gorly - love ya lots!
      </div>
      <br />
      <div className="grid gap-6">
        <Link href="/bee">
          <div className="text-5xl border rounded-xl py-4 font-nyt font-bold uppercase">
            <span className="text-[3.25rem]">G</span>orling{" "}
            <span className="text-[3.25rem]">B</span>ee
          </div>
        </Link>
        <Link href="/gorldle">
          <h1 className="text-5xl border rounded-xl py-4 font-nyt font-bold uppercase">
            <span className="text-[3.25rem]">G</span>orldle
          </h1>
        </Link>
        <Link href="/gorldoku">
          <h1 className="text-5xl border rounded-xl py-4 font-nyt font-bold uppercase">
            <span className="text-[3.25rem]">G</span>orldoku
          </h1>
        </Link>
      </div>
    </div>
  );
}
