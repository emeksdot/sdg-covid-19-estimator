const covid19ImpactEstimator = (data) => {
  const {
    periodType, timeToElapse, reportedCases, totalHospitalBeds
  } = data;
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

  const impact = {};
  impact.currentlyInfected = impactCurrentlyInfected;
  impact.infectionsByRequestedTime = impactEstimateOfInfected(periodType);
  const impEst = Math.round(0.15 * impact.infectionsByRequestedTime);
  impact.severeCasesByRequestedTime = impEst;
  impact.hospitalBedsByRequestedTime = Math.round(0.35 * totalHospitalBeds) - impEst;
  const severeImpact = {};
  severeImpact.currentlyInfected = severeImpactCurrentlyInfected;
  severeImpact.infectionsByRequestedTime = severeEstimateOfInfected(periodType);
  const sevEst = Math.round(0.15 * severeImpact.infectionsByRequestedTime);
  severeImpact.severeCasesByRequestedTime = sevEst;
  const rem = Math.round(0.35 * totalHospitalBeds);
  severeImpact.hospitalBedsByRequestedTime = rem - severeImpact.severeCasesByRequestedTime;

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
