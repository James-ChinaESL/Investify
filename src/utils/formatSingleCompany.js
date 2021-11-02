export const formatSingleCompany = (allData) => {
  let data = {
    name: allData[0].data.name,
    logo: allData[0].data.logo,
    marketCap: allData[0].data.marketCapitalization,
    url: allData[0].data.weburl,
    industry: allData[1].data.assetProfile.industry,
    country: allData[1].data.assetProfile.country,
    description: allData[1].data.assetProfile.longBusinessSummary,
    earningsCurrency: allData[1].data.earnings.financialCurrency,
    earningsYearly: allData[1].data.earnings.financialsChart.yearly,
    earningsQuarterly: allData[1].data.earnings.financialsChart.quarterly,
    earnings: allData[1].data.earnings.earningsChart,
    currentQuarterEstimate:
      allData[1].data.earnings.earningsChart.currentQuarterEstimate.raw,
    currentQuarterEstimateDate:
      allData[1].data.earnings.earningsChart.currentQuarterEstimateDate,
    currentQuarterEstimateYear:
      allData[1].data.earnings.earningsChart.currentQuarterEstimateYear,
    currentPrice: parseFloat(
      allData[1].data.financialData.currentPrice?.raw,
      2
    ),
    priceCurrency: allData[1].data.financialData.financialCurrency,
    recommendationKey: allData[1].data.financialData.recommendationKey,
    recommendationMean: allData[1].data.financialData.recommendationMean.raw,
    targetHighPrice: allData[1].data.financialData.targetHighPrice.raw,
    targetLowPrice: allData[1].data.financialData.targetLowPrice.raw,
    targetMeanPrice: allData[1].data.financialData.targetMeanPrice.raw,
    numberOfAnalyses: allData[1].data.financialData.numberOfAnalystOpinions.raw,
    roa: allData[1].data.financialData.returnOnAssets.raw * 100,
    roe: allData[1].data.financialData.returnOnEquity.raw * 100,
    debtToEquity: allData[1].data.financialData.debtToEquity.raw,
  };
  const formatMarketCap = (marketCap) => {
    const length = `${parseInt(marketCap)}`.length;
    if (length >= 7) {
      return `${(marketCap / 10 ** 6).toFixed(2)}T`;
    } else if (length >= 4) {
      return `${(marketCap / 10 ** 3).toFixed(2)}B`;
    } else return `${marketCap}M`;
  };
  data.marketCap = formatMarketCap(data.marketCap);

  data.pe = (
    allData[1].data.financialData.currentPrice.raw /
    allData[1].data.earnings.earningsChart.quarterly.reduce(
      (epsTtm, quarter) => {
        return (epsTtm = epsTtm + quarter.actual.raw);
      },
      0
    )
  ).toFixed(2);

  data.recommendationKey =
    data.recommendationMean <= 2
      ? "Strong Buy"
      : data.recommendationMean < 3
      ? "Buy"
      : data.recommendationMean < 4
      ? "Hold"
      : "Sell";

  return data;
};
