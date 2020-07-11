import dom from 'xmldom';
import { getSecurities, getTransactions } from './lib';

export default portfolioPerformanceXMLString => {
  const doc = new dom.DOMParser().parseFromString(
    portfolioPerformanceXMLString
  );
  const securities = getSecurities(doc);
  const transactions = getTransactions(doc, securities);

  return {
    securities,
    transactions,
  };
};
