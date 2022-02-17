let dropdownOptions = [];
let allConversionsArray = [];
let urlObject;

addEventListener("load", () => {
    validateAmount();
    initialize_Select_Options_data();
    getAbsoluteRequestURL();
});