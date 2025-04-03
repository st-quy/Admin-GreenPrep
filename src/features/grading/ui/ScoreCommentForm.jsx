import React, { useEffect, useState } from "react";
import { Input, Form, InputNumber } from "antd";
import { yupSync } from "@shared/lib/utils";
import * as yup from "yup";
import "./index.css";

const ScoreCommentForm = ({
  partNumber,
  questionIndex,
  onScoreChange,
  savedData = null,
  isSpeaking = false,
}) => {
  const [score, setScore] = useState(
    savedData?.score !== undefined ? savedData.score : undefined
  );
  const [comment, setComment] = useState(savedData?.comment || "");
  const [form] = Form.useForm();

  let schema = yup.object().shape({
    score: yup
      .number()
      .typeError("Score must be a number")
      .nullable()
      .min(0)
      .integer("Score must be an integer"),
    comment: yup.string().trim().optional(),
  });

  useEffect(() => {
    // Update form when savedData changes
    if (savedData) {
      setScore(savedData.score !== undefined ? savedData.score : undefined);
      setComment(savedData.comment || "");
      form.setFieldsValue({
        score: savedData.score !== undefined ? savedData.score : undefined,
        comment: savedData.comment || "",
      });
    }
  }, [savedData, form]);

  // Update when partNumber or questionIndex changes to ensure correct data is shown
  useEffect(() => {
    if (savedData) {
      setScore(savedData.score !== undefined ? savedData.score : undefined);
      setComment(savedData.comment || "");
      form.setFieldsValue({
        score: savedData.score !== undefined ? savedData.score : undefined,
        comment: savedData.comment || "",
      });
    } else {
      setScore(undefined);
      setComment("");
      form.setFieldsValue({
        score: undefined,
        comment: "",
      });
    }
  }, [partNumber, questionIndex, savedData, form]);

  const handleScoreChange = (value) => {
    setScore(value);
    if (onScoreChange) {
      onScoreChange(partNumber, questionIndex, value, comment);
    }
  };

  const handleCommentChange = (e) => {
    const value = e.target.value;
    setComment(value);
    if (onScoreChange) {
      onScoreChange(partNumber, questionIndex, score, value);
    }
  };

  return (
    <Form
      form={form}
      className="w-full h-fit rounded-lg shadow px-[22px] py-[16px] bg-white"
      initialValues={{ score: score, comment: comment }}
    >
      <Form.Item name="score" rules={[yupSync(schema)]} className="mb-0">
        <div>
          <label className="block text-base font-medium mb-[6px]">
            Score <span className="text-red-500">*</span>
          </label>
          <InputNumber
            min={0}
            precision={0}
            className="w-full h-[46px] px-5 py-3 rounded-md border"
            placeholder="Enter the score"
            value={score}
            onChange={handleScoreChange}
          />
        </div>
      </Form.Item>
      <Form.Item name="comment" rules={[yupSync(schema)]} noStyle={true}>
        <div>
          <label className="block text-base font-medium mt-[12px] mb-[6px]">
            Comment
          </label>
          <Input.TextArea
            className="w-full !h-[100px] px-5 py-3 rounded-md border !resize-none"
            placeholder="Enter comment"
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
      </Form.Item>
    </Form>
  );
};

export default ScoreCommentForm;
