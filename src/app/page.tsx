'use client'
import React, { useEffect, useState } from 'react';
import p5, { Color } from 'p5';
import Sketch from './engine';

export default function Home() {

  setTimeout(() => {
  }, 1500)

  useEffect(() => {
    const clock = new p5((p: p5) => Sketch(p));

    return () => {
      clock.remove();
    };
  }, []);
}

