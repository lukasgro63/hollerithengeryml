/**
 * Energy unit formatting.
 *
 * The 2024 meta-model predicts energy in kilowatt-hours, but the actual
 * magnitudes for small datasets are in the micro-kWh range. Scaling down
 * the display unit (kWh → Wh → mWh → µWh) keeps the rendered number
 * human-readable regardless of dataset size.
 */

export type EnergyUnit = "kWh" | "Wh" | "mWh" | "µWh";

interface EnergyScale {
  readonly unit: EnergyUnit;
  /** Multiply a kWh value by this factor to express it in `unit`. */
  readonly factor: number;
}

const SCALES: readonly EnergyScale[] = [
  { unit: "kWh", factor: 1 },
  { unit: "Wh", factor: 1_000 },
  { unit: "mWh", factor: 1_000_000 },
  { unit: "µWh", factor: 1_000_000_000 },
] as const;

/**
 * Format a single kWh value using the most readable unit.
 * Example: `formatEnergy(0.000042)` → `"42.00 µWh"`.
 */
export function formatEnergy(kwh: number, fractionDigits = 2): string {
  const scale = pickScaleFor(kwh);
  const value = kwh * scale.factor;
  return `${value.toFixed(fractionDigits)} ${scale.unit}`;
}

/**
 * Pick a single scale that fits a set of values, so a chart renders all
 * bars in the same unit even when the largest and smallest differ.
 */
export function pickScaleFor(...values: number[]): EnergyScale {
  const max = values.length === 0 ? 0 : Math.max(...values.map((v) => Math.abs(v)));
  if (max >= 1) return SCALES[0];
  if (max >= 1e-3) return SCALES[1];
  if (max >= 1e-6) return SCALES[2];
  return SCALES[3];
}
