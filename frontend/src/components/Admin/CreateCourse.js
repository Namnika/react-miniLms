import React from "react";
import ReactQuill from "react-quill-new";
import { BeatLoader } from "react-spinners";
import "react-quill-new/dist/quill.snow.css";

function CreateCourse({ title, value, setValue, loading, onChange, handleCourseSubmit }) {

  return (
    <form onSubmit={handleCourseSubmit}>
      <div id="course-edit" className="my-8">
        <div className="flex mb-7 flex-row ">
          <label
            htmlFor="small-input"
            className=" mb-2 w-xs  text-gray-900"
          >
            <strong>Course Name:</strong>
          </label>
          <input
            type="text"
            id="small-input"
            name="title"
            value={title}
            onChange={onChange}
            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "
          />
        </div>
        {/* react quill editor */}
        <div>
          <ReactQuill
            className="bg-gray-50"
            theme="snow"
            value={value}
            onChange={setValue}
          />
          {/* Optional: Display the raw HTML output */}
          <div style={{ marginTop: "20px" }}>
            <strong>Course Content:</strong>
            <div dangerouslySetInnerHTML={{ __html: value }} />
          </div>
        </div>
      </div>
      <div id="all-courses" className="course-button">
        <button className="w-full bg-violet-500 hover:bg-violet-400 h-8 my-3 rounded text-white font-semibold uppercase">
          {loading ? <BeatLoader size={9} color="#ddd6ff" /> : "Create Course"}

        </button>
      </div>
    </form>
  );
}

export default CreateCourse;
