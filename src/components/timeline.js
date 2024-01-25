import React, { useState } from "react";
import { render } from "react-dom";
import Timeline from "react-visjs-timeline";
import moment from "moment";
import "./timeline.scss";

const options = {
  width: "100%",
  height: "90vh",
  showMajorLabels: true,
  showCurrentTime: true,
  zoomMin: 1000000,
  type: "range",
  orientation: "top",
  stack: true,
  editable: true,
};

const groups = [
  {
    id: 1,
    content: "PRODUCT",
    nestedGroups: [11, 12],
    showNested: false,
  },
  {
    id: 2,
    content: "FLIGHTS",
    nestedGroups: [13],
    showNested: false,
  },
  {
    id: 3,
    content: "TEST-AK",
    nestedGroups: [14, 15],
    showNested: false,
  },
  {
    id: 11,
    content: "PRODUCT 1",
  },
  {
    id: 12,
    content: "PRODUCT 2",
  },
  {
    id: 13,
    content: "FLIGHTS 1",
  },
  {
    id: 14,
    content: "TEST-AK 1",
  },
  {
    id: 15,
    content: "TEST-AK 2",
  },
];

const items = [
  {
    id: 1,
    group: 1,
    content: "€95.00k",
    start: moment().startOf("day"),
    end: moment().startOf("day").add(1, "days"),
    title:
      "<B>CAMPAIGN:</B> PRODUCT <br> <B>BUDGET:</B>€95.00k <br> <B>WORKFLOW STATUS:</B> Completed <br> <B>LOCK STATUS:</B>Unlocked <br> <B>MONITOR STATUS:</B>Monitored",
  },

  {
    id: 2,
    group: 2,
    content: "€1000.00k",
    start: moment().startOf("day").add(1, "days"),
    end: moment().startOf("day").add(2, "days"),
    title:
      "<B>CAMPAIGN:</B> FLIGHTS <br> <B>BUDGET:</B>€1000.00k <br> <B>WORKFLOW STATUS:</B> Completed <br> <B>LOCK STATUS:</B>Unlocked <br> <B>MONITOR STATUS:</B>Monitored",
  },
  {
    id: 3,
    group: 3,
    content: "€98.00k",
    start: moment().startOf("day").add(2, "days"),
    end: moment().startOf("day").add(3, "days"),
    title:
      "<B>CAMPAIGN:</B> TEST-AK <br> <B>BUDGET:</B>€98.00k <br> <B>WORKFLOW STATUS:</B> Completed <br> <B>LOCK STATUS:</B>Unlocked <br> <B>MONITOR STATUS:</B>Monitored",
  },

  {
    id: 4,
    group: 11,
    content: "€101.00k",
    start: moment().startOf("day").add(1, "days"),
    end: moment().startOf("day").add(2, "days"),
    title:
      "<B>CAMPAIGN:</B> PRODUCT QA-1 <br> <B>BUDGET:</B>€101.00k <br> <B>WORKFLOW STATUS:</B> Completed <br> <B>LOCK STATUS:</B>Unlocked <br> <B>MONITOR STATUS:</B>Monitored",
  },

  {
    id: 5,
    group: 12,
    content: "€102.00k",
    start: moment().startOf("day").add(2, "days"),
    end: moment().startOf("day").add(3, "days"),
    title:
      "<B>CAMPAIGN:</B> PRODUCT QA-2 <br> <B>BUDGET:</B>€102.00k <br> <B>WORKFLOW STATUS:</B> Completed <br> <B>LOCK STATUS:</B>Unlocked <br> <B>MONITOR STATUS:</B>Monitored",
  },

  {
    id: 6,
    group: 13,
    content: "€103.00k",
    start: moment().startOf("day").add(2, "days"),
    end: moment().startOf("day").add(4, "days"),
    title:
      "<B>CAMPAIGN:</B> FLIGHTS 1 <br> <B>BUDGET:</B>€103.00k <br> <B>WORKFLOW STATUS:</B> Completed <br> <B>LOCK STATUS:</B>Unlocked <br> <B>MONITOR STATUS:</B>Monitored",
  },

  {
    id: 7,
    group: 14,
    content: "€104.00k",
    start: moment().startOf("day"),
    end: moment().startOf("day").add(2, "days"),
    title:
      "<B>CAMPAIGN:</B> TEST AK-1 <br> <B>BUDGET:</B>€104.00k <br> <B>WORKFLOW STATUS:</B> Completed <br> <B>LOCK STATUS:</B>Unlocked <br> <B>MONITOR STATUS:</B>Monitored",
  },

  {
    id: 8,
    group: 15,
    content: "€105.00k",
    start: moment().startOf("day").add(1, "days"),
    end: moment().startOf("day").add(2, "days"),
    title:
      "<B>CAMPAIGN:</B> TEST AK-2 <br> <B>BUDGET:</B>€105.00k <br> <B>WORKFLOW STATUS:</B> Completed <br> <B>LOCK STATUS:</B>Unlocked <br> <B>MONITOR STATUS:</B>Monitored",
  },
];

const QWS = () => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (event, content) => {
    setTooltipContent(content);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <div className="timeline">
      <Timeline
        options={options}
        items={items}
        groups={groups}
        // Add event listeners for tooltip
        clickHandler={(event) =>
          handleMouseEnter(event, "Click tooltip content")
        }
        onMouseOver={(event, properties) => {
          const hoveredItemId = properties.item;
          const hoveredItem = items.find((item) => item.id === hoveredItemId);
          if (hoveredItem) {
            const { title } = hoveredItem;
            handleMouseEnter(event, title);
          }
        }}
        onMouseOut={handleMouseLeave}
      />
      {/* Render the tooltip */}
      {tooltipContent && (
        <div
          className="tooltip"
          style={{
            position: "fixed",
            top: tooltipPosition.y + 10,
            left: tooltipPosition.x + 10,
            pointerEvents: "none",
            zIndex: 9999,
            backgroundColor: "#fff",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <div>{tooltipContent}</div>
        </div>
      )}
    </div>
  );
};

// render(<QWS />, document.getElementById("root"));

export default QWS;
