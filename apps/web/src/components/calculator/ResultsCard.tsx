"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Trophy } from "lucide-react";

import type {
  ModelUsed,
  PredictionsRequest,
  PredictionsResponse,
} from "@/lib/schemas";
import { formatEnergy, pickScaleFor } from "@/lib/units";

type ResultsCardProps = {
  readonly data: PredictionsResponse;
  readonly input: PredictionsRequest;
};

const MODEL_LABEL: Record<ModelUsed, string> = {
  random_forest: "Random Forest",
  linear_regression: "Linear Regression",
};

const BAR_COLOR = "var(--color-brand-yellow)";
const GRID_COLOR = "var(--color-surface-100)";
const AXIS_COLOR = "var(--color-surface-300)";
const AVG_COLOR = "var(--color-ink-700)";

export function ResultsCard({ data, input }: ResultsCardProps) {
  const { predictions, average_kwh, model_used, thresholds_applied } = data;
  const scale = pickScaleFor(
    ...predictions.map((p) => p.energy_kwh),
    average_kwh,
  );

  const sorted = [...predictions].sort(
    (a, b) => a.energy_kwh - b.energy_kwh,
  );

  const chartData = sorted.map((p) => ({
    algorithm: p.algorithm,
    value: p.energy_kwh * scale.factor,
    rawKwh: p.energy_kwh,
    rank: p.rank,
  }));

  const averageDisplay = average_kwh * scale.factor;
  const greenest = sorted[0];

  return (
    <div className="animate-fade-in-up">
      {/* Section header — mirrors form's accent-bar pattern */}
      <div
        aria-hidden="true"
        className="h-[3px] w-10 rounded-full bg-gradient-to-r from-brand-yellow to-brand-yellow-end"
      />

      <p className="mt-5 font-display text-h3 font-extrabold tracking-tight text-ink-950">
        Predicted training energy
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">
        Model:{" "}
        <span className="font-semibold text-ink-700">
          {MODEL_LABEL[model_used]}
        </span>
        {" · "}
        {input.num_numerical_features} numerical · {input.num_categorical_features} categorical · {input.dataset_size.toLocaleString()} rows
      </p>

      {/* Greenest callout */}
      {greenest ? (
        <div className="mt-8 flex items-baseline gap-4">
          <span className="label flex items-center gap-2 text-ink-400">
            <Trophy className="h-3.5 w-3.5 text-brand-yellow" aria-hidden="true" />
            Greenest
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-ink-950 sm:text-2xl">
            {greenest.algorithm}
          </span>
          <span className="font-mono text-sm tabular-nums text-ink-500">
            {formatEnergy(greenest.energy_kwh, 3)}
          </span>
        </div>
      ) : null}

      {/* Chart — open, no container */}
      <div
        className="mt-10 h-72 w-full sm:h-80"
        role="img"
        aria-label={`Horizontal bar chart of predicted training energy in ${scale.unit}`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 24, right: 30, bottom: 16, left: 6 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={GRID_COLOR}
              horizontal={false}
            />
            <XAxis
              type="number"
              tickFormatter={(value: number) => value.toFixed(2)}
              stroke={AXIS_COLOR}
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "11px", fontWeight: 500 }}
              label={{
                value: scale.unit,
                position: "insideBottom",
                offset: -8,
                style: {
                  fill: "var(--color-ink-500)",
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                },
              }}
            />
            <YAxis
              type="category"
              dataKey="algorithm"
              stroke={AXIS_COLOR}
              tickLine={false}
              axisLine={false}
              width={130}
              style={{ fontSize: "12px", fontWeight: 600 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-surface-0)",
                border: "none",
                borderRadius: "12px",
                fontSize: "12px",
                boxShadow:
                  "0 8px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.03)",
              }}
              labelStyle={{ color: "var(--color-ink-950)", fontWeight: 700 }}
              cursor={{ fill: "rgba(255, 228, 0, 0.06)" }}
              formatter={(value) => {
                if (typeof value !== "number") return ["—", "Energy"];
                const kwh = value / scale.factor;
                return [formatEnergy(kwh, 3), "Energy"];
              }}
            />
            <ReferenceLine
              x={averageDisplay}
              stroke={AVG_COLOR}
              strokeDasharray="6 4"
              strokeWidth={1.5}
              label={{
                value: `avg ${averageDisplay.toFixed(2)} ${scale.unit}`,
                position: "top",
                fill: AVG_COLOR,
                fontSize: 10,
                fontWeight: 700,
              }}
            />
            <Bar
              dataKey="value"
              fill={BAR_COLOR}
              radius={[0, 6, 6, 0]}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary stats — bottom-border style matching form inputs */}
      <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-3 lg:gap-x-14">
        <dl>
          <dt className="label text-ink-400">
            Average
          </dt>
          <dd className="mt-3 border-b-2 border-surface-200 pb-3 font-mono text-2xl font-medium tabular-nums text-ink-900">
            {formatEnergy(average_kwh)}
          </dd>
        </dl>
        <dl>
          <dt className="label text-ink-400">
            Thresholds
          </dt>
          <dd className="mt-3 border-b-2 border-surface-200 pb-3 text-base text-ink-700">
            ≤ {thresholds_applied.num_features} features · ≤{" "}
            {thresholds_applied.dataset_size.toLocaleString()} rows
          </dd>
        </dl>
        <dl>
          <dt className="label text-ink-400">
            Model path
          </dt>
          <dd className="mt-3 border-b-2 border-surface-200 pb-3 text-base font-semibold text-ink-700">
            {MODEL_LABEL[model_used]}
          </dd>
        </dl>
      </div>

      {/* Algorithm ranking — clean horizontal list */}
      <ol className="mt-10 flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-8">
        {sorted.map((p, idx) => (
          <li key={p.algorithm} className="flex items-baseline gap-2.5">
            <span
              className={`font-mono text-xs font-bold tabular-nums ${
                idx === 0 ? "text-brand-yellow-press" : "text-ink-300"
              }`}
            >
              #{idx + 1}
            </span>
            <span
              className={`text-sm font-bold ${
                idx === 0 ? "text-ink-950" : "text-ink-600"
              }`}
            >
              {p.algorithm}
            </span>
            <span className="font-mono text-xs tabular-nums text-ink-400">
              {formatEnergy(p.energy_kwh, 3)}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
