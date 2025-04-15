import React from "react";
import Greenwich from "@assets/icons/pdf-icons/logo.png";
import Lion from "@assets/icons/pdf-icons/lion.png";

const CoverPage = ({ student }) => {
  return (
    <div className="w-[210mm] min-h-[297mm] p-10 bg-white text-black font-sans text-[14px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <img
          src={Greenwich}
          alt="University logo"
          className="w-[196px] h-[98px] mb-8"
        />
        <img src={Lion} alt="Green Prep" className="w-[200px] h-[170px]" />
      </div>

      {/* Student Info */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold uppercase">{student.name}</h1>
        <p className="uppercase text-sm font-semibold text-gray-600">Student</p>
      </div>

      <div className="border p-4 rounded mb-4">
        <h2 className="font-bold mb-2">Student Information</h2>
        <div className="grid grid-cols-2 gap-2">
          <p>
            <b>Student ID:</b> {student.id}
          </p>
          <p>
            <b>Email:</b> {student.email}
          </p>
          <p>
            <b>Phone:</b> {student.phone}
          </p>
          <p>
            <b>Class:</b> {student.class}
          </p>
        </div>
      </div>

      {/* Session Info */}
      <div className="border p-4 rounded mb-4">
        <h2 className="font-bold mb-2">Session Details</h2>
        <div className="grid grid-cols-2 gap-2">
          <p>
            <b>Session name:</b> {student?.session?.name}
          </p>
          <p>
            <b>Start Date:</b> {student?.session?.start}
          </p>
          <p>
            <b>Session Key:</b> {student?.session?.key}
          </p>
          <p>
            <b>End Date:</b> {student?.session?.end}
          </p>
        </div>
      </div>

      {/* Scores */}
      <div className="border p-4 rounded">
        <h2 className="font-bold mb-2">All Score</h2>
        <div className="flex justify-between mb-2">
          <span>
            <b>Band Level:</b>
          </span>
          <span className="text-red-600 font-bold">{student?.band}</span>
        </div>
        <div className="grid grid-cols-2 gap-1">
          <p>
            Grammar & Vocabulary: {student?.scores?.grammar} | {student?.level}
          </p>
          <p>
            Listening: {student?.scores?.listening} | {student?.level}
          </p>
          <p>
            Reading: {student?.scores?.reading} | {student?.level}
          </p>
          <p>
            Speaking: {student?.scores?.speaking} | {student?.level}
          </p>
          <p>
            Writing: {student?.scores?.writing} | {student?.level}
          </p>
          <p>
            Total: {student?.scores?.total} | {student?.level}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoverPage;
