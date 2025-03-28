import React from "react";

const test = () => {
  return (
    <div className="">
      <div className="bg-white shadow-md rounded-t-sm overflow-hidden">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-100 text-gray-600">
            <tr>
              <th className="w-1/12 py-3 px-4 text-left">
                <input type="checkbox" />
              </th>
              <th className="w-3/12 py-3 px-4 text-left">STUDENT NAME</th>
              <th className="w-3/12 py-3 px-4 text-left">STUDENT ID</th>
              <th className="w-3/12 py-3 px-4 text-left">className NAME</th>
              <th className="w-2/12 py-3 px-4 text-left">ACTION</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr className="border-b">
              <td className="py-3 px-4">
                <input type="checkbox" />
              </td>
              <td className="py-3 px-4">CL0708</td>
              <td className="py-3 px-4">3</td>
              <td className="py-3 px-4">className01</td>
              <td className="py-3 px-4">
                <i className="fas fa-check text-green-500"></i>
                <i className="fas fa-times text-red-500 ml-4"></i>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4">
                <input type="checkbox" />
              </td>
              <td className="py-3 px-4">CL0708</td>
              <td className="py-3 px-4">3</td>
              <td className="py-3 px-4">className01</td>
              <td className="py-3 px-4">
                <i className="fas fa-check text-green-500"></i>
                <i className="fas fa-times text-red-500 ml-4"></i>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4">
                <input type="checkbox" />
              </td>
              <td className="py-3 px-4">CL0708</td>
              <td className="py-3 px-4">3</td>
              <td className="py-3 px-4">className01</td>
              <td className="py-3 px-4">
                <i className="fas fa-check text-green-500"></i>
                <i className="fas fa-times text-red-500 ml-4"></i>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4">
                <input type="checkbox" />
              </td>
              <td className="py-3 px-4">CL0708</td>
              <td className="py-3 px-4">3</td>
              <td className="py-3 px-4">className01</td>
              <td className="py-3 px-4">
                <i className="fas fa-check text-green-500"></i>
                <i className="fas fa-times text-red-500 ml-4"></i>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-4">
                <input type="checkbox" />
              </td>
              <td className="py-3 px-4">CL0708</td>
              <td className="py-3 px-4">3</td>
              <td className="py-3 px-4">className01</td>
              <td className="py-3 px-4">
                <i className="fas fa-check text-green-500"></i>
                <i className="fas fa-times text-red-500 ml-4"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-end items-center p-4 border-t">
        <div className="text-gray-600 mr-4">Showing 1-05 of 50</div>
        <div className="flex items-center">
          <button className="px-2 py-1 border rounded-l-md">←</button>
          <button className="px-2 py-1 border">1</button>
          <button className="px-2 py-1 border">2</button>
          <button className="px-2 py-1 border bg-blue-500 text-white">3</button>
          <button className="px-2 py-1 border">4</button>
          <button className="px-2 py-1 border">5</button>
          <button className="px-2 py-1 border rounded-r-md">→</button>
        </div>
        <div className="ml-4">
          <select className="border rounded-md p-1">
            <option>10 / pages</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default test;
