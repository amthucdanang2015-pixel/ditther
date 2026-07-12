"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  RotateCcw,
  Sparkles,
  Crop,
  Plus,
  Crown,
  Upload,
  Grip,
  Omega,
} from "lucide-react";
import Link from "next/link";
import FoundingModal, { FoundingModalStep } from "./FoundingModal";
import NewsModal from "./NewModal";
import ExportDropdown from "./ExportDropdown";

export default function AppNavbar({ handleReset, onImageUpload, compareMode, onCompare, cropMode, onCrop, selectedBg }: {
  handleReset?: () => void;
  onImageUpload?: (url: string) => void;
  compareMode?: boolean;
  onCompare?: () => void;
  cropMode?: boolean;
  onCrop?: () => void;
  selectedBg?: string;
}) {
  const resetBtn = () => {
    handleReset?.();
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onImageUpload?.(url);
    // Reset input so re-selecting the same file triggers onChange again
    e.target.value = "";
  };

  // ── Founding modal state ────────────────────────────────────────────────
  const [modalStep, setModalStep] = useState<FoundingModalStep>(null);
  const [isNewsModal, setIsNewsModal] = useState<Boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const openBelievers = useCallback(() => setModalStep("members"), []);
  const closeModal = useCallback(() => setModalStep(null), []);
  const goToPro = useCallback(() => setModalStep("pro"), []);

  const handleExport = async (format: string, resolutionLabel: string) => {
    if (!selectedBg) return;

    try {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = selectedBg;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      let targetWidth = img.width;
      if (resolutionLabel.includes("720px")) targetWidth = 1280;
      else if (resolutionLabel.includes("1080px")) targetWidth = 1920;
      else if (resolutionLabel.includes("2048px")) targetWidth = 2048;
      else if (resolutionLabel.includes("3840px")) targetWidth = 3840;

      const scale = targetWidth / img.width;
      canvas.width = targetWidth;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const mimeType = format === "PNG" ? "image/png" : "image/jpeg";
        const dataUrl = canvas.toDataURL(mimeType, 0.9);

        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `ditther-manhnc-${Math.floor(Date.now() / 1000)}.${format.toLowerCase()}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (e) {
      console.error("Export failed", e);
    }
    setIsExportOpen(false);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-[60px] border-b border-white/5 bg-[#0f0f10]">
        <div className="relative flex h-full items-center justify-between px-4">
          <div className="flex items-center gap-1">
            <Link href="/" className="flex h-[28px] w-auto items-center">
              <div className="flex items-center gap-1 cursor-pointer">
                <Image
                  src="/images/ditther_logo.png"
                  alt="Ditther"
                  width={75}
                  height={18}
                  priority
                />

                <button className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-white/5 transition">
                  <Grip size={18} />
                </button>
              </div>
            </Link>
            <button
              onClick={openBelievers}
              className="ml-2 flex items-center gap-2 text-[14px] text-white/65 transition cursor-pointer hover:text-[#9ad013]"
            >
              <Crown size={14} />
              Believers
            </button>
          </div>

          {/* ================= Center ================= */}

          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-4 cursor-pointer">
            <NavButton icon={<RotateCcw size={15} />} label="Reset" onClick={resetBtn} />

            <NavButton icon={<Sparkles size={15} />} label="Backgrounds" onClick={() => { console.log("Background") }} />

            {/* Hidden file picker – images only */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="h-8 w-8 rounded-full border border-white/15 bg-[#181818] hover:bg-[#222] cursor-pointer transition">
              <Plus className="mx-auto" size={14} />
            </button>

            <NavButton icon={<Omega size={15} />} label="Compare" active={compareMode} onClick={() => onCompare?.()} />

            <NavButton icon={<Crop size={15} />} label="Crop" active={cropMode} onClick={() => onCrop?.()} />
          </div>

          {/* ================= Right ================= */}

          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-1 rounded-full px-3 py-2 text-[12px] text-white/65 hover:text-[#9ad013] cursor-pointer transition" onClick={() => setIsNewsModal(true)}>
              <Sparkles size={15} />
              What's New
            </button>

            <div className="relative">
              <button
                onClick={() => setIsExportOpen(!isExportOpen)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-[#1a1a1a] p-2 h-[28px] text-[12px] cursor-pointer hover:bg-[#232323] transition">
                <Upload size={14} />
                Export
              </button>

              <ExportDropdown
                isOpen={isExportOpen}
                onClose={() => setIsExportOpen(false)}
                onExport={handleExport}
              />
            </div>

            <button className="rounded-full bg-gradient-to-b from-[#f6f6f6] to-[#cfcfcf] h-[28px] p-2 text-[12px] flex items-center justify-center text-black hover:brightness-105 cursor-pointer transition">
              Upgrade
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Bar */}
      <nav className="fixed inset-x-0 bottom-0 z-50 flex h-[70px] md:hidden items-center justify-around bg-[#0f0f10] border-t border-white/5 px-2 pb-2">
        <MobileNavButton icon={<RotateCcw size={20} />} label="Reset" />
        <MobileNavButton icon={<Sparkles size={20} />} label="Backgrounds" />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="h-14 w-14 rounded-full border border-white/10 bg-[linear-gradient(180deg,#777_0%,#a5a5a5_100%)] hover:opacity-90 flex items-center justify-center transition shadow-lg -translate-y-2">
          <Plus size={24} className="text-black" />
        </button>
        <MobileNavButton icon={<Omega size={20} />} label="Compare" />
        <MobileNavButton icon={<Crop size={20} />} label="Crop" />
      </nav>

      {/* ── Founding / Pro Modal ── */}
      <FoundingModal
        step={modalStep}
        onClose={closeModal}
        onBecomeMember={goToPro}
      />
      <NewsModal isActive={isNewsModal} onClose={() => setIsNewsModal(false)} />
    </>
  );
}

function MobileNavButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex flex-col items-center gap-1 text-[10px] text-white/50 hover:text-white transition">
      {icon}
      {label}
    </button>
  );
}

function NavButton({ icon, label, onClick, active }: { icon: React.ReactNode; label: string; onClick: () => void; active?: boolean }) {
  return (
    <button
      className={`flex items-center gap-2 rounded-full h-[30px] p-[8px] text-[12px] cursor-pointer transition border ${active
        ? "bg-[linear-gradient(180deg,var(--glass-bg-hover-from)_0%,var(--glass-bg-hover-to)_60%)] border-[var(--border-secondary-color)] text-white shadow-[inset_0_1px_4px_var(--shadow-inset-top),inset_0_-1px_4px_var(--shadow-inset-bottom)]"
        : "border-transparent text-white/85 hover:bg-[linear-gradient(180deg,var(--glass-bg-hover-from)_0%,var(--glass-bg-hover-to)_60%)] hover:border hover:border-[var(--border-secondary-color)] hover:shadow-[inset_0_1px_4px_var(--shadow-inset-top),inset_0_-1px_4px_var(--shadow-inset-bottom)]"
        }`}
      onClick={onClick}>
      {icon}
      {label}
    </button>
  );
}
