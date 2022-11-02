import React, { useCallback, useMemo, useRef } from "react";

import { scaleOrdinal } from "@visx/scale";
import { useTooltip } from "@visx/tooltip";
import merge from "lodash-es/merge";

import { ArchData } from "./piechart";

type ChartMargin = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

const defaultMargin: ChartMargin = Object.freeze({
  top: 8,
  right: 8,
  bottom: 8,
  left: 8,
});

export default function usePieChart(props: {
  data: ArchData[];
  size: number;
  thickness: number;
  margin?: ChartMargin;
}) {
  props.margin = merge({}, defaultMargin, props.margin);

  const outerRadius =
    (props.size - props.margin.top - props.margin.bottom) >> 1;
  if (outerRadius < 0) {
    throw new Error("margins are too large or the size is too small");
  }

  const innerRadius = outerRadius - props.thickness;
  if (innerRadius < 0) {
    throw new Error("innerRadius is less than 0, maybe thickness is too large");
  }

  const y = (d: ArchData) => d.value;
  const x = (d: ArchData) => d.name;
  const color = (d: ArchData) => d.color;

  const colorScale = useMemo(
    () =>
      scaleOrdinal({
        domain: props.data.map(x),
        range: props.data.map(color),
      }),
    [props.data]
  );

  const {
    hideTooltip,
    showTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft,
    tooltipTop,
  } = useTooltip<ArchData>();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleTooltipShow = useCallback(
    (e: React.MouseEvent<SVGPathElement, MouseEvent>, d: ArchData) => {
      const $ctn = containerRef.current;
      if ($ctn) {
        const bounding = $ctn.getBoundingClientRect();
        showTooltip({
          tooltipData: d,
          tooltipLeft: e.clientX - bounding.x,
          tooltipTop: e.clientY - bounding.y,
        });
      }
    },
    [showTooltip]
  );
  const handleTooltipHide = useMemo(() => hideTooltip, [hideTooltip]);

  const size = props.size;

  return {
    size,
    containerRef,
    innerRadius,
    outerRadius,
    x,
    y,
    colorScale,
    tooltipOpen,
    tooltipData,
    tooltipLeft,
    tooltipTop,
    handleTooltipShow,
    handleTooltipHide,
  };
}
