import { papaParseCsvString } from '@/util/file';
import { SizeData } from './SizeData';
import { ProFormaData } from './ProFormaData';
import { CostBenefitData } from './CostBenefitData';
import { BeforeAndAfterMonthlyBillData } from './BeforeAndAfterMonthlyBillData';
import { DeferralData } from './DeferralData';
import { LoadCoverageProbabilityData } from './LoadCoverageProbabilityData';
import { PeakLoadDayData } from './PeakLoadDayData';

export class ResultsData {
  constructor(id, data) {
    this.id = id;

    // RAW DATA - these will NEVER be NULL
    this.size = this.initializeSize(data.size);
    this.dispatch = data.timeSeries; // TODO
    this.proForma = this.initializeProForma(data.proForma);
    this.costBenefit = this.initializeCostBenefit(data.costBenefit);

    // RAW DATA - these MIGHT not be NULL
    this.beforeAfterMonthlyEnergyBill = this.initializeBeforeAfterMonthly(data.simpleMonthlyBill);
    this.peakLoadDay = this.initializePeakLoadDay(data.peakLoadDay);
    this.deferral = this.initializeDeferral(data.deferral);
    this.loadCoverageProbability = this.initializeLoadCoverageProb(data.loadCoverageProbability);
    this.outageContribution = data.outageContribution; // TODO

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
    this.dispatchSummaryMap = null;
    this.dispatchStackedLineChart = null;
    this.dispatchEnergyPriceMap = null;
    this.designSummaryBarChart = null;
    this.designSizeResultsTable = null;
    this.designCostsTable = null;
    this.reliabilityOutageContributionBarChart = null;
    this.reliabilityLoadCoverageLineChart = null;
    this.deferralStackedBarChart = null;

    this.createCharts();
  }
  initializeSize(csvString) {
    const papaParseObject = papaParseCsvString(csvString);
    const data = new SizeData(papaParseObject.data);
    return data;
  }
  initializeProForma(csvString) {
    const papaParseObject = papaParseCsvString(csvString);
    const data = new ProFormaData(papaParseObject.data);
    return data;
  }
  initializeCostBenefit(csvString) {
    const papaParseObject = papaParseCsvString(csvString);
    const data = new CostBenefitData(papaParseObject.data);
    return data;
  }
  initializeBeforeAfterMonthly(csvString) {
    const papaParseObject = papaParseCsvString(csvString);
    this.showBeforeAfterMonthlyEnergyBill = papaParseObject === null;
    if (this.showBeforeAfterMonthlyEnergyBill) {
      return null;
    }
    const data = new BeforeAndAfterMonthlyBillData(papaParseObject.data);
    return data;
  }
  initializePeakLoadDay(csvString) {
    const papaParseObject = papaParseCsvString(csvString);
    this.showPeakLoadDay = papaParseObject === null;
    if (this.showPeakLoadDay) {
      return null;
    }
    const data = new PeakLoadDayData(papaParseObject.data);
    return data;
  }
  initializeDeferral(csvString) {
    const papaParseObject = papaParseCsvString(csvString);
    this.showDeferral = papaParseObject === null;
    if (this.showDeferral) {
      return null;
    }
    const data = new DeferralData(papaParseObject.data);
    return data;
  }
  initializeLoadCoverageProb(csvString) {
    const papaParseObject = papaParseCsvString(csvString);
    this.showLoadCoverageProbability = papaParseObject === null;
    if (this.showLoadCoverageProbability) {
      return null;
    }
    const data = new LoadCoverageProbabilityData(papaParseObject.data);
    return data;
  }
  createCharts() {
    // summary page charts
    this.financialSummaryBarChart = this.costBenefit.summaryData();
    // TODO this.dispatchSummaryMap = null; this depends on dispatch data
    if (this.showPeakLoadDay) {
      this.designSummaryBarChart = this.peakLoadDay.getFirstYearChartData();
    }

    // dispatch page charts
    // TODO this.dispatchStackedLineChart = null; this depends on dispatch data
    // TODO this.dispatchEnergyPriceMap = null; this depends on dispatch data

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
      // TODO this.reliabilityOutageContributionBarChart = null;
    }
    if (this.showLoadCoverageProbability) {
      this.reliabilityLoadCoverageLineChart = this.loadCoverageProbability.getFirstYearChartData();
    }

    // deferral chart
    if (this.showDeferral) {
      this.deferralStackedBarChart = this.deferral.createBarChart();
    }
  }
  getDeferralVueObjects() {
    return {
      ...this.size.findEssSize(),
      ...this.deferralStackedBarChart,
    };
  }
  getDesignVueObjects() {
    return {
      sizeTable: this.designSizeResultsTable,
      costsTable: this.designCostsTable,
    };
  }
  getDispatchVueObjects() {
    return {
      stackedLineChart: this.dispatchStackedLineChart,
      energyPriceMap: this.dispatchEnergyPriceMap,
    };
  }
  getFinancialVueObjects() {
    return {
      costBenefit: this.financialCostBenefitBarChart,
      proForma: this.financialProformaTable,
      monthlyData: this.financialBeforeAfterBarChart,
      showMonthlyData: this.showBeforeAfterMonthlyEnergyBill,
    };
  }
  getReliabilityVueObjects() {
    return {
      loadCoverageProbability: this.reliabilityLoadCoverageLineChart,
      outageContribution: this.reliabilityOutageContributionBarChart,
      showLoadCoverageProbability: this.showLoadCoverageProbability,
      showOutageContribution: this.showOutageContribution,
    };
  }
  getSummaryVueObjects() {
    return {
      financial: this.financialSummaryBarChart,
      dispatch: this.dispatchSummaryMap,
      design: this.designSummaryBarChart,
      showReliability: this.showLoadCoverageProbability,
      showDeferral: this.showDeferral,
      showDesign: this.showPeakLoadDay,
    };
  }
}

export default ResultsData;
