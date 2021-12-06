export const formatSingleCompany = (allData) => {
  let data = {
    name: allData[0].data?.name || "N/A",
    marketCap: allData[0].data?.marketCapitalization || "N/A",
    industry: allData[0].data?.finnhubIndustry || "N/A",
    country:
      allData[1].data?.assetProfile?.country ||
      allData[0].data?.country ||
      "N/A",
    description: allData[1].data?.assetProfile?.longBusinessSummary || "N/A",
    earningsCurrency: allData[1].data?.earnings?.financialCurrency,
    earningsYearly: allData[1].data?.earnings?.financialsChart?.yearly,
    earningsQuarterly: allData[1].data?.earnings?.financialsChart?.quarterly,
    earnings: allData[1].data?.earnings?.earningsChart,
    currentPrice: allData[2].data?.quotes?.quote?.last,
    priceCurrency: allData[1].data?.financialData?.financialCurrency || "N/A",
    recommendationKey:
      allData[1].data?.financialData?.recommendationKey || "N/A",
    recommendationMean:
      allData[1].data?.financialData?.recommendationMean?.raw || "N/A",
    targetHighPrice:
      allData[1].data?.financialData?.targetHighPrice?.raw || "N/A",
    targetLowPrice:
      allData[1].data?.financialData?.targetLowPrice?.raw || "N/A",
    targetMeanPrice:
      allData[1].data?.financialData?.targetMeanPrice?.raw || "N/A",
    numberOfAnalyses:
      allData[1].data?.financialData?.numberOfAnalystOpinions?.raw || "N/A",
    roa: allData[1].data?.financialData?.returnOnAssets?.raw * 100 || "N/A",
    roe: allData[1].data?.financialData?.returnOnEquity?.raw * 100 || "N/A",
    debtToEquity: allData[1].data?.financialData?.debtToEquity?.raw || "N/A",
  };

  const name =
    data.name.split(" ").length > 2
      ? data.name
          .split(" ")
          .filter((word, i, arr) => i < 2)
          .join(" ")
      : data.name;
  data.name = name;
  // data.name = name.length < 15 ? name : name.slice(0, 15) + "...";

  const formatMarketCap = (marketCap) => {
    const length = `${parseInt(marketCap)}`.length;
    if (length >= 7) {
      return `${(marketCap / 10 ** 6).toFixed(2)}T`;
    } else if (length >= 4) {
      return `${(marketCap / 10 ** 3).toFixed(2)}B`;
    } else return `${marketCap}M`;
  };
  data.marketCap = formatMarketCap(data.marketCap);

  data.priceCurrency = data.currentPrice ? "USD" : allData[0].data?.currency;
  data.currentPrice =
    data.currentPrice || allData[1].data?.financialData?.currentPrice.raw;
  const eps =
    allData[1].data.earnings?.earningsChart?.quarterly?.reduce(
      (epsTtm, quarter) => {
        return (epsTtm = epsTtm + quarter?.actual?.raw);
      },
      0
    ) || "N/A";
  data.eps = eps;

  const priceToEarnings =
    parseFloat(
      (allData[1]?.data?.financialData?.currentPrice?.raw / eps).toFixed(2)
    ) || "N/A";

  data.pe =
    priceToEarnings === "N/A"
      ? "N/A"
      : priceToEarnings === Infinity
      ? "N/A"
      : priceToEarnings < 0
      ? "<0"
      : priceToEarnings;

  data.recommendationKey =
    data.recommendationMean === "N/A"
      ? "N/A"
      : data.recommendationMean <= 2
      ? "Strong Buy"
      : data.recommendationMean < 3
      ? "Buy"
      : data.recommendationMean < 4
      ? "Hold"
      : "Sell";

  return data;
};
