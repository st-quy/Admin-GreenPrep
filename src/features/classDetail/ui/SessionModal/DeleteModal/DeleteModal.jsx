import React, { useState } from "react";
import { Button, message, Modal } from "antd";
import DeleteIcon from "@assets/icons/class-detail/delete.png";
import Warning from "@assets/icons/class-detail/warning.png";
import { useDeleteSessionMutation } from "@features/classDetail/hooks/useClassDetail";

const DeleteModal = ({ sessionID }) => {
  const deleteSession = useDeleteSessionMutation();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      await deleteSession.mutateAsync(sessionID);
      message.success("Session deleted successfully!");
      setOpen(false);
    } catch (error) {
      message.error("Failed to delete the session. Please try again.");
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button className="!hover:border-none" onClick={showModal}>
        <img src={DeleteIcon} alt="Delete" width={20} height={20} />
      </Button>
      <Modal
        open={open}
        closable={false}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText={"Delete"}
        footer={(_) => (
          <div className="flex justify-end gap-4 py-4">
            <Button
              onClick={handleCancel}
              className="h-[50px] w-[106px] rounded-[50px] shadow-[0px_1px_3px_rgba(166,175,195,0.4)] text-[#003087] lg:text-[16px] md:text-[14px]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleOk}
              className="h-[50px] w-[106px] rounded-[50px] bg-[#F23030] text-white lg:text-[16px] md:text-[14px]"
            >
              Delete
            </Button>
          </div>
        )}
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
            <h6 className="lg:text-[24px] md:text-[22px]">
              Are you sure to delete this session?
            </h6>
          </div>
          <p className="text-[#637381] lg:text-[18px] md:text-[16px] pb-6">
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
