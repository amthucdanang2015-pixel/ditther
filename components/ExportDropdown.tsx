import { useState } from "react";
import { Download, Share2, ChevronDown, ChevronUp } from "lucide-react";

interface ExportDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    onExport: (format: string, resolution: string) => void;
}

export default function ExportDropdown({
    isOpen,
    onClose,
    onExport,
}: ExportDropdownProps) {
    const [resOpen, setResOpen] = useState(false);
    const [fmtOpen, setFmtOpen] = useState(false);
    const [resolution, setResolution] = useState("Full HD — 1080px");
    const [format, setFormat] = useState("JPG");

    if (!isOpen) return null;

    const resolutions = [
        "HD — 720px",
        "Full HD — 1080px",
        "2K (Quad HD) — 2048px",
        "4K (Ultra HD) — 3840px"
    ];

    const formats = ["JPG", "PNG"];

    return (
        <>
            <div className="fixed inset-0 z-[100]" onClick={onClose} />
            <div className="absolute top-[50px] right-4 z-[101] w-[340px] bg-[#1a1a1d] border border-white/5 rounded-[24px] p-3 shadow-2xl flex flex-col gap-2">
                {/* Resolution */}
                <div className="relative">
                    <button
                        onClick={() => { setResOpen(!resOpen); setFmtOpen(false); }}
                        className="w-full flex  cursor-pointer items-center justify-between bg-[#242427] hover:bg-[#2a2a2d] transition rounded-[16px] px-4 py-3.5 text-[14px]"
                    >
                        <span className="text-white/60">Resolution</span>
                        <div className="flex items-center gap-2">
                            <span className="text-white">{resolution}</span>
                            {resOpen ? <ChevronUp size={16} className="text-white/60" /> : <ChevronDown size={16} className="text-white/60" />}
                        </div>
                    </button>
                    {resOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-[#242427] border border-white/5 rounded-[16px] p-1.5 z-20 shadow-xl flex flex-col gap-0.5">
                            {resolutions.map(r => (
                                <button
                                    key={r}
                                    onClick={() => { setResolution(r); setResOpen(false); }}
                                    className={`w-full cursor-pointer flex items-center justify-between text-left px-3 py-2.5 rounded-[12px] text-[14px] transition ${resolution === r ? "text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                                >
                                    {r}
                                    {(r.includes("2K") || r.includes("4K")) && (
                                        <span className="bg-[#a3e635] text-black text-[10px] font-bold px-1.5 py-0.5 rounded-[4px] uppercase tracking-wider">Pro</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Format */}
                <div className="relative">
                    <button
                        onClick={() => { setFmtOpen(!fmtOpen); setResOpen(false); }}
                        className="w-full flex cursor-pointer items-center justify-between bg-[#242427] hover:bg-[#2a2a2d] transition rounded-[16px] px-4 py-3.5 text-[14px]"
                    >
                        <span className="text-white/60">Format</span>
                        <div className="flex items-center gap-2">
                            <span className="text-white">{format}</span>
                            {fmtOpen ? <ChevronUp size={16} className="text-white/60" /> : <ChevronDown size={16} className="text-white/60" />}
                        </div>
                    </button>
                    {fmtOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-[#242427] border border-white/5 rounded-[16px] p-1.5 z-20 shadow-xl flex flex-col gap-0.5">
                            {formats.map(f => (
                                <button
                                    key={f}
                                    onClick={() => { setFormat(f); setFmtOpen(false); }}
                                    className={`w-full cursor-pointer text-left px-3 py-2.5 rounded-[12px] text-[14px] transition ${format === f ? "text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-2">
                    <button className="flex-1 flex cursor-pointer items-center justify-center gap-2 bg-[#242427] hover:bg-[#2a2a2d] border border-white/5 transition rounded-full py-3.5 text-[14px] text-white">
                        <Share2 size={16} />
                        Share
                    </button>
                    <button
                        onClick={() => onExport(format, resolution)}
                        className="flex-1 flex cursor-pointer items-center justify-center gap-2 bg-[#242427] hover:bg-[#2a2a2d] border border-white/5 transition rounded-full py-3.5 text-[14px] text-white">
                        <Download size={16} />
                        Export
                    </button>
                </div>
            </div>
        </>
    );
}
