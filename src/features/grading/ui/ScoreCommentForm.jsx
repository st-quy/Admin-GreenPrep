import React, { useEffect, useState } from "react";
import { Input } from "antd";

const ScoreCommentForm = () => {
  const [score, setScore] = useState("");
  const [comment, setComment] = useState("");

  return (
    <div className="w-full h-full rounded-lg shadow px-[22px] py-[16px] bg-white">
      <label className="block text-base font-medium mb-[6px]">
        Score <span className="text-red-500">*</span>
      </label>
      <Input
        className="w-full h-[46px] px-5 py-3 rounded-md border"
        placeholder="Enter the score"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />

      <label className="block text-base font-medium mt-[12px] mb-[6px]">
        Comment
      </label>
      <Input.TextArea
        className="w-full !h-[100px] px-5 py-3 rounded-md border !resize-none "
        placeholder="Enter comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </div>
  );
};

export default ScoreCommentForm;
