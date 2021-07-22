let empPayrollList;

window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
})

/**
 * Method read employee payroll data from local storage
 * @returns 
 */
const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ?
        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

/**
 * UC4,5 - Method for manupulating inner html of id table-display 
 */

const createInnerHtml = () => {

    const headerHtml = `
                        <th></th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Start Date</th>
                        <th>Action</th>`;

    if (empPayrollList.length == 0) return;

    let innerHtml = `${headerHtml}`
    for (const empPayrollData of empPayrollList) {
        innerHtml = ` ${innerHtml}
    <tr>
        <td><img class="profile" src="${empPayrollData._profilePic}" alt=""></td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${getDeptHtml(empPayrollData._department)}</td>
        <td>${empPayrollData._salary}</td>
        <td>${getstringifyDate(empPayrollData._startDate)}</td>
        <td>
            <img id="${empPayrollData.id}" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
            <img id="${empPayrollData.id}" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">
        </td>
    </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

/**
 * Helper method for department column
 */
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

const remove = (node) => {
    empPayrollList = empPayrollList.filter(emp => emp.id != node.id);
    storeDataToLocalStorage();
    createInnerHtml();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
}

const storeDataToLocalStorage = () => {
    localStorage.setItem('EmployeePayrollList', JSON.stringify(empPayrollList));
}