// dummyData.js
const getRandomAmount = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

const getRandomDate = (start, end) => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

const dsCodes = ['B860C1D', '219CEE1', 'A123BC4', 'D567EF8', 'G901HI2'];
const dsNames = ['MAHENDRA KUMAR SAINI', 'SUMAN MUKHIJA', 'RAHUL SHARMA', 'PRIYA VERMA', 'ANIL KUMAR'];
const dispatchDetails = ['Courier', 'Bank Transfer', 'UPI', 'Cheque'];
const paymentRemarks = ['Paid', 'Pending', 'Failed', 'Partial'];
const payoutStatus = ['Success', 'Pending', 'Failed'];
const statementStatus = ['Generated', 'Pending', 'Reviewed'];

const generateDummyData = (count = 50) => {
  return Array.from({ length: count }, (_, i) => {
    const totalAmount = getRandomAmount(1000, 10000);
    const tds = getRandomAmount(0, 1000);
    const dataMaintenanceCharges = getRandomAmount(0, 500);
    const netAmount = (totalAmount - tds - dataMaintenanceCharges).toFixed(2);

    return {
      sno: i + 1,
      dsCode: dsCodes[Math.floor(Math.random() * dsCodes.length)],
      dsName: dsNames[Math.floor(Math.random() * dsNames.length)],
      totalAmount,
      payDate: getRandomDate(new Date(2023, 0, 1), new Date()),
      tds,
      dataMaintenanceCharges,
      netAmount,
      dispatchDetail: dispatchDetails[Math.floor(Math.random() * dispatchDetails.length)],
      paymentRemark: paymentRemarks[Math.floor(Math.random() * paymentRemarks.length)],
      payout: payoutStatus[Math.floor(Math.random() * payoutStatus.length)],
      statement: statementStatus[Math.floor(Math.random() * statementStatus.length)],
    };
  });
};

export default generateDummyData;
