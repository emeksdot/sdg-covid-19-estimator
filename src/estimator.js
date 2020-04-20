const covid19ImpactEstimator = (data) => {
  const {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds
  } = data;
  const {
    avgDailyIncomeInUSD: inUSD,
    avgDailyIncomePopulation: incomePop
  } = region;
  const impactCurrentlyInfected = reportedCases * 10;
  const severeImpactCurrentlyInfected = reportedCases * 50;

  const impactEstimateOfInfected = (period) => {
    if (period === 'days') {
      return impactCurrentlyInfected * 2 ** Math.floor(timeToElapse / 3);
    }
    if (period === 'weeks') {
      return impactCurrentlyInfected * 2 ** Math.floor((timeToElapse * 7) / 3);
    }
    if (period === 'months') {
      return impactCurrentlyInfected * 2 ** Math.floor((timeToElapse * 30) / 3);
    }
    return 'Invalid time period.';
  };

  const severeEstimateOfInfected = (period) => {
    if (period === 'days') {
      return severeImpactCurrentlyInfected * 2 ** Math.floor(timeToElapse / 3);
    }
    if (period === 'weeks') {
      return (
        severeImpactCurrentlyInfected * 2 ** Math.floor((timeToElapse * 7) / 3)
      );
    }
    if (period === 'months') {
      return (
        severeImpactCurrentlyInfected * 2 ** Math.floor((timeToElapse * 30) / 3)
      );
    }
    return 'Invalid time period.';
  };

  const financialPeriod = (period) => {
    if (period === 'days') {
      return timeToElapse;
    }
    if (period === 'weeks') {
      return timeToElapse * 7;
    }
    if (period === 'months') {
      return timeToElapse * 30;
    }
    return 'Invalid time period.';
  };

  // impact object
  const impact = {};
  impact.currentlyInfected = impactCurrentlyInfected;
  impact.infectionsByRequestedTime = impactEstimateOfInfected(periodType);
  // Challenge 2
  const impEst = Math.round(0.15 * impact.infectionsByRequestedTime);
  impact.severeCasesByRequestedTime = impEst;
  impact.hospitalBedsByRequestedTime = Math.round(0.35 * totalHospitalBeds) - impEst;
  // Challenge 3
  const impactInf5 = Math.round(0.05 * impact.infectionsByRequestedTime);
  impact.casesForICUByRequestedTime = impactInf5;
  const impactInf2 = Math.round(0.02 * impact.infectionsByRequestedTime);
  impact.casesForVentilatorsByRequestedTime = impactInf2;
  // Financial cost of Impact
  impact.dollarsInFlight = impact.infectionsByRequestedTime
    * incomePop
    * inUSD
    * financialPeriod(periodType).toFixed(2);

  // severeImpact object.
  const severeImpact = {};
  severeImpact.currentlyInfected = severeImpactCurrentlyInfected;
  severeImpact.infectionsByRequestedTime = severeEstimateOfInfected(periodType);
  const sevEst = Math.round(0.15 * severeImpact.infectionsByRequestedTime);
  severeImpact.severeCasesByRequestedTime = sevEst;
  const rem = Math.round(0.35 * totalHospitalBeds);
  severeImpact.hospitalBedsByRequestedTime = rem - severeImpact.severeCasesByRequestedTime;
  // Challenge 3
  const severeImpactInf5 = Math.round(
    0.05 * severeImpact.infectionsByRequestedTime
  );
  severeImpact.casesForICUByRequestedTime = severeImpactInf5;
  const severeImpactInf2 = Math.round(
    0.02 * severeImpact.infectionsByRequestedTime
  );
  severeImpact.casesForVentilatorsByRequestedTime = severeImpactInf2;
  // Financial cost for severeImpact
  severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime
    * incomePop
    * inUSD
    * financialPeriod(periodType).toFixed(2);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
