import React, { useState } from "react";
import DcaForm from "../../components/DcaForm";
import DcaResults from "../../components/DcaResults";

const DateCalculator = () => {
  const [isResultDataLoaded, setIsResultDataLoaded] = useState(false);
  const [results, setResults] = useState([]);

  return (
    <div>
      {isResultDataLoaded ? (
        <DcaResults
          startDate={results.startDate}
          totalUsdAmount={results.totalUsdAmount}
          dcaChartData={results.dcaChartData}
          dcaAmount={results.dcaAmount}
          frequency={results.frequency}
          targetAmount={results.targetAmount}
          coin={results.coin}
        />
      ) : (
        <DcaForm
          setResults={setResults}
          setIsResultDataLoaded={setIsResultDataLoaded}
        />
      )}
    </div>
  );
};

export default DateCalculator;
