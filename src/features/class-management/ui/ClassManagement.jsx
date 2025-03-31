import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const ClassManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const location = useLocation();

  // Mock data - replace with actual Redux state later
  const classes = [
    { id: 1, name: 'CL0708', sessions: 3 },
    { id: 2, name: 'CL0708', sessions: 3 },
    { id: 3, name: 'CL0708', sessions: 3 },
    { id: 4, name: 'CL0708', sessions: 3 },
  ];

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

  return (
    <div className="p-6">
      

      {/* Main Content */}
      <div className="rounded-[4px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="w-[16.4%] min-w-[283px] h-[3.4vh] min-h-[38px] text-black relative font-['Inter'] font-bold text-[30px] leading-[38px] tracking-[0px]" style={{ marginLeft: '8.1%' }}>
            Class Management
          </h1>
          <button
            onClick={handleCreateClass}
            className="bg-[#003087] text-[#FFFFFF] w-[10.9%] min-w-[188px] h-[4.5vh] min-h-[50px] rounded-[50px] 
            pt-[13px] pr-[28px] pb-[13px] pl-[28px] border-none hover:bg-[#0c4477] transition-colors flex items-center justify-center gap-[10px]"
            style={{ marginLeft: 'auto', marginRight: '9.4%' }}
          >
            Create new class
          </button>
        </div>
        <p className="w-[29.5%] min-w-[509px] h-[2.3vh] min-h-[26px] text-[#637381] relative" style={{ marginLeft: '8.1%' }}>
          Manage and organize both classes and individual sessions.
        </p>
        {/* Search */}
        <div className="mb-6">
          <div className="relative w-[14.5%] min-w-[250px] shadow-[0px_4px_4px_0px_#0000001A]" style={{ marginLeft: '7.3%' }}>
            <input
              type="text"
              placeholder="Search by class name"
              className="w-full h-[4.3vh] min-h-[48px] rounded-[6px] border border-[#DFE4EA] bg-white pt-[12px] pr-[40px] pb-[12px] pl-[20px] 
              focus:outline-none focus:ring-1 focus:ring-[#0B3B6A] font-['Inter'] text-[16px] leading-[24px] tracking-[0px] 
              placeholder:text-[#9CA3AF] placeholder:font-['Inter'] placeholder:font-normal placeholder:text-[16px] 
              placeholder:leading-[24px] placeholder:w-[165px] placeholder:h-[24px]"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="absolute right-[16px] top-1/2 transform -translate-y-1/2 flex items-center justify-center w-[16px] h-[16px] gap-[5px]">
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_4338_181)">
                  <path d="M15.0348 14.3133L15.0348 14.3133L15.0377 14.3156C15.0472 14.3232 15.0514 14.3295 15.0536 14.3336C15.0559 14.338 15.0576 14.3432 15.0582 14.3498C15.0592 14.3623 15.0564 14.3856 15.0346 14.4128C15.0307 14.4177 15.0276 14.4197 15.0249 14.421C15.0225 14.4222 15.0152 14.4252 15 14.4252C15.0038 14.4252 14.9998 14.4258 14.9885 14.4216C14.9786 14.418 14.9668 14.412 14.955 14.4038L10.7894 11.0364L10.4556 10.7665L10.1383 11.0556C9.10157 12.0002 7.79541 12.5252 6.40002 12.5252C4.93302 12.5252 3.56009 11.9531 2.52858 10.9216C0.39884 8.7919 0.39884 5.30849 2.52858 3.17875C3.56009 2.14724 4.93302 1.5752 6.40002 1.5752C7.86703 1.5752 9.23996 2.14724 10.2715 3.17875L10.2715 3.17875L10.2736 3.18083C12.2161 5.10054 12.3805 8.14775 10.8214 10.2801L10.5409 10.6637L10.9098 10.9633L15.0348 14.3133ZM2.62147 10.8287C3.63937 11.8466 4.96619 12.4002 6.40002 12.4002C7.82817 12.4002 9.18252 11.8505 10.1798 10.8275C12.2759 8.75511 12.2713 5.3644 10.1786 3.27164C9.16068 2.25375 7.83386 1.7002 6.40002 1.7002C4.96674 1.7002 3.6404 2.25332 2.62266 3.27045C0.524124 5.34263 0.527898 8.73518 2.62147 10.8287Z" fill="#6B7280" stroke="#6B7280"/>
                </g>
                <defs>
                  <clipPath id="clip0_4338_181">
                    <rect width="16" height="16" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="flex justify-center">
          <div className="w-[85%] h-[44vh] bg-white rounded-t-[10px] shadow-[0px_4px_4px_0px_#0000001A] mx-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-[#E6F0FA] rounded-t-[10px]">
                  <th className="w-1/3 py-4 text-center font-['Inter'] font-medium text-[16px] leading-[24px] tracking-[0px] text-black uppercase first:rounded-tl-[10px]">
                    CLASS NAME
                  </th>
                  <th className="w-1/3 py-4 text-center font-['Inter'] font-medium text-[16px] leading-[24px] tracking-[0px] text-black uppercase">
                    NUMBER OF SESSIONS
                  </th>
                  <th className="w-1/3 py-4 text-center font-['Inter'] font-medium text-[16px] leading-[24px] tracking-[0px] text-black uppercase last:rounded-tr-[10px]">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {classes.map((classItem, index) => (
                  <React.Fragment key={classItem.id}>
                    <tr>
                      <td className="py-[15px] whitespace-nowrap text-center">
                        <div className="text-[14px] text-[#0B3B6A] font-['Inter'] font-medium leading-[22px] tracking-[0px] 
                        underline decoration-solid decoration-[0%] decoration-auto hover:cursor-pointer">
                          {classItem.name}
                        </div>
                      </td>
                      <td className="py-[15px] whitespace-nowrap text-center">
                        <div className="text-[14px] font-['Inter'] font-medium leading-[22px] tracking-[0px] text-[#637381]">
                          {classItem.sessions}
                        </div>
                      </td>
                      <td className="py-[15px] whitespace-nowrap">
                        <div className="flex justify-center space-x-4">
                          <button
                            onClick={() => handleEdit(classItem.id)}
                            className="hover:opacity-80 p-0 bg-transparent border-0"
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_3628_2380)">
                                <path d="M22.9501 4.8748C21.7501 3.5998 20.4751 2.3248 19.2001 1.0873C18.9376 0.824805 18.6376 0.674805 18.3001 0.674805C17.9626 0.674805 17.6251 0.787305 17.4001 1.0498L3.26261 15.0748C3.03761 15.2998 2.88761 15.5623 2.77511 15.8248L0.712614 22.1248C0.600114 22.4248 0.675114 22.7248 0.825114 22.9498C1.01261 23.1748 1.27511 23.3248 1.61261 23.3248H1.76261L8.17511 21.1873C8.47511 21.0748 8.73761 20.9248 8.92511 20.6998L22.9876 6.6748C23.2126 6.4498 23.3626 6.1123 23.3626 5.77481C23.3626 5.4373 23.2126 5.1373 22.9501 4.8748ZM7.72511 19.5373C7.68761 19.5748 7.65011 19.5748 7.61261 19.6123L2.77511 21.2248L4.38761 16.3873C4.38761 16.3498 4.42511 16.3123 4.46261 16.2748L14.7751 5.9998L18.0376 9.26231L7.72511 19.5373ZM19.2001 8.06231L15.9376 4.79981L18.2251 2.5123C19.3126 3.5623 20.4001 4.6873 21.4501 5.77481L19.2001 8.06231Z" fill="#003087"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_3628_2380">
                                  <rect width="24" height="24" fill="white"/>
                                </clipPath>
                              </defs>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(classItem.id)}
                            className="hover:opacity-80 p-0 bg-transparent border-0"
                          >
                            <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.9904 7.75L11.6442 16.75M6.85577 16.75L6.50962 7.75M16.4776 4.54057C16.8196 4.59222 17.1604 4.64747 17.5 4.70629M16.4776 4.54057L15.4098 18.4226C15.3196 19.5948 14.3421 20.5 13.1664 20.5H5.33357C4.15786 20.5 3.18037 19.5948 3.0902 18.4226L2.02235 4.54057M16.4776 4.54057C15.3312 4.36744 14.1715 4.23485 13 4.14432M1 4.70629C1.33957 4.64747 1.68037 4.59222 2.02235 4.54057M2.02235 4.54057C3.16878 4.36744 4.32849 4.23485 5.5 4.14432M13 4.14432V3.22819C13 2.04882 12.0893 1.06423 10.9106 1.02652C10.3592 1.00889 9.80565 1 9.25 1C8.69435 1 8.14078 1.00889 7.58942 1.02652C6.41065 1.06423 5.5 2.04882 5.5 3.22819V4.14432M13 4.14432C11.7626 4.0487 10.512 4 9.25 4C7.98803 4 6.73744 4.0487 5.5 4.14432" 
                              stroke="#E10E0E" 
                              strokeWidth="1.5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                    {index < classes.length - 1 && (
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
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <div className="w-[85%] mx-auto">
            <div className="flex justify-end items-center gap-[32px] py-3 mt-4">
              <div className="font-['Inter'] font-medium text-[16px] leading-[24px] tracking-[0px] text-[#202224] opacity-60">
                Showing 1-05 of 50
              </div>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                  className="appearance-none focus:outline-none border-none bg-transparent w-[36px] h-[36px] flex items-center justify-center text-[#637381]"
                >
                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 13.5L5 8.5L10 3.5" stroke="#637381" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {[1, 2, 3, 4, 5].map((number) => (
                  <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={`appearance-none focus:outline-none outline-none bg-transparent w-[36px] h-[36px] flex items-center justify-center font-['Inter'] font-normal text-[16px] leading-[15px] tracking-[0px] ${
                      currentPage === number 
                      ? 'text-[#1677FF] !border outline-none !border-[#1677FF] rounded-[8px] px-[10px] py-[8px]' 
                      : 'text-[#637381] border-none'
                    }`}
                  >
                    {number}
                  </button>
                ))}
                <button 
                  onClick={() => currentPage < 5 && setCurrentPage(currentPage + 1)}
                  className="appearance-none focus:outline-none border-none bg-transparent w-[36px] h-[36px] flex items-center justify-center text-[#637381]"
                >
                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 13.5L11 8.5L6 3.5" stroke="#637381" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <select className="w-[124px] h-[36px] mt-[7px] ml-[393px] border border-[#DFE4EA] rounded-[8px] text-sm text-gray-600 bg-white px-3">
                  <option>10 / pages</option>
                  <option>20 / pages</option>
                  <option>50 / pages</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassManagement; 