import React, { useEffect, useState } from "react";
import { Input, Form, InputNumber } from "antd";
import { yupSync } from "@shared/lib/utils";
import * as yup from "yup";
import "./index.css";

const ScoreCommentForm = ({
  partNumber,
  questionIndex,
  // savedData = null,
  isSpeaking = false,
}) => {
  // const [comment, setComment] = useState(savedData?.comment || "");
  const [comment, setComment] = useState("");
  const [form] = Form.useForm();

  // useEffect(() => {
  //   // Update form when savedData changes
  //   if (savedData) {
  //     setComment(savedData.comment || "");
  //     form.setFieldsValue({
  //       comment: savedData.comment || "",
  //     });
  //   }
  // }, [savedData, form]);

  // // Update when partNumber or questionIndex changes to ensure correct data is shown
  // useEffect(() => {
  //   if (savedData) {
  //     setComment(savedData.comment || "");
  //     form.setFieldsValue({
  //       comment: savedData.comment || "",
  //     });
  //   } else {
  //     setComment("");
  //     form.setFieldsValue({
  //       comment: "",
  //     });
  //   }
  // }, [partNumber, questionIndex, savedData, form]);

  const handleCommentChange = (e) => {
    const value = e.target.value;
    setComment(value);
  };

  return (
    <Form
      form={form}
      className="w-full h-fit rounded-lg shadow px-[22px] py-[16px] bg-white"
      // initialValues={{ comment: comment }}
    >
      <Form.Item name="comment" 
      // rules={[yupSync(schema)]} 
      noStyle={true}>
        <div>
          <label className="block text-base font-medium mt-[12px] mb-[6px]">
            Comment
          </label>
          <Input.TextArea
            className="w-full !h-[100px] px-5 py-3 rounded-md border !resize-none"
            placeholder="Enter comment"
            // value={comment}
            onChange={handleCommentChange}
          />
        </div>
      </Form.Item>
    </Form>
  );
};

export default ScoreCommentForm;
