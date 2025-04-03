import { Card, Button, Row, Col, Typography } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const StudentInfoCard = ({
  student,
  onPrevious = () => {},
  onNext = () => {},
  onViewList = () => {},
}) => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <Title level={2} className="!mb-3 !font-bold">
          Student information: {student.name}
        </Title>
        <div className="text-[18px] text-[#637381]">View student details.</div>
      </div>

      <Row>
        <Col flex={8}>
          {/* Main Card */}
          <Card className="shadow-sm rounded-lg border border-gray-100 py-5 px-8">
            <Row gutter={[48, 16]}>
              {/* Left Column */}
              <Col xs={24} sm={12}>
                <div className="grid grid-cols-[120px_1fr] gap-y-6 gap-x-6 text-base text-[#374151]">
                  <div>Student name</div>
                  <div className="font-bold">{student.name}</div>

                  <div>Student ID</div>
                  <div className="font-bold">{student.studentId}</div>

                  <div>Class ID</div>
                  <div className="font-bold">{student.classId}</div>
                </div>
              </Col>

              {/* Right Column */}
              <Col xs={24} sm={12}>
                <div className="grid grid-cols-[120px_1fr] gap-y-6 gap-x-6 text-base text-[#374151]">
                  <div>Email</div>
                  <div className="font-bold">{student.email}</div>

                  <div>Phone</div>
                  <div className="font-bold">{student.phone}</div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col
          flex={1}
          className="flex md:flex-col mt-4 md:mt-0 items-center justify-between"
        >
          <Button
            icon={<UnorderedListOutlined />}
            shape="round"
            size="large"
            className="flex items-center border-[#003087] text-[#003087] w-[200px] h-[50px]"
            onClick={onViewList}
          >
            Student List
          </Button>

          <Button
            icon={<LeftOutlined />}
            shape="round"
            size="large"
            className="flex items-center border-[#003087] text-[#003087] w-[200px] h-[50px]"
            onClick={onPrevious}
          >
            Previous Student
          </Button>

          <Button
            type="primary"
            shape="round"
            size="large"
            icon={<RightOutlined />}
            className="flex items-center bg-[#003087] hover:!bg-blue-800 border-[#003087] w-[200px] h-[50px]"
            onClick={onNext}
          >
            Next Student
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default StudentInfoCard;
