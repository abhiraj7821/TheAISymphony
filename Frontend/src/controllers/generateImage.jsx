import { useState } from "react";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

    const generateImage = async () => {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}` // use .env
        },
        body: JSON.stringify({
            prompt: prompt,
            n: 1,
            size: "1024x1024"
        })
        });
        const data = await response.json();
        setImageUrl(data.data[0].url);
    };
};