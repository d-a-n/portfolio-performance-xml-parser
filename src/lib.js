import xpath from 'xpath';

const getValue = (node, name) => {
  const field = node.getElementsByTagName(name);

  return field && field.length ? field[0].textContent : null;
};

const getSecurityUuid = (node, securities) => {
  const security = node.getElementsByTagName('security')[0];
  const reference = security.getAttribute('reference');
  const index = (parseInt(reference.replace(/\[(\d+)\]$/, '$1'), 10) || 1) - 1;

  return securities[index].uuid;
};

const getUnit = (node, unit) => {
  const nodes = xpath.select(
    `./units/unit[@type="${unit.toUpperCase()}"]/amount`,
    node
  );
  return nodes && nodes.length
    ? {
        currency: nodes[0].getAttribute('currency'),
        amount: parseInt(nodes[0].getAttribute('amount'), 10) / 100,
      }
    : null;
};

export const getSecurities = doc => {
  const nodes = xpath.select('//securities/security', doc);
  const fields = [
    'uuid',
    'name',
    'currencyCode',
    'note',
    'isin',
    'tickerSymbol',
    'wkn',
  ];

  return nodes.map(node => ({
    ...fields.reduce((prev, field) => {
      const value = getValue(node, field);
      return value ? { ...prev, [field]: value } : prev;
    }, {}),
  }));
};

export const getTransactions = (doc, securities) => {
  const nodes = xpath.select('//transactions/*', doc);
  const fields = ['type', 'currencyCode', 'note'];

  return nodes.map(node => {
    const tax = getUnit(node, 'tax');
    const fee = getUnit(node, 'fee');
    const shares = parseInt(getValue(node, 'shares'), 10) / 1000000;
    const amount = parseInt(getValue(node, 'amount'), 10) / 100;
    const date = new Date(getValue(node, 'date'));

    return {
      security: getSecurityUuid(node, securities),
      ...(tax ? { tax } : {}),
      ...(fee ? { fee } : {}),
      shares,
      amount,
      date,
      ...fields.reduce((prev, field) => {
        const value = getValue(node, field);
        return value ? { ...prev, [field]: value } : prev;
      }, {}),
    };
  });
};
