// boardState.js
import { useState, useEffect } from "react";


export const useBoardState = (initialLength) => {
  const [isClickArray, setIsClickArray] = useState(() => {
    // Check if the array is stored in local storage
    const storedArray = localStorage.getItem("isClickArray");
    return storedArray ? JSON.parse(storedArray) : Array.from({ length: initialLength }, () => false);
  });
  console.log("isClickArray at BoardState", isClickArray);

  useEffect(() => {
    // Save the array to local storage whenever it changes
    localStorage.setItem("isClickArray", JSON.stringify(isClickArray));
  }, [isClickArray]);

  return { isClickArray, setIsClickArray };
};
