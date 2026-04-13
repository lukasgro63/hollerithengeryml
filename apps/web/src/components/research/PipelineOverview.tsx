const NODE_H = 46;
const NODE_W = 108;
const SMALL_W = 72;
const SVG_W = 720;
const SVG_H = 330;

const COL_X = [58, 232, 422, 622] as const;

function yCenters(count: number): number[] {
  const gap = 6;
  const totalH = count * NODE_H + (count - 1) * gap;
  const start = (SVG_H - totalH) / 2;
  return Array.from(
    { length: count },
    (_, i) => start + i * (NODE_H + gap) + NODE_H / 2,
  );
}

const LAYERS = {
  datasets: yCenters(3),
  reduction: yCenters(5),
  classifiers: yCenters(5),
  output: yCenters(1),
};

function bezier(
  x1: number, y1: number,
  x2: number, y2: number,
): string {
  const dx = (x2 - x1) * 0.45;
  return `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;
}

function Connections({
  fromX, fromYs, toX, toYs, color,
}: {
  fromX: number;
  fromYs: number[];
  toX: number;
  toYs: number[];
  color: string;
}) {
  const paths: string[] = [];
  for (const fy of fromYs) {
    for (const ty of toYs) {
      paths.push(bezier(fromX, fy, toX, ty));
    }
  }
  return (
    <>
      {paths.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={1.2}
          opacity={0.3}
        />
      ))}
    </>
  );
}


function DatasetNode({ x, y, name, detail }: {
  x: number; y: number; name: string; detail: string;
}) {
  return (
    <foreignObject
      x={x - NODE_W / 2}
      y={y - NODE_H / 2}
      width={NODE_W}
      height={NODE_H}
    >
      <div className="flex h-full flex-col items-center justify-center bg-brand-yellow px-2 shadow-sm">
        <span className="text-[0.65rem] font-bold leading-tight text-ink-900">
          {name}
        </span>
        <span className="text-[0.5rem] font-medium leading-tight text-ink-700">
          {detail}
        </span>
      </div>
    </foreignObject>
  );
}

function SmallNode({ x, y, label, variant }: {
  x: number; y: number; label: string; variant: "neutral" | "rust";
}) {
  const styles = {
    neutral: "bg-ink-900 text-surface-0",
    rust: "bg-accent-rust text-white",
  };
  return (
    <foreignObject
      x={x - SMALL_W / 2}
      y={y - NODE_H / 2}
      width={SMALL_W}
      height={NODE_H}
    >
      <div
        className={`flex h-full items-center justify-center px-2 shadow-sm ${styles[variant]}`}
      >
        <span className="text-[0.65rem] font-bold">{label}</span>
      </div>
    </foreignObject>
  );
}

function OutputNode({ x, y }: { x: number; y: number }) {
  const w = 124;
  return (
    <foreignObject
      x={x - w / 2}
      y={y - NODE_H / 2 - 8}
      width={w}
      height={NODE_H + 16}
    >
      <div className="flex h-full flex-col items-center justify-center bg-ink-950 px-2 shadow-elevated ring-1 ring-brand-yellow/30">
        <span className="text-xl font-extrabold tabular-nums text-brand-yellow">
          450+
        </span>
        <span className="text-[0.5rem] font-medium leading-tight text-surface-300">
          measured runs
        </span>
        <span className="text-[0.5rem] leading-tight text-surface-300">
          → 12,551 training rows
        </span>
      </div>
    </foreignObject>
  );
}

function ColLabel({ x, y, children }: {
  x: number; y: number; children: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      className="fill-ink-500"
      style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}
    >
      {children}
    </text>
  );
}

const DATASETS_DATA = [
  { name: "Diabetes", detail: "254k × 21" },
  { name: "Bank", detail: "41k × 19" },
  { name: "Heart", detail: "320k × 17" },
] as const;

const REDUCTION_LABELS = ["100%", "80%", "60%", "40%", "20%"] as const;
const CLASSIFIER_LABELS = ["RF", "DT", "LR", "KNN", "GNB"] as const;

export function PipelineOverview() {
  const edgeRight = (colIdx: number, nodeW: number) =>
    COL_X[colIdx] + nodeW / 2;
  const edgeLeft = (colIdx: number, nodeW: number) =>
    COL_X[colIdx] - nodeW / 2;

  return (
    <figure className="my-12">
      <figcaption className="mb-5 flex items-center gap-3">
        <span className="label text-brand-yellow-press">
          Figure 1
        </span>
        <span className="text-xs text-ink-400">
          Baseline measurement pipeline
        </span>
      </figcaption>

      <div className="w-full">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          preserveAspectRatio="xMidYMid meet"
          className="block h-auto w-full"
          style={{ maxHeight: "350px" }}
        >

          <ColLabel x={COL_X[0]} y={16}>Datasets</ColLabel>
          <ColLabel x={COL_X[1]} y={16}>Subsampling</ColLabel>
          <ColLabel x={COL_X[2]} y={16}>Classifiers</ColLabel>
          <ColLabel x={COL_X[3]} y={16}>Output</ColLabel>


          <Connections
            fromX={edgeRight(0, NODE_W)}
            fromYs={LAYERS.datasets}
            toX={edgeLeft(1, SMALL_W)}
            toYs={LAYERS.reduction}
            color="var(--color-brand-yellow)"
          />
          <Connections
            fromX={edgeRight(1, SMALL_W)}
            fromYs={LAYERS.reduction}
            toX={edgeLeft(2, SMALL_W)}
            toYs={LAYERS.classifiers}
            color="var(--color-ink-400)"
          />
          <Connections
            fromX={edgeRight(2, SMALL_W)}
            fromYs={LAYERS.classifiers}
            toX={edgeLeft(3, 124)}
            toYs={LAYERS.output}
            color="var(--color-accent-rust)"
          />


          {DATASETS_DATA.map(({ name, detail }, i) => (
            <DatasetNode
              key={name}
              x={COL_X[0]}
              y={LAYERS.datasets[i]}
              name={name}
              detail={detail}
            />
          ))}


          {REDUCTION_LABELS.map((label, i) => (
            <SmallNode
              key={label}
              x={COL_X[1]}
              y={LAYERS.reduction[i]}
              label={label}
              variant="neutral"
            />
          ))}


          {CLASSIFIER_LABELS.map((label, i) => (
            <SmallNode
              key={label}
              x={COL_X[2]}
              y={LAYERS.classifiers[i]}
              label={label}
              variant="rust"
            />
          ))}


          <OutputNode x={COL_X[3]} y={LAYERS.output[0]} />


          <rect
            x={COL_X[2] - SMALL_W / 2 - 10}
            y={LAYERS.classifiers[0] - NODE_H / 2 - 14}
            width={SMALL_W + 20}
            height={LAYERS.classifiers[4] - LAYERS.classifiers[0] + NODE_H + 28}
            rx={12}
            fill="none"
            stroke="var(--color-accent-rust)"
            strokeWidth={1.5}
            strokeDasharray="5 3"
            opacity={0.5}
          />
          <text
            x={COL_X[2]}
            y={LAYERS.classifiers[4] + NODE_H / 2 + 24}
            textAnchor="middle"
            className="fill-accent-rust"
            style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.05em" }}
          >
            CodeCarbon v2.3.1
          </text>
        </svg>
      </div>

      <p className="mt-4 text-center text-[0.7rem] text-ink-500">
        3 datasets × 5 reduction levels × 5 classifiers × n runs —
        each <code className="bg-surface-100 px-1 text-[0.6rem] font-semibold">fit()</code> call
        instrumented with CodeCarbon energy tracking.
      </p>
    </figure>
  );
}
