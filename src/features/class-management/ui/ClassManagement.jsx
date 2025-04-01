import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { SearchOutlined, LeftOutlined, RightOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import axios from 'axios';

const ClassManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const location = useLocation();
  const [classes, setClasses] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Fetch classes
    axios.get('https://dev-api-greenprep.onrender.com/api/classes')
      .then(response => {
        setClasses(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
      });

    // Fetch sessions for a specific class
    axios.get('https://dev-api-greenprep.onrender.com/api/sessions?classId=23ed38cc-814a-42b7-88f5-6b991b7c9a29')
      .then(response => {
        setSessions(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching sessions:', error);
      });
  }, []);

  const totalItems = classes.length;
  const startItem = (currentPage - 1) * itemsPerPage;
  const endItem = Math.min(startItem + itemsPerPage, totalItems);
  const currentClasses = classes.slice(startItem, endItem);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCreateClass = () => {
    // Implement create class functionality
  };

  const handleEdit = (id) => {
    // Implement edit functionality
  };

  const handleDelete = (id) => {
    // Implement delete functionality
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value.split(' ')[0]));
    setCurrentPage(1);
  };

  return (
    <div className="w-full p-4 md:p-6">
      {/* Main Content */}
      <div className="w-full rounded-[4px] p-2 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
          <div className="w-full md:w-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">
              Class Management
            </h1>
            <p className="text-sm text-[#637381] mb-4 md:mb-0">
              Manage and organize both classes and individual sessions.
            </p>
          </div>
          <Button 
            onClick={handleCreateClass}
            className="bg-[#003087] !text-[#FFFFFF] w-full sm:w-auto px-6 py-3 rounded-[50px] 
            border-none flex items-center justify-center gap-[10px]
            hover:!bg-[#003087] hover:!text-[#FFFFFF] active:!bg-[#003087] focus:!bg-[#003087] focus:!text-[#FFFFFF]"
          >
            Create new class
          </Button>
        </div>

        {/* Search */}
        <div className="mb-4 md:mb-6">
          <div className="relative w-full md:w-[250px] shadow-[0px_4px_4px_0px_#0000001A]">
            <input
              type="text"
              placeholder="Search by class name"
              className="w-full h-10 md:h-12 rounded-[6px] border border-[#DFE4EA] bg-white px-4 pr-10 
              focus:outline-none focus:ring-1 focus:ring-[#0B3B6A] text-base
              placeholder:text-[#9CA3AF]"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="absolute right-[16px] top-1/2 transform -translate-y-1/2">
              <SearchOutlined style={{ color: '#6B7280', fontSize: '16px' }} />
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="w-full overflow-x-auto">
          <div className="w-full bg-white rounded-t-[10px] shadow-[0px_4px_4px_0px_#0000001A]">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-[#E6F0FA] rounded-t-[10px]">
                  <th className="py-3 md:py-4 px-2 md:px-4 text-left md:text-center font-medium text-sm md:text-base text-black uppercase first:rounded-tl-[10px]">
                    Class Name
                  </th>
                  <th className="py-3 md:py-4 px-2 md:px-4 text-center font-medium text-sm md:text-base text-black uppercase">
                    Number of Sessions
                  </th>
                  <th className="py-3 md:py-4 px-2 md:px-4 text-center font-medium text-sm md:text-base text-black uppercase last:rounded-tr-[10px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentClasses.length > 0 ? (
                  currentClasses.map((classItem, index) => (
                    <React.Fragment key={classItem.ID || index}>
                      <tr>
                        <td className="py-3 md:py-4 px-2 md:px-4 whitespace-nowrap">
                          <div className="text-sm md:text-base text-[#0B3B6A] font-medium 
                          underline decoration-solid hover:cursor-pointer">
                            {classItem.className}
                          </div>
                        </td>
                        <td className="py-3 md:py-4 px-2 md:px-4 whitespace-nowrap text-center">
                          <div className="text-sm md:text-base font-medium text-[#637381]">
                            {sessions.filter(session => session.ClassID === classItem.ID).length}
                          </div>
                        </td>
                        <td className="py-3 md:py-4 px-2 md:px-4 whitespace-nowrap">
                          <div className="flex justify-center space-x-4">
                            <button
                              onClick={() => handleEdit(classItem.ID)}
                              className="p-0 border-0 bg-transparent focus:outline-none"
                              aria-label="Edit class"
                            >
                              <svg
                                width="20" height="20" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M22.9501 4.8748C21.7501 3.5998 20.4751 2.3248 19.2001 1.0873C18.9376 0.824805 18.6376 0.674805 18.3001 0.674805C17.9626 0.674805 17.6251 0.787305 17.4001 1.0498L3.26261 15.0748C3.03761 15.2998 2.88761 15.5623 2.77511 15.8248L0.712614 22.1248C0.600114 22.4248 0.675114 22.7248 0.825114 22.9498C1.01261 23.1748 1.27511 23.3248 1.61261 23.3248H1.76261L8.17511 21.1873C8.47511 21.0748 8.73761 20.9248 8.92511 20.6998L22.9876 6.6748C23.2126 6.4498 23.3626 6.1123 23.3626 5.77481C23.3626 5.4373 23.2126 5.1373 22.9501 4.8748ZM7.72511 19.5373C7.68761 19.5748 7.65011 19.5748 7.61261 19.6123L2.77511 21.2248L4.38761 16.3873C4.38761 16.3498 4.42511 16.3123 4.46261 16.2748L14.7751 5.9998L18.0376 9.26231L7.72511 19.5373ZM19.2001 8.06231L15.9376 4.79981L18.2251 2.5123C19.3126 3.5623 20.4001 4.6873 21.4501 5.77481L19.2001 8.06231Z"
                                  fill="#003087"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(classItem.ID)}
                              className="p-0 bg-transparent border-0 hover:opacity-80"
                              aria-label="Delete class"
                            >
                              <svg
                                width="16" height="18" viewBox="0 0 19 22" fill="none" 
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-6 text-center text-gray-500">
                      No classes found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="w-full mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 py-2">
            <div className="text-sm md:text-base text-[#202224] opacity-60 order-2 md:order-1">
              Showing {startItem + 1}-{endItem} of {totalItems}
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2 order-1 md:order-2">
              <button 
                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center text-[#637381] disabled:opacity-50"
                aria-label="Previous page"
              >
                <LeftOutlined style={{ fontSize: '14px' }} />
              </button>
              
              <div className="flex flex-wrap items-center">
                {Array.from({ length: Math.min(Math.ceil(totalItems / itemsPerPage), 5) }).map((_, idx) => {
                  let pageNumber;
                  const totalPages = Math.ceil(totalItems / itemsPerPage);
                  
                  if (totalPages <= 5) {
                    pageNumber = idx + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = idx + 1;
                    if (idx === 4) pageNumber = totalPages;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + idx;
                    if (idx === 0) pageNumber = 1;
                  } else {
                    pageNumber = currentPage - 2 + idx;
                    if (idx === 0) pageNumber = 1;
                    if (idx === 4) pageNumber = totalPages;
                  }
                  
                  // Show ellipsis instead of buttons
                  if ((idx === 1 && pageNumber !== 2 && totalPages > 5) || 
                      (idx === 3 && pageNumber !== totalPages - 1 && totalPages > 5)) {
                    return (
                      <span key={`ellipsis-${idx}`} className="w-8 h-8 flex items-center justify-center">
                        &hellip;
                      </span>
                    );
                  }
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-8 h-8 flex items-center justify-center text-sm ${
                        currentPage === pageNumber 
                        ? 'text-[#1677FF] border border-[#1677FF] rounded-[8px]' 
                        : 'text-[#637381]'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>
              
              <button 
                onClick={() => currentPage < Math.ceil(totalItems / itemsPerPage) && setCurrentPage(currentPage + 1)}
                disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)}
                className="w-8 h-8 flex items-center justify-center text-[#637381] disabled:opacity-50"
                aria-label="Next page"
              >
                <RightOutlined style={{ fontSize: '14px' }} />
              </button>
              
              <select 
                className="ml-2 md:ml-4 w-28 h-8 border border-[#DFE4EA] rounded-[8px] text-sm text-gray-600 bg-white px-2"
                onChange={handleItemsPerPageChange}
                value={`${itemsPerPage} / pages`}
              >
                <option>10 / pages</option>
                <option>20 / pages</option>
                <option>50 / pages</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassManagement;