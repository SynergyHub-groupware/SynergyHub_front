import React, { useRef, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { OrgChart } from "d3-org-chart";
import CustomNodeContent from "./customNodeContent";
import CustomExpandButton from "./customExpandButton";

const styles = {
  orgChart: {
    height: "calc(100vh - 60px)",
    backgroundColor: "#eaeaea",
  },
};

const OrganizationalChart = ({ data }) => {
    const d3Container = useRef(null);
  
useEffect(() => {
  if (data && data.length > 0 && d3Container.current) {
    const chart = new OrgChart();
    chart
      .container(d3Container.current)
      .data(data)
      .nodeWidth((d) => 300)
      .nodeHeight((d) => 150)
      .compactMarginBetween((d) => 80)
      .buttonContent(({ node }) =>
        ReactDOMServer.renderToStaticMarkup(<CustomExpandButton node={node} />)
      )
      .nodeContent((d) =>
        ReactDOMServer.renderToStaticMarkup(<CustomNodeContent data={d} />)
      )
      .render();
  }
}, [data]);
  
    return <div ref={d3Container} style={styles.orgChart} />;
  };
  
  export default OrganizationalChart;