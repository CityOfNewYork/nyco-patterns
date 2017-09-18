import {oCharts} from 'o-charts';

const DataPovertyRates = [
  {
    'label': 'NYCgov',
    'color': 'primary-red',
    'type': 'line',
    'data': [
      ['2005', 20.3], ['2006', 20.0], ['2007', 19.8], ['2008', 19.0], ['2009', 19.4],
      ['2010', 20.6], ['2011', 20.8], ['2012', 20.7], ['2013', 20.7], ['2014', 20.6],
      ['2015', 19.9]
    ]
  },
  {
    'label': 'U.S. Official',
    'color': 'primary-blue',
    'type': 'line',
    'data': [
      ['2005', 18.3], ['2006', 17.9], ['2007', 16.7], ['2008', 16.8], ['2009', 17.4],
      ['2010', 18.8], ['2011', 19.2], ['2012', 20.0], ['2013', 19.9], ['2014', 19.1],
      ['2015', 18.4]
    ]
  }
];

const DataThresholdsIncomes = [
  {
    'label': 'NYCgov',
    'color': 'primary-blue',
    'type': 'bar',
    'data': [
      ['Thresholds', 31756], ['Incomes', 31813]
    ]
  },
  {
    'label': 'U.S. Official',
    'color': 'primary-red',
    'type': 'bar',
    'data': [
      ['Thresholds', 24036], ['Incomes', 25128]
    ]
  }
];

const DataEmploymentPopulationRatios = [
  {
    'label': 'NYCgov',
    'color': 'primary-blue',
    'type': 'bar',
    'data': [
      ['2008', 70.8], ['2010', 66.4], ['2011', 67.0], ['2012', 68.0], ['2013', 68.4],
      ['2014', 69.4], ['2015', 70.7]
    ]
  }
];

const DataMarginalEffects = [
  {
    'label': 'NYCgov',
    'color': 'primary-blue',
    'type': 'bar',
    'data': [
      ['Housing Adjustment', -5.8], ['Social Security', -5.0], ['Other Cash Transfers', -3.3],
      ['Income Taxes', -3.9], ['SNAP', -3.2], ['School Meals', -0.7], ['WIC', -0.2],
      ['HEAP', 0.0], ['Childcare', 0.3], ['Payroll Taxes', 2.0], ['Commuting', 2.2],
      ['Medical Expenses', 2.8]
    ]
  }
];

const settings = {
  'margin': [8, 8, 42, 68],
  'padding': [8, 0, 0, 8],
  'height': 404,
  'labels': {
    'axis':{
      'x': 'Year',
      'y': 'Percent of Population'
    }
  },
  'formats': {
    'time': '%Y'
  },
  'domains' : {
    'x0': '',
    'x1': '',
    'y0': '',
    'y1': ''
  },
  'colors': {
    'background': 'base-white',
    'axis': 'base-black',
    'labels': 'base-black'
  }
};

settings.selector = '#chartPovertyRates';
settings.labels = {
  'axis':{
    'x': 'Year',
    'y': 'Percent of Population'
  }
}

// window.oChartInit(settings, dataPovertyRates);
const PovertyRates = new oCharts(settings, DataPovertyRates).init();


// settings.selector = '#chartThresholdsIncomes';
// settings.labels = {
//   'axis':{
//     'x': '',
//     'y': 'Dollars'
//   }
// }

// window.oChartInit(settings, dataThresholdsIncomes);


settings.selector = '#chartEmploymentPopulationRatios';
settings.labels = {
  'axis':{
    'x': 'Year',
    'y': 'Percent of 18 through 64-year-olds'
  }
}

const EmploymentPopulationRatios = new oCharts(settings, DataEmploymentPopulationRatios).init();

// window.oChartInit(settings, dataEmploymentPopulationRatios);


// settings.selector = '#chartMarginalEffects';
// settings.labels = {
//   'axis':{
//     'x': 'Transfers',
//     'y': 'Percent'
//   }
// }

// window.oChartInit(settings, dataMarginalEffects);