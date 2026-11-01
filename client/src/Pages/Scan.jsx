import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, PackageCheck, ArrowRight, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";
import ScanHero from "../components/upload/ScanHero";
import DetectedGrid from "../components/upload/DetectedGrid";
import SpoiledPanel from "../components/upload/SpoiledPanel";
import Button from "../components/common/Button";
import { SkeletonGrid } from "../components/common/Skeleton";
import API from "../services/api";

export default function Scan() {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  // Keep a reference to the actual File object so we can POST it
  const fileRef = useRef(null);

  // Revoke the blob URL when it's replaced or the page unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleSelectImage = (file) => {
    fileRef.current = file;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setResult(null);
  };

  const handleChangeImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    fileRef.current = null;
    setResult(null);
  };

  const runScan = async () => {
    if (!fileRef.current) {
      toast.error("Please upload a fridge photo first.");
      return;
    }

    setScanning(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", fileRef.current);

      // POST the actual uploaded image to the real AI detection endpoint
      const [res] = await Promise.all([
        API.post("/detect", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
        new Promise((r) => setTimeout(r, 1600)),
      ]);

      const data = res.data;

      // Normalize spoiled — API returns [{name, reason}] or [string]
      const spoiledItems = Array.isArray(data.spoiled)
        ? data.spoiled.map((s) =>
            typeof s === "string" ? { name: s, reason: "" } : s
          )
        : [];

      const normalizedResult = {
        ...data,
        spoiled: spoiledItems,
        detected: data.items || [],
        totalDetected: data.items?.length || 0,
        savedCount: data.savedCount ?? data.fresh?.length ?? data.ingredients?.length ?? 0,
      };

      setResult(normalizedResult);

      if (spoiledItems.length > 0) {
        toast.success(
          `✅ ${normalizedResult.savedCount} ingredient(s) saved to pantry · ⚠️ ${spoiledItems.length} spoiled item(s) found`
        );
      } else {
        toast.success(
          `✅ ${normalizedResult.savedCount} fresh ingredient(s) auto-saved to your pantry!`
        );
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Detection failed. Please try again."
      );
    } finally {
      setScanning(false);
    }
  };

  return (
    <DashboardLayout
      title="Scan Your Fridge"
      subtitle="Upload a fridge photo and auto-detect ingredients & defects"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScanHero
          previewUrl={previewUrl}
          scanning={scanning}
          scanned={Boolean(result)}
          onSelectImage={handleSelectImage}
          onChangeImage={handleChangeImage}
          onScan={runScan}
        />

        <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-black/5">
          <h2 className="mb-5 text-lg font-bold text-[#0C1F16]">Detection Results</h2>

          {scanning ? (
            <div className="space-y-4">
              <p className="text-sm text-[#5B6B60] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Analyzing image with AI — detecting ingredients &amp; defects…
              </p>
              <SkeletonGrid count={6} className="grid-cols-2 sm:grid-cols-3" />
            </div>
          ) : !result ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">🧊</p>
              <p className="text-sm text-[#5B6B60] max-w-xs mx-auto">
                {previewUrl
                  ? 'Click "Scan Fridge" to detect what\'s inside.'
                  : "Upload a photo of your fridge to get started. AI will detect ingredients, flag defective items, and auto-save fresh ones to your pantry."}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {result.spoiled.length > 0 && (
                <SpoiledPanel spoiled={result.spoiled} />
              )}

              {result.spoiled.length === 0 && result.totalDetected > 0 && (
                <div className="flex items-center gap-2 rounded-xl bg-[#E7F3EA] border border-[#CFE4D4] px-4 py-3 text-sm font-semibold text-[#2E5C41]">
                  <CheckCircle2 size={16} />
                  All {result.totalDetected} detected item(s) look fresh!
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#E7F3EA] border border-[#CFE4D4] px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#2E5C41]">
                  <PackageCheck size={16} />
                  {result.savedCount} healthy ingredient(s) auto-saved to Pantry
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="secondary" onClick={() => navigate("/pantry")}>
                    Pantry <ArrowRight size={14} className="ml-1" />
                  </Button>
                  <Button size="sm" className="bg-emerald-700 hover:bg-emerald-800 text-white" onClick={() => navigate("/recipes")}>
                    View Recipes ✨
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#2E5C41]">
                  <CheckCircle2 size={16} />
                  All Detected Ingredients ({result.totalDetected})
                </h3>
                <DetectedGrid items={result.detected} />
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
