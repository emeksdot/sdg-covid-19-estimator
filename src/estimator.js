const covid19ImpactEstimator = (data) => {
  const {
    region, periodType, timeToElapse, reportedCases, totalHospitalBeds
  } = data;
  const { avgDailyIncomeInUSD: InUSD, avgDailyIncomePopulation: incomePop } = region;
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

  const impactDays = (period) => {
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

  const severeImpactDays = (period) => {
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

  // Calculations for Impact object
  const impact = {};
  impact.currentlyInfected = impactCurrentlyInfected;
  impact.infectionsByRequestedTime = impactEstimateOfInfected(periodType);
  const impEst = Math.round(0.15 * impact.infectionsByRequestedTime);
  impact.severeCasesByRequestedTime = impEst;
  impact.hospitalBedsByRequestedTime = Math.round(0.35 * totalHospitalBeds) - impEst;
  const impICU = Math.round(0.05 * impact.infectionsByRequestedTime);
  impact.casesForICUByRequestedTime = impICU;
  const impForVentilator = Math.round(0.02 * impact.severeCasesByRequestedTime);
  impact.casesForVentilatorsByRequestedTime = impForVentilator;
  const incomeAndEarnersImp = incomePop * InUSD * impactDays(periodType);
  impact.dollarsInFlight = impact.infectionsByRequestedTime * incomeAndEarnersImp;
  // Calculations for SevereImpact object
  const severeImpact = {};
  severeImpact.currentlyInfected = severeImpactCurrentlyInfected;
  severeImpact.infectionsByRequestedTime = severeEstimateOfInfected(periodType);
  const sevEst = Math.round(0.15 * severeImpact.infectionsByRequestedTime);
  severeImpact.severeCasesByRequestedTime = sevEst;
  const rem = Math.round(0.35 * totalHospitalBeds);
  severeImpact.hospitalBedsByRequestedTime = rem - severeImpact.severeCasesByRequestedTime;
  const sevICU = Math.round(0.05 * severeImpact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime = sevICU;
  const sevForVentilator = Math.round(
    0.02 * severeImpact.severeCasesByRequestedTime
  );
  severeImpact.casesForVentilatorsByRequestedTime = sevForVentilator;
  const incomeAndEarners = incomePop * InUSD * severeImpactDays(periodType);
  severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime * incomeAndEarners;
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
