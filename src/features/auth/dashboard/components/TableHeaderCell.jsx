import React from "react";

export const TableHeaderCell = ({ children, ...props }) => (
  <th
    {...props}
    className="bg-gray-50 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  >
    {children}
  </th>
);
