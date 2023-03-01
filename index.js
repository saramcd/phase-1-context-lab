const createEmployeeRecord = (employeeRecord) => {
  const employeeRecordObj = {
    firstName: employeeRecord[0],
    familyName: employeeRecord[1],
    title: employeeRecord[2],
    payPerHour: employeeRecord[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employeeRecordObj;
};

const createEmployeeRecords = (employeeRecords) => {
  const createdEployeeRecords = employeeRecords.map((record) =>
    createEmployeeRecord(record)
  );
  return createdEployeeRecords;
};

const createTimeInEvent = function (dateStamp) {
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(dateStamp.slice(11)),
    date: dateStamp.slice(0, 10),
  });

  return this;
};

const createTimeOutEvent = function (dateStamp) {
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateStamp.slice(11)),
    date: dateStamp.slice(0, 10),
  });

  return this;
};

const hoursWorkedOnDate = function (dateString) {
  const inEvent = this.timeInEvents.find(function (e) {
    return e.date === dateString;
  });

  const outEvent = this.timeOutEvents.find(function (e) {
    return e.date === dateString;
  });

  return (outEvent.hour - inEvent.hour) / 100;
};

const wagesEarnedOnDate = function (dateString) {
  const wages = hoursWorkedOnDate.call(this, dateString) * this.payPerHour;
  return wages;
};

const findEmployeeByFirstName = function (srcArray, firstName) {
  return srcArray.find((record) => record.firstName === firstName);
};

const calculatePayroll = function (employeeRecordsArray) {
  return employeeRecordsArray.reduce(
    (total, record) => total + allWagesFor.call(record),
    0
  );
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};
