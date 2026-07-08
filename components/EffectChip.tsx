interface Props {
    active?: boolean;
    children: React.ReactNode;
}

export default function EffectChip({
    active,
    children,
}: Props) {
    return (
        <button
            className={`
                rounded-full
                px-4
                py-2
                text-sm
                transition

                ${active
                    ? "bg-white text-black"
                    : "bg-[#242428] text-zinc-400 hover:bg-[#303035]"
                }
            `}
        >
            {children}
        </button>
    );
}