'use client'
import React from "react";

import { NextReactP5Wrapper } from "@p5-wrapper/next";
import Sketch from "./sketch";

const Home = () => {
  return (
    <NextReactP5Wrapper sketch={Sketch} />
  )

}
export default Home