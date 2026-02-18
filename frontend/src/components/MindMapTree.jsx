import { useRef, useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { mindmapSampleData } from "../data/mindmapSample";

const ROOT_NAME = "ESS coursework roadmap";

function getNodeColor(nodeDatum) {
  const hasChildren = nodeDatum.children && nodeDatum.children.length > 0;
  if (nodeDatum.name === ROOT_NAME) return "bg-cyan-400 text-gray-900";
  if (hasChildren) return "bg-cyan-300/90 text-gray-900";
  return "bg-emerald-300/90 text-gray-900";
}

function renderCustomNode({ nodeDatum, toggleNode }) {
  const hasChildren = nodeDatum.children && nodeDatum.children.length > 0;
  const colorClass = getNodeColor(nodeDatum);
  return (
    <g>
      <foreignObject x="-84" y="-18" width="168" height="36" className="overflow-visible">
        <div
          className={`flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium shadow-md border border-cyan-500/40 ${colorClass}`}
          style={{ width: "168px", minHeight: "36px", boxSizing: "border-box" }}
        >
          <span className="text-center leading-tight break-words line-clamp-2">{nodeDatum.name}</span>
        </div>
      </foreignObject>
      {hasChildren && (
        <circle
          r={12}
          cy={0}
          fill="white"
          stroke="currentColor"
          strokeWidth="1.5"
          className="cursor-pointer text-cyan-500"
          onClick={(e) => {
            e.stopPropagation();
            toggleNode();
          }}
        />
      )}
    </g>
  );
}

export default function MindMapTree({ data = mindmapSampleData, className = "" }) {
  const containerRef = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 50 });

  useEffect(() => {
    if (!containerRef.current) return;
    const { width } = containerRef.current.getBoundingClientRect();
    setTranslate({ x: width / 2 - 84, y: 50 });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`h-[calc(100vh-11rem)] min-h-[420px] w-full rounded-xl overflow-hidden ${className}`}
      style={{ background: "#0f172a" }}
    >
      <Tree
        data={data}
        translate={translate}
        orientation="horizontal"
        pathFunc="step"
        rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        renderCustomNodeElement={(props) => renderCustomNode(props)}
        pathClassFunc={() => "mindmap-link"}
        zoom={0.75}
        scaleExtent={{ min: 0.2, max: 1.5 }}
        separation={{ siblings: 1.15, nonSiblings: 1.3 }}
        enableLegacyTransitions
        collapsible
      />
    </div>
  );
}
