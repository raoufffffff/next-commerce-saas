"use client"

import axios from "axios"
import { useEffect } from "react"

interface VisitProps {
  page: string;
  image: string;
  store: string;
}

const Visit = ({ page, image, store }: VisitProps) => {
  useEffect(() => {
    const postVisit = async () => {
      try {
        await axios.post("https://api.next-commerce.shop/api/public/visites", {
          page: page,
          imagepage: image,
          store: store
        });
        console.log("greate");
        
        // Logic for successful tracking can go here (e.g., a console log in dev)
      } catch (error) {
        console.error("Tracking Error:", error);
      }
    };

    // 🔥 The Missing Piece: You must call the function!
    postVisit();
    
  }, [page, image, store]); // Added dependencies to re-track if the user navigates!

  return null;
}

export default Visit;