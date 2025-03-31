import React, { useState } from 'react';
import { Tabs, Table } from 'antd';
import { EditOutlined, AudioOutlined } from '@ant-design/icons';
import "@features/grading/index.css";

const { TabPane } = Tabs;

const AssessmentComponent = () => {
  const [activeTab, setActiveTab] = useState('writing');

  const data = {
    writing: [8, 3, 3, 15],
    speaking: [7, 4, 5, 10],
  };

  const columns = [
    {
      title: 'PART',
      dataIndex: 'part',
      key: 'part',
      width: 150,
      onHeaderCell: () => ({ className: '!bg-[#E6F0FA] !h-[74px] !text-gray-600 !font-semibold !text-center' }),
      onCell: () => ({ className: 'text-gray-700 font-medium' }),
    },
    {
      title: 'PART 1',
      dataIndex: 'part1',
      key: 'part1',
      onHeaderCell: () => ({ className: '!bg-[#E6F0FA] !text-gray-600 !font-semibold !text-center' }),
      onCell: () => ({ className: 'text-center' }),
    },
    {
      title: 'PART 2',
      dataIndex: 'part2',
      key: 'part2',
      onHeaderCell: () => ({ className: '!bg-[#E6F0FA] !text-gray-600 !font-semibold !text-center' }),
      onCell: () => ({ className: 'text-center' }),
    },
    {
      title: 'PART 3',
      dataIndex: 'part3',
      key: 'part3',
      onHeaderCell: () => ({ className: '!bg-[#E6F0FA] !text-gray-600 !font-semibold !text-center' }),
      onCell: () => ({ className: 'text-center' }),
    },
    {
      title: 'PART 4',
      dataIndex: 'part4',
      key: 'part4',
      onHeaderCell: () => ({ className: '!bg-[#E6F0FA] !text-gray-600 !font-semibold !text-center' }),
      onCell: () => ({ className: 'text-center' }),
    },
    {
      title: 'TOTAL',
      dataIndex: 'total',
      key: 'total',
      onHeaderCell: () => ({ className: '!bg-[#E6F0FA] !text-gray-600 !font-semibold !text-center' }),
      onCell: () => ({ className: 'text-center font-semibold' }),
    },
  ];


  const getDataSource = (type) => [{
    key: type,
    part: <div className="flex justify-center items-center bg-[#E6F0FA] w-full h-[74px] px-2 py-1  text-gray-600 text-center font-semibold">
      SCORE
    </div>,
    part1: <span className="text-[#003087] font-medium">{data[type][0]}</span>,
    part2: <span className="text-[#003087] font-medium">{data[type][1]}</span>,
    part3: <span className="text-[#003087] font-medium">{data[type][2]}</span>,
    part4: <span className="text-[#003087] font-medium">{data[type][3]}</span>,
    total: `${data[type].reduce((a, b) => a + b, 0)} | B2`,
  }];

  return (
    <div>

      <div className='relative'>
        <h2 className=" font-bold text-[30px] leading-[38px] text-black mt-[42px]">
          Writing Assessment Parts
        </h2>
        <p className="absolute font-medium text-[18px] leading-[26px] text-[#637381] mt-[11px]">
          Detailed breakdown of each part in the writing assessment.
        </p>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="flex flex-row-reverse"
        >
          <TabPane
            tab={<span style={{ width: 185, height: 63, padding: '18px 40px', gap: 10, borderBottomWidth: 2 }} className={`${activeTab === 'writing' ? 'text-[#003087] bg-[#E6F0FA] border-b-2 border-[#003087]' : 'text-gray-500'}`}> <EditOutlined />Writing</span>}
            key="writing"
          />
          <TabPane
            tab={<span style={{ width: 215, height: 63, padding: '18px 40px', gap: 10, borderBottomWidth: 2 }} className={`${activeTab === 'speaking' ? 'text-[#003087] bg-[#E6F0FA] border-b-2 border-[#003087]' : 'text-gray-500'}`}><AudioOutlined />Speaking</span>}
            key="speaking"
          />
        </Tabs>
      </div>


      <div>

        <Table
          columns={columns}
          dataSource={getDataSource(activeTab)}
          pagination={false}
          bordered={false}
          className="shadow-lg rounded-lg overflow-hidden"
        />
      </div>
    </div>
  );
};

export default AssessmentComponent;