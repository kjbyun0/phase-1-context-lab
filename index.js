/* Your Code Here */

function createEmployeeRecord(arrEmp) {
    const objEmp = {};
    objEmp.firstName = arrEmp[0];
    objEmp.familyName = arrEmp[1];
    objEmp.title = arrEmp[2];
    objEmp.payPerHour = parseInt(arrEmp[3], 10);
    objEmp.timeInEvents = [];
    objEmp.timeOutEvents = [];
    return objEmp;
}

function createEmployeeRecords(arrEmps) {
    return arrEmps.map(createEmployeeRecord);
}

function createTimeInEvent(timeIn) {
    const objTime = {};
    objTime.type = 'TimeIn'
    const arrTime = timeIn.split(' ');
    objTime.date = arrTime[0];
    objTime.hour = parseInt(arrTime[1], 10);
    this.timeInEvents.push(objTime);
    return this;
}

// createTimeOutEvent.call(bpRecord, "2015-02-28 1700")
function createTimeOutEvent(timeOut) {
    const objTime = {};
    objTime.type = 'TimeOut';
    const arrTime = timeOut.split(' ');
    objTime.date = arrTime[0];
    objTime.hour = parseInt(arrTime[1], 10);
    this.timeOutEvents.push(objTime);
    return this;
}

function hoursWorkedOnDate(date) {
    const arrInEvents = this.timeInEvents.filter((timeIn) => timeIn.date === date);
    const arrOutEvents = this.timeOutEvents.filter((timeOut) => timeOut.date === date);

    if (arrInEvents.length !== arrOutEvents.length) 
        return -1;
    return arrInEvents.reduce((totalHours, timeIn, i, arrInEventsCopy) => {
        return totalHours + (arrOutEvents[i].hour - timeIn.hour) / 100;
    }, 0);
}

function wagesEarnedOnDate(date) {
    return this.payPerHour * hoursWorkedOnDate.call(this, date);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// const allWagesFor = function () {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }

function allWagesFor() {
    const dates = this.timeInEvents.map((timeIn) => {
        return timeIn.date;
    });

    return dates.reduce(function (sumWages, timeIn) {
        //console.log(this);
        return sumWages + wagesEarnedOnDate.call(this, timeIn);
    }.bind(this), 0);
}

function findEmployeeByFirstName(arrObjEmps, firstName) {
    return arrObjEmps.find((objEmp, i, arrObjEmpsCopy) => {
        return objEmp.firstName === firstName;
    });
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((payroll, empRec, i, employeeRecordsCopy) => {
        return payroll + allWagesFor.call(empRec);
    }, 0);
}
