import React, { useState, useEffect } from "react";
import CreateClass from "../../features/auth/classManagement/createClass";
import UpdateClass from "../../features/auth/classManagement/updateClass";
import ConfirmationDialog from "../../features/auth/classManagement/components/ConfirmationDialog";
import useConfirmDelete from "../../features/auth/classManagement/hooks/useConfirmDelete";
import SearchBar from "../../shared/components/SearchBar";
import {
  fetchClasses,
  deleteClass,
  fetchSessionsByClassId,
} from "../../features/auth/classManagement/services/classAPI";

const ClassManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [classes, setClasses] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isDeleteDialogOpen,
    selectedId,
    openDeleteDialog,
    closeDeleteDialog,
  } = useConfirmDelete();

  // Fetch classes from API
  useEffect(() => {
    const loadClasses = async () => {
      setIsLoading(true);
      try {
        const fetchedClasses = await fetchClasses();
        const classesWithSessions = await Promise.all(
          fetchedClasses.map(async (cls) => {
            const sessions = await fetchSessionsByClassId(cls.id);
            return { ...cls, sessions: sessions.length };
          })
        );
        setClasses(classesWithSessions);
      } catch (err) {
        console.error("Failed to load classes:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadClasses();
  }, []);

  // Handle search
  const handleSearch = (value) => {
    setSearchTerm(value);
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // Handle search submission
  const handleSearchSubmit = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  // Handle search clear
  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleAddClass = (newClass) => {
    setClasses((prevClasses) => [...prevClasses, newClass]);
  };

  const handleUpdateClass = (updatedClass) => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) =>
        cls.id === updatedClass.id ? { ...cls, ...updatedClass } : cls
      )
    );
  };

  const handleDelete = (id) => {
    openDeleteDialog(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteClass(selectedId);
      setClasses(classes.filter((cls) => cls.id !== selectedId));
      closeDeleteDialog();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  };

  // Tính toán số lượng class sau khi filter
  const filteredClasses = classes.filter((cls) =>
    cls.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Tính toán class hiển thị cho trang hiện tại
  const indexOfLastClass = currentPage * itemsPerPage;
  const indexOfFirstClass = indexOfLastClass - itemsPerPage;
  const currentClasses = filteredClasses.slice(
    indexOfFirstClass,
    indexOfLastClass
  );

  // Tính toán tổng số trang
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);

  // Tạo mảng các số trang để hiển thị
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
    0,
    5
  );

  return (
    <div className="p-3 md:p-6">
      {/* Main Content */}
      <div className="rounded-[4px] p-3 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1
            className="w-full md:w-auto text-black font-['Inter'] font-bold text-[24px] md:text-[30px] leading-[38px] tracking-[0px] mb-4 md:mb-0"
            style={{ marginLeft: "0", textAlign: "left" }}
          >
            Class Management
          </h1>
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <CreateClass
              onAddClass={handleAddClass}
              existingClasses={classes}
            />
          </div>
        </div>
        <p className="w-full md:w-[80%] lg:w-[60%] text-[#637381] relative text-left mb-6">
          Manage and organize both classes and individual sessions.
        </p>
        {/* Search */}
        <div className="mb-6 flex justify-center md:justify-start">
          <SearchBar
            placeholder="Search by class name"
            value={searchTerm}
            onChange={handleSearch}
            onSubmit={handleSearchSubmit}
            onClear={handleClearSearch}
            buttonText="Search"
            className="w-full md:w-auto"
          />
        </div>

        {/* Table Container */}
        <div className="flex justify-start md:justify-start overflow-x-auto">
          <div className="w-full bg-white rounded-t-[10px] shadow-[0px_4px_4px_0px_#0000001A]">
            {isLoading ? (
              <div className="flex justify-center items-center h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0B3B6A]"></div>
              </div>
            ) : currentClasses.length > 0 ? (
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-[#E6F0FA] rounded-t-[10px]">
                    <th className="w-1/3 py-4 pl-6 text-left font-['Inter'] font-medium text-[14px] md:text-[16px] leading-[24px] tracking-[0px] text-black uppercase first:rounded-tl-[10px]">
                      CLASS NAME
                    </th>
                    <th className="w-1/3 py-4 text-center font-['Inter'] font-medium text-[14px] md:text-[16px] leading-[24px] tracking-[0px] text-black uppercase">
                      NUMBER OF SESSIONS
                    </th>
                    <th className="w-1/3 py-4 text-center font-['Inter'] font-medium text-[14px] md:text-[16px] leading-[24px] tracking-[0px] text-black uppercase last:rounded-tr-[10px]">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentClasses.map((classItem, index) => (
                    <React.Fragment key={classItem.id}>
                      <tr>
                        <td className="py-[15px] px-6 whitespace-nowrap text-left">
                          <div
                            className="text-[14px] text-[#0B3B6A] font-['Inter'] font-medium leading-[22px] tracking-[0px] 
                          underline decoration-solid decoration-[0%] decoration-auto hover:cursor-pointer"
                          >
                            {classItem.name}
                          </div>
                        </td>
                        <td className="py-[15px] px-2 whitespace-nowrap text-center">
                          <div className="text-[14px] font-['Inter'] font-medium leading-[22px] tracking-[0px] text-[#637381]">
                            {classItem.sessions}
                          </div>
                        </td>
                        <td className="py-[15px] px-2 whitespace-nowrap">
                          <div className="flex justify-center space-x-4">
                            <UpdateClass
                              classData={classItem}
                              onUpdateClass={handleUpdateClass}
                              existingClasses={classes}
                            />
                            <button
                              onClick={() => handleDelete(classItem.id)}
                              className="cursor-pointer hover:opacity-80 p-0 bg-transparent border-0"
                            >
                              <svg
                                width="19"
                                height="22"
                                viewBox="0 0 19 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.9904 7.75L11.6442 16.75M6.85577 16.75L6.50962 7.75M16.4776 4.54057C16.8196 4.59222 17.1604 4.64747 17.5 4.70629M16.4776 4.54057L15.4098 18.4226C15.3196 19.5948 14.3421 20.5 13.1664 20.5H5.33357C4.15786 20.5 3.18037 19.5948 3.0902 18.4226L2.02235 4.54057M16.4776 4.54057C15.3312 4.36744 14.1715 4.23485 13 4.14432M1 4.70629C1.33957 4.64747 1.68037 4.59222 2.02235 4.54057M2.02235 4.54057C3.16878 4.36744 4.32849 4.23485 5.5 4.14432M13 4.14432V3.22819C13 2.04882 12.0893 1.06423 10.9106 1.02652C10.3592 1.00889 9.80565 1 9.25 1C8.69435 1 8.14078 1.00889 7.58942 1.02652C6.41065 1.06423 5.5 2.04882 5.5 3.22819V4.14432M13 4.14432C11.7626 4.0487 10.512 4 9.25 4C7.98803 4 6.73744 4.0487 5.5 4.14432"
                                  stroke="#E10E0E"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                      {index < currentClasses.length - 1 && (
                        <tr>
                          <td colSpan={3} className="p-0">
                            <div className="w-full h-[1px] bg-[#EEEEEE]"></div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#637381"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
                <p className="mt-4 text-[#637381] font-['Inter']">
                  {searchQuery
                    ? `No classes found matching "${searchQuery}"`
                    : "No classes available"}
                </p>
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="mt-2 text-[#0B3B6A] hover:underline font-['Inter']"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {currentClasses.length > 0 && (
          <div className="flex justify-start mt-4">
            <div className="w-full mx-auto">
              <div className="flex flex-col md:flex-row justify-end items-center gap-4 md:gap-[32px] py-3">
                <div className="font-['Inter'] font-medium text-[14px] md:text-[16px] leading-[24px] tracking-[0px] text-[#202224] opacity-60 text-center md:text-left">
                  Showing {indexOfFirstClass + 1}-
                  {Math.min(indexOfLastClass, filteredClasses.length)} of{" "}
                  {filteredClasses.length}
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() =>
                      currentPage > 1 && setCurrentPage(currentPage - 1)
                    }
                    className="appearance-none focus:outline-none border-none bg-transparent w-[36px] h-[36px] flex items-center justify-center text-[#637381]"
                    disabled={currentPage === 1}
                  >
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 13.5L5 8.5L10 3.5"
                        stroke="#637381"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {pageNumbers.map((number) => (
                    <button
                      key={number}
                      onClick={() => setCurrentPage(number)}
                      className={`appearance-none focus:outline-none outline-none bg-transparent w-[36px] h-[36px] flex items-center justify-center font-['Inter'] font-normal text-[16px] leading-[15px] tracking-[0px] ${
                        currentPage === number
                          ? "text-[#1677FF] !border outline-none !border-[#1677FF] rounded-[8px] px-[10px] py-[8px]"
                          : "text-[#637381] border-none"
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    onClick={() =>
                      currentPage < totalPages &&
                      setCurrentPage(currentPage + 1)
                    }
                    className="appearance-none focus:outline-none border-none bg-transparent w-[36px] h-[36px] flex items-center justify-center text-[#637381]"
                    disabled={currentPage === totalPages}
                  >
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 13.5L11 8.5L6 3.5"
                        stroke="#637381"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                <select
                  className="w-[120px] h-[36px] mt-2 md:mt-0 border border-[#DFE4EA] rounded-[8px] text-sm text-gray-600 bg-white px-3"
                  value={itemsPerPage}
                  disabled
                >
                  <option value={5}>5 / pages</option>
                  <option value={10}>10 / pages</option>
                  <option value={20}>20 / pages</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default ClassManagement;
