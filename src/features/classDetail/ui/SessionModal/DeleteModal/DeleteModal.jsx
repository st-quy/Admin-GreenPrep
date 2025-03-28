import React, { useState } from "react";
import { Button, Modal } from "antd";
import DeleteIcon from "@assets/icons/class-detail/delete.png";
import Warning from "@assets/icons/class-detail/warning.png";

const DeleteModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  return (
    <>
      <Button className="!hover:border-none" onClick={showModal}>
        <img src={DeleteIcon} alt="Delete" width={20} height={20} />
      </Button>
      <Modal
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText={"Delete"}
        okButtonProps={{
          className: "!bg-[#F23030] !text-white !rounded-[50px]",
        }}
        cancelButtonProps={{
          className: "!bg-white !text-[#003087] !rounded-[50px]",
        }}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <div className="p-6">
          <div className="pb-6 flex items-center gap-4">
            <div className="bg-[#FEEBEB] w-fit p-4 rounded-full flex justify-center items-center">
              <img src={Warning} alt="Warning Icon" width={20} height={20} />
            </div>
            <h6 className="text-[24px]">
              Are you sure to delete this session?
            </h6>
          </div>
          <p className="text-[#637381] text-[16px] pb-6">
            Once you delete this session, all associated data will be
            permanently removed and cannot be recovered. Please confirm if you
            want to proceed with this action.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
