import React, { useEffect, useState } from "react";
import { Input, Form, InputNumber } from "antd";
import { yupSync } from "@shared/lib/utils";
import * as yup from 'yup';
import "./index.css";

const ScoreCommentForm = () => {
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState("");
  const [form] = Form.useForm();
  let schema = yup.object().shape({
    score: yup
      .number()
      .typeError("Score must be a number")
      .required("Score is required")
      .max(10)
      .min(0)
      .integer(),
    comment: yup
      .string()
      .trim()
      .optional(),
  });

  return (
    <Form form={form} className="w-full h-fit rounded-lg shadow px-[22px] py-[16px] bg-white">
      <Form.Item name="score" rules={[yupSync(schema)]} className="mb-0">
        <div>
          <label className="block text-base font-medium mb-[6px]">
            Score <span className="text-red-500">*</span>
          </label>
          <InputNumber
            min={0}
            max={10}
            defaultValue={0}
            changeOnWheel
            className="w-full h-[46px] px-5 py-3 rounded-md border"
            placeholder="Enter the score"
            value={score}
            onChange={(e) => setScore(e)}
          />
        </div>
      </Form.Item>
      <Form.Item name="comment" rules={[yupSync(schema)]} noStyle={true}>
        <div>
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
      </Form.Item>
    </Form>
  );
};

export default ScoreCommentForm;
