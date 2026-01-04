import React from "react";
import Image from "next/image";
import spinergif from "@/assets/loader.gif";

export default function Loading() {
  return (
    <div className="flex justify-center align-center h-[100vh] w-[100vw]">
      <Image src={spinergif} alt="Loading..." className="mx-auto mt-20" width={48} height={48}/>
    </div>
  );
}
