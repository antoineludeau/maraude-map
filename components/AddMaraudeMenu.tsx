import { useState, ChangeEvent, FormEvent } from "react";
import { customAlphabet } from "nanoid";

import { Maraude } from "@/types/maraude";
import { Geometry } from "@/types/geometry";
import CloseButton from "./CloseButton";

const generateId = customAlphabet("1234567890abcdef", 6);

type FormData = {
  name: string;
  description: string;
};

const AddMaraudeMenu = ({
  editMode,
  setEditMode,
  geometry,
  setGeometry,
  setMaraudes,
  setSelectedMaraudeID,
}: {
  editMode: boolean;
  setEditMode: (state: boolean) => void;
  geometry: Geometry | null;
  setGeometry: (geometry: Geometry | null) => void;
  setMaraudes: (maraudes: any) => void;
  setSelectedMaraudeID: (id: string | null) => void;
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const id = generateId();
    setMaraudes((prevMaraudes: Maraude[]) => {
      return [
        ...prevMaraudes,
        {
          id,
          name: formData.name,
          description: formData.description,
          image: "/placeholder.jpg",
          geometry: geometry,
        },
      ];
    });
    setEditMode(false);
    setFormData({
      name: "",
      description: "",
    });
    setGeometry(null);
    setSelectedMaraudeID(id);
  };

  console.log(geometry);
  return (
    <>
      <div
        className={`w-[500px] absolute top-0 left-0 h-full bg-white shadow-lg transition-transform transform ${
          editMode ? "translate-x-0" : "-translate-x-full"
        } w-sm overflow-y-auto z-10`}
      >
        <div className="absolute top-4 right-4">
          <CloseButton onClick={()=>setEditMode(false)} />
        </div>
        <div className="max-w-lg mx-auto p-6 bg-white">
          <h1 className="text-2xl font-bold text-center mb-6">
            New maraude detail
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700"
              >
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div>Draw a maraude zone or a path</div>
            <button
              type="submit"
              className={`w-full py-2 px-4 font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                formData.name && formData.description && geometry
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
              disabled={!formData.name || !formData.description || !geometry}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddMaraudeMenu;
