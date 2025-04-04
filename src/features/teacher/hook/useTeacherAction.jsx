// import { useState } from "react";
// import AccountModal from "../ui/TeacherModal/ActionModal/ActionModal";

// const useTeacherAction = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isEdit, setIsEdit] = useState(false);
//   const [initialData, setInitialData] = useState(null);

//   const openCreateModal = () => {
//     setIsEdit(false);
//     setInitialData(null);
//     setIsModalVisible(true);
//   };

//   const openEditModal = (data) => {
//     setIsEdit(true);
//     setInitialData(data);
//     setIsModalVisible(true);
//   };

//   const closeModal = () => {
//     setIsModalVisible(false);
//   };

//   const ModalComponent = () => (
//     <AccountModal
//       initialData={initialData}
//       visible={isModalVisible}
//       onClose={closeModal}
//     />
//   );

//   return {
//     openCreateModal,
//     openEditModal,
//     closeModal,
//     ModalComponent,
//   };
// };

// export default useTeacherAction;