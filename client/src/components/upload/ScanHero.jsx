import { motion, AnimatePresence } from "framer-motion";
import { ScanLine, CheckCircle2, RotateCcw } from "lucide-react";
import Button from "../common/Button";
import ImageDropzone from "./ImageDropzone";

export default function ScanHero({ previewUrl, scanning, scanned, onSelectImage, onChangeImage, onScan }) {
  return (
    <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-black/5">
      {!previewUrl ? (
        <ImageDropzone onSelect={onSelectImage} />
      ) : (
        <div className="relative rounded-2xl overflow-hidden border border-[#E4E9E0] bg-[#0C1F16]">
          <img
            src={previewUrl}
            alt="Uploaded fridge photo to scan"
            className="w-full max-h-[480px] object-cover"
          />

          {/* Scan sweep overlay */}
          <AnimatePresence>
            {scanning && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="absolute inset-0 bg-emerald-900/20" />
                <div
                  className="absolute left-0 right-0 h-24 opacity-80"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, rgba(52,211,153,0.55), transparent)",
                    animation: "scanBeam 1.8s ease-in-out infinite",
                  }}
                />
                <div className="absolute inset-0 border-2 border-emerald-400/60 rounded-2xl animate-pulse-glow" />
              </motion.div>
            )}
          </AnimatePresence>

          {scanned && !scanning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
            >
              <CheckCircle2 size={14} />
              Scan complete
            </motion.div>
          )}

          {!scanning && (
            <button
              onClick={onChangeImage}
              className="absolute top-4 left-4 bg-black/40 hover:bg-black/60 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition"
            >
              <RotateCcw size={12} />
              Change Photo
            </button>
          )}

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5">
            <p className="text-white text-sm font-medium">Your fridge photo</p>
            <p className="text-white/70 text-xs mt-0.5">Ready to scan for ingredients</p>
          </div>
        </div>
      )}

      {previewUrl && (
        <Button
          onClick={onScan}
          disabled={scanning}
          size="lg"
          className="mt-6 w-full"
          icon={<ScanLine size={18} className={scanning ? "animate-spin" : ""} />}
        >
          {scanning ? "Scanning fridge…" : scanned ? "Scan Again" : "Scan Fridge"}
        </Button>
      )}
    </div>
  );
}
