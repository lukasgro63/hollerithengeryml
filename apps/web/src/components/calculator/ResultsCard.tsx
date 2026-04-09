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

import { Card } from "@/components/ui/Card";
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

const BAR_COLOR = "#FFE400";
const BAR_COLOR_WINNER = "#E76F51";
const GRID_COLOR = "#EAEBEC";
const AXIS_COLOR = "#929292";
const AVG_COLOR = "#212121";

export function ResultsCard({ data, input }: ResultsCardProps) {
  const { predictions, average_kwh, model_used, thresholds_applied } = data;
  const scale = pickScaleFor(
    ...predictions.map((p) => p.energy_kwh),
    average_kwh,
  );

  // Build a chart frame sorted ascending so the lowest-energy algorithm
  // sits at the top of the horizontal bar chart — that's the winner.
  const chartData = [...predictions]
    .sort((a, b) => a.energy_kwh - b.energy_kwh)
    .map((p) => ({
      algorithm: p.algorithm,
      value: p.energy_kwh * scale.factor,
      rawKwh: p.energy_kwh,
      rank: p.rank,
    }));

  const averageDisplay = average_kwh * scale.factor;
  const greenest = chartData[0];

  return (
    <Card>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-h4 font-bold leading-tight tracking-tight text-ink-900">
            Predicted training energy
          </h2>
          <p className="mt-1 text-sm text-ink-500">
            Ranked from lowest to highest. Selected model:{" "}
            <span className="font-semibold text-ink-700">
              {MODEL_LABEL[model_used]}
            </span>
          </p>
        </div>

        {greenest ? (
          <div className="inline-flex items-center gap-2 rounded-sm border border-brand-yellow/40 bg-brand-yellow/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink-800">
            <Trophy className="h-4 w-4" aria-hidden="true" />
            Greenest: {greenest.algorithm}
          </div>
        ) : null}
      </div>

      <div
        className="h-72 w-full sm:h-80"
        role="img"
        aria-label={`Horizontal bar chart of predicted training energy for five algorithms, in ${scale.unit}`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 30, bottom: 18, left: 6 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} horizontal={false} />
            <XAxis
              type="number"
              tickFormatter={(value: number) => value.toFixed(2)}
              stroke={AXIS_COLOR}
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "11px" }}
              label={{
                value: scale.unit,
                position: "insideBottom",
                offset: -8,
                style: { fill: "#707173", fontSize: 11, fontWeight: 600 },
              }}
            />
            <YAxis
              type="category"
              dataKey="algorithm"
              stroke={AXIS_COLOR}
              tickLine={false}
              axisLine={false}
              width={135}
              style={{ fontSize: "12px", fontWeight: 500 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #DADADA",
                borderRadius: "4px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#212121", fontWeight: 700 }}
              cursor={{ fill: "rgba(255, 228, 0, 0.08)" }}
              formatter={(value) => {
                if (typeof value !== "number") return ["—", "Energy"];
                const kwh = value / scale.factor;
                return [formatEnergy(kwh, 3), "Energy"];
              }}
            />
            <ReferenceLine
              x={averageDisplay}
              stroke={AVG_COLOR}
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: `avg ${averageDisplay.toFixed(2)} ${scale.unit}`,
                position: "top",
                fill: AVG_COLOR,
                fontSize: 11,
                fontWeight: 600,
              }}
            />
            <Bar
              dataKey="value"
              radius={[0, 4, 4, 0]}
              fill={BAR_COLOR}
              // Recharts 2.x honours an `activeBar` and per-entry fill via
              // the Cell child; here we keep the whole series uniform and
              // colour the winner through a second Bar overlay below.
            />
            {greenest ? (
              <Bar
                dataKey={(entry: { algorithm: string; value: number }) =>
                  entry.algorithm === greenest.algorithm ? entry.value : 0
                }
                fill={BAR_COLOR_WINNER}
                radius={[0, 4, 4, 0]}
                isAnimationActive={false}
              />
            ) : null}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid gap-5 border-t border-surface-200 pt-6 sm:grid-cols-3">
        <dl>
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-500">
            Average
          </dt>
          <dd className="mt-1 text-xl font-bold tabular-nums text-ink-900">
            {formatEnergy(average_kwh)}
          </dd>
        </dl>
        <dl>
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-500">
            Your input
          </dt>
          <dd className="mt-1 text-sm text-ink-700">
            {input.num_numerical_features.toLocaleString()} num ·{" "}
            {input.num_categorical_features.toLocaleString()} cat ·{" "}
            {input.dataset_size.toLocaleString()} rows
          </dd>
        </dl>
        <dl>
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-500">
            Model selection
          </dt>
          <dd className="mt-1 text-sm text-ink-700">
            RF path if ≤ {thresholds_applied.num_features} features and ≤{" "}
            {thresholds_applied.dataset_size.toLocaleString()} rows
          </dd>
        </dl>
      </div>

      <ol className="mt-6 grid gap-2 border-t border-surface-200 pt-6 sm:grid-cols-5">
        {[...predictions]
          .sort((a, b) => a.energy_kwh - b.energy_kwh)
          .map((p, idx) => (
            <li key={p.algorithm} className="rounded-sm border border-surface-200 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                #{idx + 1}
              </p>
              <p className="mt-1 text-sm font-semibold text-ink-800">
                {p.algorithm}
              </p>
              <p className="mt-1 text-xs tabular-nums text-ink-600">
                {formatEnergy(p.energy_kwh, 3)}
              </p>
            </li>
          ))}
      </ol>
    </Card>
  );
}
