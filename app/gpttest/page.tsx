"use client";
import React, { ChangeEvent, useState } from "react";

const InputForm = () => {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState("");

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/v1/gpt/generate", {
        method: "POST",
        body: JSON.stringify({ userMessage: question }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.status !== 200) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      setResult(data.result);
      setQuestion("");
      console.log(question);
      console.log(result);
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={question}
          type="text"
          onChange={onChangeInput}
          placeholder="무엇을 하고 싶으세요?"
        />
        <button type="submit">제출</button>
      </form>
      <div className="border w-1/2 h-11 bg-red-200 text-white">{result}</div>
    </>
  );
};

export default InputForm;
