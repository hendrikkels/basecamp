"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  AreaChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Box, H3 } from "@/components/primitives";
import styles from "./Chart.module.css";

export type ChartVariant = "line" | "bar" | "area";

export interface ChartDataset {
  key: string;
  color?: string;
  name?: string;
}

export interface ChartProps {
  variant?: ChartVariant;
  data: Record<string, unknown>[];
  datasets: ChartDataset[];
  xAxis?: string;
  height?: number;
  title?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  className?: string;
}

const TOKEN_COLORS = [
  "var(--acc)",
  "var(--acc-2)",
  "var(--info)",
  "var(--success)",
  "var(--warn)",
  "var(--danger)",
];

export function Chart({
  variant = "line",
  data,
  datasets,
  xAxis = "name",
  height = 200,
  title,
  showGrid = true,
  showLegend = false,
  showTooltip = true,
  className,
}: ChartProps) {
  const classes = [styles.wrapper, className].filter(Boolean).join(" ");

  const gridProps = showGrid
    ? { stroke: "var(--hairline)", strokeDasharray: "none" }
    : undefined;

  const axisStyle = {
    fontFamily: "var(--mono)",
    fontSize: 9,
    letterSpacing: "0.12em",
    fill: "var(--dim)",
  };

  const tooltipStyle = {
    contentStyle: {
      background: "var(--surface-2)",
      border: "1px solid var(--hairline)",
      borderRadius: "var(--r-xs)",
      fontFamily: "var(--mono)",
      fontSize: 11,
      color: "var(--text)",
    },
    itemStyle: { color: "var(--text)" },
    labelStyle: { color: "var(--muted)", marginBottom: 4 },
  };

  const renderDatasets = (type: "line" | "bar" | "area") => {
    return datasets.map((ds, i) => {
      const color = ds.color || TOKEN_COLORS[i % TOKEN_COLORS.length];
      const name = ds.name || ds.key;

      if (type === "bar") {
        return (
          <Bar
            key={ds.key}
            dataKey={ds.key}
            name={name}
            fill={color}
            radius={[2, 2, 0, 0]}
          />
        );
      }
      if (type === "area") {
        return (
          <Area
            key={ds.key}
            type="monotone"
            dataKey={ds.key}
            name={name}
            stroke={color}
            fill={color}
            fillOpacity={0.1}
            strokeWidth={1.5}
            dot={false}
          />
        );
      }
      return (
        <Line
          key={ds.key}
          type="monotone"
          dataKey={ds.key}
          name={name}
          stroke={color}
          strokeWidth={1.5}
          dot={{ fill: color, r: 3 }}
          activeDot={{ r: 4, fill: color }}
        />
      );
    });
  };

  const commonChildren = (
    <>
      <XAxis
        dataKey={xAxis}
        tick={axisStyle}
        axisLine={{ stroke: "var(--hairline)" }}
        tickLine={false}
      />
      <YAxis
        tick={axisStyle}
        axisLine={false}
        tickLine={false}
      />
      {showGrid && <CartesianGrid {...gridProps} vertical={false} />}
      {showTooltip && <Tooltip {...tooltipStyle} cursor={{ fill: "var(--surface-2)" }} />}
      {showLegend && (
        <Legend
          wrapperStyle={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted)" }}
        />
      )}
    </>
  );

  const renderChart = () => {
    if (variant === "bar") {
      return (
        <BarChart data={data}>
          {commonChildren}
          {renderDatasets("bar")}
        </BarChart>
      );
    }
    if (variant === "area") {
      return (
        <AreaChart data={data}>
          {commonChildren}
          {renderDatasets("area")}
        </AreaChart>
      );
    }
    return (
      <LineChart data={data}>
        {commonChildren}
        {renderDatasets("line")}
      </LineChart>
    );
  };

  return (
    <Box className={classes}>
      {title && <H3 className={styles.title}>{title}</H3>}
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </Box>
  );
}

Chart.displayName = "Chart";
