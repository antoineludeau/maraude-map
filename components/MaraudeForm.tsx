import {
  useState,
  ChangeEvent,
  FormEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { useRouter } from "next/navigation";
import { customAlphabet } from "nanoid";

import { Maraude } from "@/types/maraude";
import { Geometry } from "@/types/geometry";
import { useMaraudes } from "@/components/MaraudeProvider";

const generateId = customAlphabet("1234567890abcdef", 6);

type FormData = {
  name: string;
  description: string;
};

const MaraudeForm = ({
  geometry,
  setGeometry,
  setMaraudes,
}: {
  geometry: Geometry | null;
  setGeometry: (geometry: Geometry | null) => void;
  setMaraudes: Dispatch<SetStateAction<Maraude[]>>;
}) => {
  const router = useRouter();
  const maraudesContext = useMaraudes();
  const setSelectedMaraudeID = maraudesContext?.setSelectedMaraudeID;
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
    setMaraudes((prev) => [
      ...prev,
      {
        id,
        name: formData.name,
        description: formData.description,
        image: "/placeholder.jpg",
        geometry: geometry as Geometry,
      },
    ]);
    setFormData({
      name: "",
      description: "",
    });
    setGeometry(null);
    setSelectedMaraudeID(id);
    router.push(`/`);
  };

  return (
    <div className="max-w-lg p-6 bg-white">
      <h1 className="text-2xl font-bold text-center mb-6">Add a new maraude</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div className="mb-4">Draw a maraude zone or a path</div>
        <div className="flex justify-center mt-8 space-x-4">
          <button
            type="submit"
            className={`py-2 px-4 font-semibold rounded-md shadow-md ${
              formData.name && formData.description && geometry
                ? "bg-green-600 text-white hover:bg-blue-700"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
            disabled={!formData.name || !formData.description || !geometry}
          >
            Submit
          </button>
            <button type="button" className={`py-2 px-4 font-semibold rounded-md hover:bg-gray-200`} onClick={() => router.back()}>
              Cancel
            </button>
        </div>
      </form>
    </div>
  );
};

export default MaraudeForm;
