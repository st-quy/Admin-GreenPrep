import React from "react";
import Group from "@assets/icons/class-detail/group.png";

const ClassInfo = ({ data }) => {
  return (
    <div className="w-full flex justify-between items-center pb-6">
      <div>
        <h4 className="text-[26px] font-[600]">Class Information</h4>
        <p className="text-[#637381]">View class details</p>
      </div>
      <div className="flex justify-between items-center gap-4">
        <div className="bg-[#E6F0FA] p-4 border border-[#3758F9] rounded-[10px] flex justify-center items-center gap-4 xl:w-[200px] xl:h-[60px]">
          <img src={Group} width={36} height={31} alt="Group Icon" />
          <h6 className="text-[24px] font-[500] uppercase">{data.className}</h6>
        </div>
        <h6 className="text-[24px] font-500 uppercase bg-[#DAF8E6] p-4 border border-[#F9F9F9] rounded-[10px]">
          {data.status}
        </h6>
      </div>
    </div>
  );
};

export default ClassInfo;
