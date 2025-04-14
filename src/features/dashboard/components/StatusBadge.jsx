import React from "react";

export const StatusBadge = ({ count }) => {
  let color = count > 5 ? "#10B981" : count > 0 ? "#6366F1" : "#9CA3AF";
  return (
    <div className="inline-flex items-center">
      <span
        className="w-2 h-2 rounded-full mr-2"
        style={{ backgroundColor: color }}
      />
      <span
        className="px-2.5 py-0.5 rounded-full text-sm font-medium"
        style={{
          backgroundColor: `${color}15`,
          color: color,
        }}
      >
        {count || 0}
      </span>
    </div>
  );
};
