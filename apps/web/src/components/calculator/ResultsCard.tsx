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
import { AlertTriangle, Trophy } from "lucide-react";

import type {
  ModelUsed,
  PredictionsRequest,
  PredictionsResponse,
} from "@/lib/schemas";

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
  const { predictions, model_used, thresholds_applied, out_of_training_range } = data;

  const sorted = [...predictions].sort(
    (a, b) => a.energy_percent - b.energy_percent,
  );

  const chartData = sorted.map((p, idx) => ({
    label: `${idx + 1}. ${p.algorithm}`,
    algorithm: p.algorithm,
    value: p.energy_percent,
    rank: idx + 1,
  }));

  const averagePercent =
    chartData.reduce((sum, d) => sum + d.value, 0) / chartData.length;
  const greenest = sorted[0];

  return (
    <div className="animate-fade-in-up">
      <div
        aria-hidden="true"
        className="h-[3px] w-10 rounded-full bg-gradient-to-r from-brand-yellow to-brand-yellow-end"
      />

      <p className="mt-5 font-display text-h3 font-extrabold tracking-tight text-ink-950">
        Energy consumed by Algorithm during Training
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">
        Model:{" "}
        <span className="font-semibold text-ink-700">
          {MODEL_LABEL[model_used]}
        </span>
        {" · "}
        {input.num_numerical_features} numerical · {input.num_categorical_features} categorical · {input.dataset_size.toLocaleString()} rows
      </p>

      {out_of_training_range ? (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 border border-amber-400/40 bg-amber-50 p-4 text-sm text-amber-900"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" aria-hidden="true" />
          <p>
            The input values exceed the training range of the HollerithEnergyML
            model (≤{thresholds_applied.num_features} numerical,
            ≤{thresholds_applied.cat_features} categorical features,
            ≤{thresholds_applied.dataset_size.toLocaleString()} rows). Predictions
            are extrapolated and may be less accurate.
          </p>
        </div>
      ) : null}

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
            {greenest.energy_percent}%
          </span>
        </div>
      ) : null}

      <div
        className="mt-10 h-72 min-h-[1px] w-full sm:h-80"
        role="img"
        aria-label="Horizontal bar chart of relative training-energy share per algorithm"
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
              domain={[0, 100]}
              tickFormatter={(value: number) => `${value}`}
              stroke={AXIS_COLOR}
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "11px", fontWeight: 500 }}
              label={{
                value: "Relative Energy Consumption (%)",
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
              dataKey="label"
              stroke={AXIS_COLOR}
              tickLine={false}
              axisLine={false}
              width={150}
              style={{ fontSize: "12px", fontWeight: 600 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-surface-0)",
                border: "none",
                borderRadius: "var(--radius-lg)",
                fontSize: "12px",
                boxShadow: "var(--shadow-card-hover)",
              }}
              labelStyle={{ color: "var(--color-ink-950)", fontWeight: 700 }}
              cursor={{ fill: "var(--color-brand-yellow-subtle)" }}
              formatter={(value) =>
                typeof value === "number" ? [`${value}%`, "Energy"] : ["—", "Energy"]
              }
            />
            <ReferenceLine
              x={averagePercent}
              stroke={AVG_COLOR}
              strokeDasharray="6 4"
              strokeWidth={1.5}
              label={{
                value: `Average: ${averagePercent.toFixed(2)}%`,
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

      {greenest ? (
        <p className="mt-8 text-sm leading-relaxed text-ink-700">
          According to the measured values and the prediction,{" "}
          <strong className="text-ink-950">{greenest.algorithm}</strong> is the
          most energy-efficient algorithm.
        </p>
      ) : null}

      <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-3 lg:gap-x-14">
        <dl>
          <dt className="label text-ink-400">Average</dt>
          <dd className="mt-3 border-b-2 border-surface-200 pb-3 font-mono text-2xl font-medium tabular-nums text-ink-900">
            {averagePercent.toFixed(2)}%
          </dd>
        </dl>
        <dl>
          <dt className="label text-ink-400">Thresholds</dt>
          <dd className="mt-3 border-b-2 border-surface-200 pb-3 text-base text-ink-700">
            ≤ {thresholds_applied.num_features} features · ≤{" "}
            {thresholds_applied.dataset_size.toLocaleString()} rows
          </dd>
        </dl>
        <dl>
          <dt className="label text-ink-400">Model path</dt>
          <dd className="mt-3 border-b-2 border-surface-200 pb-3 text-base font-semibold text-ink-700">
            {MODEL_LABEL[model_used]}
          </dd>
        </dl>
      </div>

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
              {p.energy_percent}%
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
