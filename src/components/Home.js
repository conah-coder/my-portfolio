import React from "react"
import image from "../monstera-leaf.jpg";

export default function Home(){
 return (
  <main>
   <img src={image} alt="Monstera leaves" className="absolute object-cover w-full h-full"/>
   <section className="relative flex justify-center min-h-screen pt-10 lg:pt-64 px-8">
    <h1 className=" inline-flex text-green-100 font-bold cursive leading-none lg:leading-snug home-name">Hello! I'm Comfort. </h1>
   </section>
  </main>
 )
}