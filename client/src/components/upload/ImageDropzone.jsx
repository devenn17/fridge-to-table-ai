import { useCallback, useRef, useState } from "react";
import { UploadCloud, ImagePlus } from "lucide-react";
import toast from "react-hot-toast";

export default function ImageDropzone({ onSelect }) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = useCallback(
    (fileList) => {
      const file = fileList?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file (JPG, PNG, etc.)");
        return;
      }
      onSelect(file);
    },
    [onSelect]
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragActive(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
      className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed cursor-pointer text-center px-6 py-16 transition-all duration-200 ${
        dragActive
          ? "border-emerald-500 bg-emerald-50"
          : "border-[#D9E1D9] bg-[#FAFBF9] hover:border-emerald-400 hover:bg-emerald-50/40"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
          dragActive ? "bg-emerald-500 text-white" : "bg-white text-emerald-600 border border-[#E4E9E0]"
        }`}
      >
        {dragActive ? <ImagePlus size={26} /> : <UploadCloud size={26} />}
      </div>

      <p className="text-sm font-semibold text-[#1C2620]">
        {dragActive ? "Drop your photo here" : "Drag & drop a fridge photo, or click to browse"}
      </p>
      <p className="text-xs text-[#8A968C] mt-1.5">PNG or JPG, up to 10MB</p>
    </div>
  );
}
