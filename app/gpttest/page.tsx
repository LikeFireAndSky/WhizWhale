"use client";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";

const InputForm = () => {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState("");

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/gpt/generate", {
        question,
      });

      console.log(res.data.data);
      setResult(res.data.data);
      setQuestion("");
      console.log(result);

      if (res.status !== 200) {
        throw new Error(`Request failed with status ${res.status}`);
      }
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
