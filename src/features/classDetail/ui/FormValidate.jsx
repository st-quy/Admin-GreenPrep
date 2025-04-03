import React from "react";
import { Form, Input, Button, Space, Select, DatePicker } from "antd";
import GenerateIcon from "@assets/icons/class-detail/generate.png";

import * as yup from "yup";

let sessionSchema = yup.object().shape({
  sessionName: yup.string().required("Session name is required"),
  sessionKey: yup.string().required("Session key is required"),
  examSet: yup.mixed().required("Exam set is required"),
  dateRange: yup.array().of(yup.date()).required("Date range is required"),
});

const { RangePicker } = DatePicker;

const yupSync = {
  async validator({ field }, value) {
    await sessionSchema.validateSyncAt(field, { [field]: value });
  },
};

const FormValidate = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} className="mb-14" layout="vertical">
      <div className="mb-2 flex w-full flex-col">
        <Form.Item
          rules={[
            // @ts-ignore
            yupSync,
          ]}
          name="sessionName"
          label="Session Name"
        >
          <label
            className="mb-2 font-[500] lg:text-[16px] md:text-[14px]"
            htmlFor=""
          >
            Session Name
          </label>

          <Input
            className="!h-[46px] py-[12px] pr-[16px] ps-[20px]"
            placeholder="Session Name"
          />
        </Form.Item>
      </div>
      <div className="mb-2">
        <label
          className="mb-2 font-[500] lg:text-[16px] md:text-[14px]"
          htmlFor=""
        >
          Session Key
        </label>
        <Form.Item
          rules={[
            // @ts-ignore
            yupSync,
          ]}
          name="sessionKey"
        >
          <Space.Compact>
            <Input
              disabled={true}
              placeholder="Session Key"
              className="!h-[46px] py-[12px] pr-[16px] ps-[20px]"
            />
            <Button className="!h-[46px]">
              <img src={GenerateIcon} alt="Generate Icon" />
            </Button>
          </Space.Compact>
        </Form.Item>
      </div>
      <div className="mb-2 flex w-full flex-col">
        <label
          className="mb-2 font-[500] lg:text-[16px] md:text-[14px]"
          htmlFor=""
        ></label>
        <Form.Item
          rules={[
            // @ts-ignore
            yupSync,
          ]}
          name="examSet"
        >
          <Select className="!h-[46px] !w-full" options={[]} />
        </Form.Item>
      </div>
      <div className="mb-2 flex w-full flex-col">
        <label
          className="mb-2 font-[500] lg:text-[16px] md:text-[14px]"
          htmlFor=""
        >
          Start
        </label>
        <Form.Item
          rules={[
            // @ts-ignore
            yupSync,
          ]}
          name="dateRange"
        >
          <RangePicker
            className="!h-[46px] py-[12px] pr-[16px] ps-[20px]"
            showTime
          />
        </Form.Item>
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormValidate;
