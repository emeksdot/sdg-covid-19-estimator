const covid19ImpactEstimator = (data) => {
  const {
     ,
    periodType,
    timeToElapse,
    reportedCases,
     ,
     
  } = data;
  const impactCurrentlyInfected = reportedCases * 10;
  const severeImpactCurrentlyInfected = reportedCases * 50;

  const impactEstimateOfInfected = () => {
    if (periodType === 'days') {
      return impactCurrentlyInfected * 2 ** Math.floor(timeToElapse / 3);
    }
    if (periodType === 'weeks') {
      return impactCurrentlyInfected * 2 ** Math.floor((timeToElapse * 7) / 3);
    }
    if (periodType === 'months') {
      return impactCurrentlyInfected * 2 ** Math.floor((timeToElapse * 30) / 3);
    }
    return 'Invalid time period.';
  };

  const severeEstimateOfInfected = () => {
    if (periodType === 'days') {
      return severeImpactCurrentlyInfected * 2 ** Math.floor(timeToElapse / 3);
    }
    if (periodType === 'weeks') {
      return (
        severeImpactCurrentlyInfected * 2 ** Math.floor((timeToElapse * 7) / 3)
      );
    }
    if (periodType === 'months') {
      return (
        severeImpactCurrentlyInfected * 2 ** Math.floor((timeToElapse * 30) / 3)
      );
    }
    return 'Invalid time period.';
  };

  const impact = {};
  impact.currentlyInfected = impactCurrentlyInfected;
  impact.infectionsByRequestedTime = impactEstimateOfInfected(periodType);
  const severeImpact = {};
  severeImpact.currentlyInfected = severeImpactCurrentlyInfected;
  severeImpact.infectionsByRequestedTime = severeEstimateOfInfected(periodType);

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
