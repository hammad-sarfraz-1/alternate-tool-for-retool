import React, { useState, useEffect } from "react";
import { ResourceConfig } from "../config/types";

interface ResourceFormProps {
  resource: ResourceConfig;
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ResourceForm: React.FunctionComponent<ResourceFormProps> = ({
  resource,
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    setForm(initialData || {});
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type, checked } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({});
  };

  return (
    <form
      className="rounded-xl p-6 bg-white/90 shadow-glam"
      onSubmit={handleSubmit}
    >
      <h3 className="font-bold mb-4 text-blue-800 text-lg drop-shadow">
        {initialData ? "Edit" : "Create"} {resource.label || resource.name}
      </h3>
      {resource.fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-medium mb-1 text-blue-900">
            {field.label || field.name}
          </label>
          {field.inputType === "textarea" ? (
            <textarea
              className="border px-3 py-2 rounded w-full bg-blue-50 focus:bg-white transition"
              name={field.name}
              value={form[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              placeholder={`[${field.type}]`}
            />
          ) : (
            <input
              className="border px-3 py-2 rounded w-full bg-blue-50 focus:bg-white transition"
              type={field.inputType || "text"}
              name={field.name}
              value={form[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              placeholder={`[${field.type}]`}
            />
          )}
        </div>
      ))}
      <div className="flex gap-2 mt-6">
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-xl font-semibold shadow hover:from-blue-600 hover:to-blue-800 transition"
        >
          {initialData ? "Update" : "Create"}
        </button>
        {initialData && (
          <button
            type="button"
            className="bg-gray-200 text-gray-700 px-5 py-2 rounded-xl font-semibold shadow hover:bg-gray-300 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ResourceForm;
