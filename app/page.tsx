import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const { userId } = auth()
  return (
    <main >
      <div className="flex justify-between w-full h-screen">
        <div
          className="flex flex-col items-center justify-center w-1/2 "
        >
          <span
            className="text-6xl font-bold text-center text-white"
            style={{
              background: "-webkit-linear-gradient(#ffeba7 , #A83879)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            GOODBYE PROCASTINATION
            <br />
            HELLO PRODUCTIVITY
          </span>

        </div>
        <div className="flex items-center justify-center w-1/2 ">
          <Image
            src="/sample.png"
            alt="Sample "
            objectFit="contain"
            width={650}
            height={650}
          />
        </div>
      </div>
    </main>
  )
}