import { useEffect, useState } from "react";
import { Input, Form } from "antd";
import { yupSync } from "@shared/lib/utils";
import * as yup from "yup";
import "./index.scss";

const CommentForm = ({
  data,
  onCommentChange,
  isSpeaking,
  activeTab,
  existingComment,
}) => {
  const [comment, setComment] = useState(
    existingComment || data?.studentAnswer?.Comment || ""
  );
  const [form] = Form.useForm();

  const schema = yup.object().shape({
    comment: yup.string().trim().nullable().optional(),
  });

  // Reset form when skill or data changes
  useEffect(() => {
    const initialComment =
      existingComment || data?.studentAnswer?.Comment || "";
    setComment(initialComment);
    form.setFieldsValue({ comment: initialComment });
  }, [data, existingComment, form, isSpeaking]);

  const handleCommentChange = (e) => {
    const value = e.target.value;
    setComment(value);

    // Pass the comment up to the parent component with the studentAnswerId and part
    if (onCommentChange) {
      onCommentChange({
        studentAnswerId: data?.studentAnswer?.ID,
        messageContent: value,
        isSpeaking,
        part: activeTab,
      });
    }
  };

  return (
    <Form
      form={form}
      className="w-full h-fit rounded-lg shadow p-4 bg-white"
      initialValues={{ comment: comment }}
    >
      <Form.Item name="comment" rules={[yupSync(schema)]} noStyle={true}>
        <div>
          <label className="block text-base font-medium mb-[6px]">
            Comment
          </label>
          <Input.TextArea
            className="w-full !min-h-[100px] px-5 py-3 rounded-md border"
            placeholder="Enter comment"
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
