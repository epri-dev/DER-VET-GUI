import { papaParseCsvString } from '@/util/file';
import BeforeAndAfterMonthlyBillData from './BeforeAndAfterMonthlyBillData';
import CostBenefitData from './CostBenefitData';
import DeferralData from './DeferralData';
import LoadCoverageProbabilityData from './LoadCoverageProbabilityData';
import OutageEnergyContributionData from './OutageEnergyContributionData';
import PeakLoadDayData from './PeakLoadDayData';
import ProFormaData from './ProFormaData';
import SizeData from './SizeData';
import TimeSeriesData from './TimeSeriesData';

export class ResultsData {
  constructor(id, data) {
    this.id = id;
    // booleans that tell if the raw data are NULL or not
    this.showBeforeAfterMonthlyEnergyBill = false;
    this.showPeakLoadDay = false;
    this.showLoadCoverageProbability = false;
    this.showOutageContribution = false;
    this.showDeferral = false;

    // PLOTS - null if the chart doesnt exist
    this.financialSummaryBarChart = null;
    this.financialCostBenefitBarChart = null;
    this.financialProformaTable = null;
    this.financialBeforeAfterBarChart = null;
    this.dispatchSummaryMapData = null;
    this.dispatchStackedLineChart = null;
    this.dispatchEnergyPriceMapData = null;
    this.designSummaryBarChart = null;
    this.designSizeResultsTable = null;
    this.designCostsTable = null;
    this.reliabilityOutageContributionData = null;
    this.reliabilityLoadCoverageLineChart = null;
    this.deferralStackedBarChart = null;

    // RAW DATA - these will NEVER be NULL
    this.size = this.initializeSize(data.size);
    this.dispatch = this.initializeDistpatch(data.timeSeries);
    this.proForma = this.initializeProForma(data.proForma);
    this.costBenefit = this.initializeCostBenefit(data.costBenefit);

    // RAW DATA - these MIGHT not be NULL
    this.beforeAfterMonthlyEnergyBill = this.initializeBeforeAfterMonthly(data.simpleMonthlyBill);
    this.peakLoadDay = this.initializePeakLoadDay(data.peakLoadDay);
    this.deferral = this.initializeDeferral(data.deferral);
    this.loadCoverageProbability = this.initializeLoadCoverageProb(data.loadCoverageProbability);
    this.outageContribution = this.initializeOutageContribution(data.outageContribution);

    this.createCharts();
  }
  initializeSize(csvString) {
    const papaParsedObject = papaParseCsvString(csvString);
    return new SizeData(papaParsedObject.data);
  }
  initializeProForma(csvString) {
    const papaParsedObject = papaParseCsvString(csvString);
    return new ProFormaData(papaParsedObject.data);
  }
  initializeCostBenefit(csvString) {
    const papaParsedObject = papaParseCsvString(csvString);
    return new CostBenefitData(papaParsedObject.data);
  }
  initializeBeforeAfterMonthly(csvString) {
    const papaParsedObject = papaParseCsvString(csvString);
    this.showBeforeAfterMonthlyEnergyBill = papaParsedObject !== null;
    if (!this.showBeforeAfterMonthlyEnergyBill) {
      return null;
    }
    return new BeforeAndAfterMonthlyBillData(papaParsedObject.data);
  }
  initializePeakLoadDay(csvString) {
    const papaParsedObject = papaParseCsvString(csvString);
    this.showPeakLoadDay = papaParsedObject !== null;
    if (!this.showPeakLoadDay) {
      return null;
    }
    return new PeakLoadDayData(papaParsedObject.data);
  }
  initializeDeferral(csvString) {
    const papaParsedObject = papaParseCsvString(csvString);
    this.showDeferral = papaParsedObject !== null;
    if (!this.showDeferral) {
      return null;
    }
    return new DeferralData(papaParsedObject.data);
  }
  initializeLoadCoverageProb(csvString) {
    const papaParsedObject = papaParseCsvString(csvString);
    this.showLoadCoverageProbability = papaParsedObject !== null;
    if (!this.showLoadCoverageProbability) {
      return null;
    }
    return new LoadCoverageProbabilityData(papaParsedObject.data);
  }
  initializeOutageContribution(csvString) {
    const papaParsedObject = papaParseCsvString(csvString);
    this.showOutageContribution = papaParsedObject !== null;
    if (!this.showOutageContribution) {
      return null;
    }
    const data = new OutageEnergyContributionData(papaParsedObject.data);
    return data;
  }
  initializeDistpatch(csvString) {
    const papaParsedObject = papaParseCsvString(csvString);
    const data = new TimeSeriesData(papaParsedObject.data);
    return data;
  }
  createCharts() {
    // summary page charts
    this.financialSummaryBarChart = this.costBenefit.summaryData();
    this.dispatchSummaryMapData = this.dispatch.essDispatchHeatMapTraceData(0);
    if (this.showPeakLoadDay) {
      this.designSummaryBarChart = this.peakLoadDay.getFirstYearChartData();
    }

    // dispatch page charts
    const totalEnergyStorageCapacity = this.size.getTotalEnergyStorageCapacity();
    this.dispatchStackedLineChart = this.dispatch.dispatchData(0, totalEnergyStorageCapacity);
    this.dispatchEnergyPriceMapData = this.dispatch.energyPriceHeatMapTraceData(0);

    // design page charts
    this.designSizeResultsTable = this.size.createSizeTable();
    this.designCostsTable = this.size.createCostTables();

    // financial charts
    this.financialCostBenefitBarChart = this.costBenefit.createBarChartTraces();
    this.financialProformaTable = this.proForma.createTable();
    if (this.showBeforeAfterMonthlyEnergyBill) {
      this.financialBeforeAfterBarChart = this.beforeAfterMonthlyEnergyBill.getFirstYearChartData();
    }

    // reliability charts
    if (this.showOutageContribution) {
      this.reliabilityOutageContributionData = this.outageContribution.getFirstYearChartData();
    }
    if (this.showLoadCoverageProbability) {
      this.reliabilityLoadCoverageLineChart = this.loadCoverageProbability.getFirstYearChartData();
    }

    // deferral chart
    if (this.showDeferral) {
      this.deferralStackedBarChart = {
        ...this.size.findLargestEssSize(),
        ...this.deferral.createBarChart(),
      };
    }
  }
}

export default ResultsData;
