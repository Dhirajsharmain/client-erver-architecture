let isUpdate = false;
let employeePayrollObj = {};

/**
 * validation for name in frontend
 */
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            setTextValues('.text-error', "");
            return;
        }
        try {
            checkName(name.value);
            setTextValues('.text-error', "");
        } catch (e) {
            setTextValues('.text-error', e);
        }
    });


    const date = document.querySelector('#date');
    date.addEventListener('input', function () {
        const startDate = new Date(Date.parse(getInputValueById('#day') + " " +
            getInputValueById('#month') + " " + getInputValueById('#year')));
        try {
            checkStartDate(new Date(Date.parse(startDate)));
            setTextValues('.date-error', "");
        } catch (e) {
            setTextValues('.date-error', e);
        }
    })

    const salary = document.querySelector("#salary");
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });

    checkForUpdate();
})


/**
 * Main method that invoked by submit button
 * @returns 
 */
function save(event) {
    event.preventDefault;
    event.stopPropagation;
    try {
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    } catch (e) {
        console.log(e);
        return;
    }
}

/**
 * Method for storing employee payroll data to local storage 
 * @param {*} employeePayrollData : employee payroll data
 */
function createAndUpdateStorage() {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList) {
        let empPayrollData = employeePayrollList.
        find(empData => empData.id == employeePayrollObj.id);

        if (!empPayrollData) {
            employeePayrollList.push(employeePayrollObj);
        } else {
            const index = employeePayrollList
                .map(empData => empData.id)
                .indexOf(empPayrollData.id);
            employeePayrollList.splice(index, 1, employeePayrollObj);
        }

    } else {
        employeePayrollList = [employeePayrollObj]
    }

    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
}

/**
 * 
 * @returns Method for creating employee payroll data object.
 */
const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    } catch (e) {
        setTextalue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.notes = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollData.startDate = Date.parse(date);
    employeePayrollData.id = new Date().getTime()
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

/**
 * Helper Method 
 * @param {*} propertyValue 
 * @returns 
 */
const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach(item => {
        if (item.checked) setItems.push(item.value);
    });
    return setItems;
}


/**
 * Helper Method
 * @param {*} id 
 * @returns 
 */
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}


/**
 * Helper Method 
 * @param {*} id 
 * @returns 
 */
const getInputValueByValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}


/**
 * Method for reseting the form values
 */
const resetForm = () => {
    setValues('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValues('#salary', '');
    setValues('#notes', '');
    setSelectedIndex('#day', '0');
    setSelectedIndex('#month', '0');
    setSelectedIndex('#year', '0');
}

/**
 * Helper method for reset form
 * @param {*} propertyValue 
 */
const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

/**
 * Helper method for reset form
 * @param {*} id 
 * @param {*} value 
 */
const setValues = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

/**
 * Helper method for reset form
 * @param {*} id 
 * @param {*} value 
 */
const setTextValues = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}

const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}


/**
 * Main method for setting the data into form
 */
const setForm = () => {
    setValues('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValues('#salary', employeePayrollObj._salary);
    setTextValues('.salary-output', employeePayrollObj._salary);
    setValues('#notes', employeePayrollObj._notes);
    let date = getstringifyDate(employeePayrollObj._startDate).split("  ");
    setValues('#day', date[0]);
    setValues('#month', date[1]);
    setValues('#year', date[2]);
}


/**
 * Helper methof for setting select value into form
 * @param {*} propertyValues 
 * @param {*} value 
 */
const setSelectedValues = (propertyValues, value) => {
    let allItems = document.querySelectorAll(propertyValues);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        } else if (item.value === value)
            item.checked = true;
    })
}

/**
 * UC9 - creating employee payroll data json object 
 */
const setEmployeePayrollObject = () => {
    if (!isUpdate && site_properties.use_local_storage.match("true")) {
        employeePayrollObj.id = createNewEmployeeId();
    }
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._notes = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollObj._startDate = date;
}

/**
 * Creating Id for data to store into local storage
 * @returns 
 */
const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID) + 1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID
}