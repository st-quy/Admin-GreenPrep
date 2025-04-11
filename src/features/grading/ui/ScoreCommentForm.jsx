import React, { useEffect, useState } from "react";
import { Input, Form, InputNumber } from "antd";
import { yupSync } from "@shared/lib/utils";
import * as yup from "yup";
import "./index.scss";

const ScoreCommentForm = ({
  data,
}) => {
  const [comment, setComment] = useState(data?.studentAnswer?.Comment || "");
  const [form] = Form.useForm();

  const schema = yup.object().shape({
    comment: yup.string().trim().nullable().optional(),
  });


  const handleCommentChange = (e) => {
    const value = e.target.value;
    setComment(value);
  };

  return (
    <Form
      form={form}
      className="w-full h-fit rounded-lg shadow px-[22px] py-[16px] bg-white"
      initialValues={{ comment: comment }}
    >
      <Form.Item
        name="comment"
        // @ts-ignore
        rules={[yupSync(schema)]}
        noStyle={true}
      >
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
