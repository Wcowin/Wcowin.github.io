"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/glass-card";
import { siteConfig } from "@/config/site";

/* ============================================================
   GitHub Contribution Heatmap Card
   Data: github-contributions-api.jogruber.de (no token needed)
   ============================================================ */

interface ContributionDay {
    date: string;
    count: number;
    level: number; // 0-4
}

interface ContributionData {
    total: { lastYear: number };
    contributions: ContributionDay[];
}

const CELL = 11;
const GAP = 3;
const ROWS = 7;

/* Tint color opacity levels matching GitHub's 5-step scale */
const LEVEL_OPACITY = [0.05, 0.25, 0.5, 0.75, 1.0];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

export function GitHubHeatmapCard() {
    const username = siteConfig.github?.username;
    const [data, setData] = useState<ContributionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [tooltip, setTooltip] = useState<{
        x: number;
        y: number;
        date: string;
        count: number;
    } | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!username) {
            setLoading(false);
            return;
        }
        fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
            .then((r) => r.json())
            .then((d: ContributionData) => {
                setData(d);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [username]);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<SVGSVGElement>) => {
            const svg = svgRef.current;
            const wrapper = wrapperRef.current;
            if (!svg || !wrapper || !data) return;

            /* Convert screen coords → SVG viewBox coords via CTM */
            const ctm = svg.getScreenCTM();
            if (!ctm) return;
            const pt = svg.createSVGPoint();
            pt.x = e.clientX;
            pt.y = e.clientY;
            const svgPt = pt.matrixTransform(ctm.inverse());

            const labelOffset = 28;
            const headerOffset = 16;
            const col = Math.floor((svgPt.x - labelOffset) / (CELL + GAP));
            const row = Math.floor((svgPt.y - headerOffset) / (CELL + GAP));

            if (col < 0 || row < 0 || row >= ROWS) {
                setTooltip(null);
                return;
            }

            const idx = col * ROWS + row;
            if (idx >= 0 && idx < data.contributions.length) {
                const day = data.contributions[idx];
                /* Tooltip position uses DOM-pixel coords relative to wrapper */
                const wrapperRect = wrapper.getBoundingClientRect();
                setTooltip({
                    x: e.clientX - wrapperRect.left,
                    y: e.clientY - wrapperRect.top - 40,
                    date: day.date,
                    count: day.count,
                });
            } else {
                setTooltip(null);
            }
        },
        [data]
    );

    if (!username) return null;

    /* Calculate grid dimensions (viewBox space, not pixel space) */
    const weeks = data ? Math.ceil(data.contributions.length / ROWS) : 53;
    const labelOffset = 28;
    const headerOffset = 16;
    const svgWidth = labelOffset + weeks * (CELL + GAP);
    const svgHeight = headerOffset + ROWS * (CELL + GAP);

    /* Get month labels for the x-axis */
    const monthLabels: { label: string; x: number }[] = [];
    if (data) {
        let lastMonth = -1;
        for (let w = 0; w < weeks; w++) {
            const idx = w * ROWS;
            if (idx < data.contributions.length) {
                const month = new Date(data.contributions[idx].date).getMonth();
                if (month !== lastMonth) {
                    monthLabels.push({
                        label: MONTHS[month],
                        x: labelOffset + w * (CELL + GAP),
                    });
                    lastMonth = month;
                }
            }
        }
    }

    return (
        <GlassCard className="flex flex-col gap-3 p-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-primary">GitHub</h3>
                {data && (
                    <span className="text-sm text-text-tertiary">
                        过去一年 <strong className="text-text-primary">{data.total.lastYear}</strong> 次贡献
                    </span>
                )}
            </div>

            {/* Heatmap Grid — responsive via viewBox */}
            <div ref={wrapperRef} className="relative w-full">
                {loading ? (
                    /* Skeleton — fills card width */
                    <div className="flex justify-between w-full">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className="flex flex-col gap-[3px]">
                                {Array.from({ length: 7 }).map((_, j) => (
                                    <div
                                        key={j}
                                        className="rounded-sm animate-pulse"
                                        style={{
                                            width: CELL,
                                            height: CELL,
                                            backgroundColor: "var(--glass-border)",
                                        }}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                ) : data ? (
                    <svg
                        ref={svgRef}
                        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                        width="100%"
                        preserveAspectRatio="xMidYMid meet"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setTooltip(null)}
                        className="select-none w-full"
                    >
                        {/* Month labels */}
                        {monthLabels.map((m, i) => (
                            <text
                                key={i}
                                x={m.x}
                                y={11}
                                className="fill-text-tertiary"
                                fontSize={10}
                                fontFamily="inherit"
                            >
                                {m.label}
                            </text>
                        ))}

                        {/* Day labels */}
                        {DAYS.map((d, i) => (
                            d && (
                                <text
                                    key={i}
                                    x={0}
                                    y={headerOffset + i * (CELL + GAP) + CELL - 1}
                                    className="fill-text-tertiary"
                                    fontSize={9}
                                    fontFamily="inherit"
                                >
                                    {d}
                                </text>
                            )
                        ))}

                        {/* Contribution cells */}
                        {data.contributions.map((day, idx) => {
                            const col = Math.floor(idx / ROWS);
                            const row = idx % ROWS;
                            return (
                                <rect
                                    key={day.date}
                                    x={labelOffset + col * (CELL + GAP)}
                                    y={headerOffset + row * (CELL + GAP)}
                                    width={CELL}
                                    height={CELL}
                                    rx={2}
                                    ry={2}
                                    fill={`rgba(var(--tint-rgb), ${LEVEL_OPACITY[day.level]})`}
                                    className="transition-opacity duration-150"
                                />
                            );
                        })}
                    </svg>
                ) : (
                    <p className="text-sm text-text-tertiary">无法加载贡献数据</p>
                )}

                {/* Tooltip */}
                {tooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute pointer-events-none px-2.5 py-1.5 rounded-lg text-xs font-medium z-50"
                        style={{
                            left: tooltip.x,
                            top: tooltip.y,
                            background: "var(--glass-bg)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid var(--glass-border)",
                            color: "var(--text-primary)",
                            transform: "translateX(-50%)",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {tooltip.count > 0
                            ? `${formatDate(tooltip.date)}：${tooltip.count} 次贡献`
                            : `${formatDate(tooltip.date)}：无贡献`}
                    </motion.div>
                )}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1.5 text-xs text-text-tertiary self-end">
                <span>少</span>
                {LEVEL_OPACITY.map((op, i) => (
                    <div
                        key={i}
                        className="rounded-sm"
                        style={{
                            width: CELL,
                            height: CELL,
                            backgroundColor: `rgba(var(--tint-rgb), ${op})`,
                        }}
                    />
                ))}
                <span>多</span>
            </div>
        </GlassCard>
    );
}
