import React from "react";

const TradingViewChart = ({ ticker }) => {
  const ref = React.createRef();
  React.useEffect(() => {
    let refValue;

    if (ref.current) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/" +
        "embed-widget-mini-symbol-overview.js";

      script.async = true;
      script.type = "text/javascript";
      script.innerHTML = JSON.stringify({
        symbol: ticker,
        width: "100%",
        height: "100%",
        locale: "en",
        dateRange: "60M",
        colorTheme: "dark",
        trendLineColor: "rgba(41, 98, 255, 1)",
        underLineColor: "rgba(41, 98, 255, 0.3)",
        underLineBottomColor: "rgba(41, 98, 255, 0)",
        isTransparent: true,
        autosize: true,
        largeChartUrl: "",
      });

      ref.current.appendChild(script);
      refValue = ref.current;
    }

    return () => {
      if (refValue) {
        while (refValue.firstChild) {
          refValue.removeChild(refValue.firstChild);
        }
      }
    };
  }, [ticker]);

  return <div ref={ref} className='chart' />;
};

export default TradingViewChart;
