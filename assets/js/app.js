// regex for validation
const strRegex = /^[a-zA-Z\s]*$/; // containing only letters
const numRegex = /^[0-9\s]*$/; // containing only numbers
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{2,4}[)]?[-\s\.]?[0-9]{3,5}[-\s\.]?[0-9]{4,6}$/im;
/* supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725 */
const digitRegex = /^\d+$/;

const mainForm = document.getElementById('cv-form');
const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    DIGIT: 'digit',
    PHONENO: 'phoneno',
    ANY: 'any',
    NUMBER: 'number',
}

// user inputs elements
let firstnameElem = mainForm.firstname,
    middlenameElem = mainForm.middlename,
    lastnameElem = mainForm.lastname,
    imageElem = mainForm.image,
    designationElem = mainForm.designation,
    addressElem = mainForm.address,
    emailElem = mainForm.email,
    phonenoElem = mainForm.phoneno,
    pincodeElem = mainForm.pincode
    summaryElem = mainForm.summary;

// display elements
let nameDsp = document.getElementById('fullname_dsp'),
    imageDsp = document.getElementById('image_dsp'),
    phonenoDsp = document.getElementById('phoneno_dsp'),
    emailDsp = document.getElementById('email_dsp'),
    addressDsp = document.getElementById('address_dsp'),
    designationDsp = document.getElementById('designation_dsp'),
    summaryDsp = document.getElementById('summary_dsp'),
    pincodeDsp = document.getElementById('pincode_dsp'),
    experiencesDsp = document.getElementById('experiences_dsp'),
    educationsDsp = document.getElementById('educations_dsp'),
    projectsDsp = document.getElementById('projects_dsp'),
    skillsDsp = document.getElementById('skills_dsp'),
    achievementsDsp = document.getElementById('achievements_dsp');

// first value is for the attributes and second one passes the nodelists
const fetchValues = (attrs, ...nodeLists) => {
    let elemsAttrsCount = nodeLists.length;
    let elemsDataCount = nodeLists[0].length;
    let tempDataArr = [];

    // first loop deals with the no of repeaters value
    for(let i = 0; i < elemsDataCount; i++){
        let dataObj = {}; // creating an empty object to fill the data
        // second loop fetches the data for each repeaters value or attributes 
        for(let j = 0; j < elemsAttrsCount; j++){
            // setting the key name for the object and fill it with data
            dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }

    return tempDataArr;
}

const getUserInputs = () => {

    // experiences
    let expRoleElem = document.querySelectorAll('.exp_role'),
    expCompanyElem = document.querySelectorAll('.exp_company'),
    expCityElem = document.querySelectorAll('.exp_city'),
    expStartDateElem = document.querySelectorAll('.exp_start_date'),
    expEndDateElem = document.querySelectorAll('.exp_end_date'),
    expDescriptionElem = document.querySelectorAll('.exp_description');

    // education
    let eduDegreeElem = document.querySelectorAll('.edu_degree'),
    eduSchoolElem = document.querySelectorAll('.edu_school'),
    eduCityElem = document.querySelectorAll('.edu_city'),
    eduStartDateElem = document.querySelectorAll('.edu_start_date'),
    eduEndDateElem = document.querySelectorAll('.edu_end_date'),
    eduDescriptionElem = document.querySelectorAll('.edu_description');

    // projects
    let projTitleElem = document.querySelectorAll('.proj_title'),
    projLinkElem = document.querySelectorAll('.proj_link'),
    projDescriptionElem = document.querySelectorAll('.proj_description');

    // skills
    let skillElem = document.querySelectorAll('.skill');

    // achivements 
    let achievementsTitleElem = document.querySelectorAll('.achieve_title'),
    achievementsDescriptionElem = document.querySelectorAll('.achieve_description');

    // event listeners for form validation
    firstnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'First Name'));
    middlenameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT_EMP, 'Middle Name'));
    lastnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Last Name'));
    phonenoElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.PHONENO, 'Phone Number'));
    emailElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.EMAIL, 'Email'));
    addressElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Address'));
    designationElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Designation'));
    pincodeElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.DIGIT, 'Pincode'));
    //summaryElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Summary'));

    expRoleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Role')));
    expCompanyElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Company')));
    expCityElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, "City")));
    expStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Start Date')));
    expEndDateElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    expDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    eduDegreeElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Degree')));
    eduSchoolElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'School')));
    eduCityElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'City')));
    eduStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Start Date')));
    eduEndDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    eduDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    projTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    projLinkElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Link')));
    projDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    skillElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'skill')));
    achievementsTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    achievementsDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));

    return {
        firstname: firstnameElem.value,
        middlename: middlenameElem.value,
        lastname: lastnameElem.value,
        designation: designationElem.value,
        address: addressElem.value,
        email: emailElem.value,
        phoneno: phonenoElem.value,
        summary: summaryElem.value,
        pincode: pincodeElem.value,
        experiences: fetchValues(['exp_role', 'exp_company', 'exp_city', 'exp_start_date', 'exp_end_date', 'exp_description'], expRoleElem, expCompanyElem, expCityElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues(['edu_degree', 'edu_school', 'edu_city', 'edu_start_date', 'edu_end_date', 'edu_description'], eduDegreeElem, eduSchoolElem, eduCityElem, eduStartDateElem, eduEndDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem),
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem)
    }
};

function validateFormData(elem, elemType, elemName){
    // checking for text string and non empty string
    if(elemType == validType.TEXT){
        if(!strRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for number and non empty string
    if(elemType == validType.NUMBER){
        if(!numRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for digits
    if(elemType == validType.NUMBER){
        if(!digitRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for only text string
    if(elemType == validType.TEXT_EMP){
        if(!strRegex.test(elem.value)) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for email
    if(elemType == validType.EMAIL){
        if(!emailRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for phone number
    if(elemType == validType.PHONENO){
        if(!phoneRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }

    // checking for only empty
    if(elemType == validType.ANY){
        if(elem.value.trim().length == 0) addErrMsg(elem, elemName);
        else removeErrMsg(elem);
    }
}

// adding the invalid text
function addErrMsg(formElem, formElemName){
    formElem.nextElementSibling.innerHTML = `${formElemName} is invalid`;
}

// removing the invalid text 
function removeErrMsg(formElem){
    formElem.nextElementSibling.innerHTML = "";
}

// show the list data
const showListData = (listData, listContainer) => {
    listContainer.innerHTML = "";
    listData.forEach(listItem => {
        let itemElem = document.createElement('div');
        itemElem.classList.add('preview-item');
        
        for(const key in listItem){
            let subItemElem = document.createElement('span');
            subItemElem.classList.add('preview-item-val');
            subItemElem.innerHTML = `${listItem[key]}`;
            itemElem.appendChild(subItemElem);
        }

        listContainer.appendChild(itemElem);
    })
}

const displayCV = (userData) => {
    nameDsp.innerHTML = userData.firstname + " " + userData.middlename + " " + userData.lastname;
    phonenoDsp.innerHTML = userData.phoneno;
    emailDsp.innerHTML = userData.email;
    addressDsp.innerHTML = userData.address;
    designationDsp.innerHTML = userData.designation;
    summaryDsp.innerHTML = userData.summary;
    pincodeDsp.innerHTML = userData.pincode;
    showListData(userData.experiences, experiencesDsp);
    showListData(userData.educations, educationsDsp);
    showListData(userData.projects, projectsDsp);
    showListData(userData.skills, skillsDsp);
    showListData(userData.achievements, achievementsDsp);
}

// generate CV
const generateCV = () => {
    let userData = getUserInputs();
    displayCV(userData);
    console.log(userData);
}

function previewImage(){
    let oFReader = new FileReader();
    oFReader.readAsDataURL(imageElem.files[0]);
    oFReader.onload = function(ofEvent){
        imageDsp.src = ofEvent.target.result;
    }
}

// print CV
function printCV(){
    window.print();
}
