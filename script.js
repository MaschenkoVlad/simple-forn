document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");
    const form = document.querySelector(".form");

    const checkLength = (len, selector) => {
        const field = document.querySelector(selector)
        if (field && field.value.length >= len) {
            return true
        }
        return false
    }

    const checkEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const checkPasswordsMatch = (pass, confpass) => {
        if ( pass && confpass ) {
            if (pass.value === confpass.value) {
                return true
            }
        }
        return false
    }

    const handleShowError = (formFields, errors, filed) => {
        const errorTag = document.querySelector(`input#${filed} + .error-msg`);
        const errorMessage = document.createTextNode(errors[filed]);
        const field = formFields.find(({id}) => id === filed);

        errorTag.innerHTML = '';
        field.classList.add("error");
        errorTag.classList.add("show");
        errorTag.appendChild(errorMessage);
    }

    const hideError = (formFields, filed) => {
        const errorTag = document.querySelector(`input#${filed} + .error-msg`);
        const field = formFields.find(({id}) => id === filed);

        field.classList.remove("error");
        errorTag.innerHTML = "";
        errorTag.classList.remove("show");
    }

    function logSubmit(event) {
        event.preventDefault();

        const formFields = [...document.querySelectorAll(".input")];
        const errors = {};
        const result = {};

        for (let i = 0; i < formFields.length; i++) {
            const field = formFields[i];
            const isRequire = field.getAttribute("aria-required");
            const fieldId = field.id;

            switch(fieldId) {
                case "username": {
                    if (isRequire) {
                        const isValid = checkLength(3, '#username');
                        if (!isValid) {
                            errors[fieldId] = "username must be more then 2 letters";
                        } else {
                            errors[fieldId] = undefined;
                        }
                    }
                    result[fieldId] = field.value;
                    break;
                }
                case "email": {
                    if (isRequire) {
                        const isValid = checkEmail(field.value);
                        if (!isValid) {
                            errors[fieldId] = "email pattern is invalid";
                        } else {
                            errors[fieldId] = undefined;
                        }
                    }
                    result[fieldId] = field.value;
                    break;
                }
                case "pass": {
                    if (isRequire) {
                        const isValid = checkLength(6, '#pass');
                        if (!isValid) {
                            errors[fieldId] = "password must be more then 5 letters";
                        } else {
                            errors[fieldId] = undefined;
                        }
                    }
                    result[fieldId] = field.value;
                    break;
                }
                case "confpass": {
                    if (isRequire) {
                        if (!field.value) {
                            errors[fieldId] = "confirm password is empty";
                        } else {
                            const pass = document.querySelector("#pass");
                            const isValid = checkPasswordsMatch(field, pass);
                            if (!isValid) {
                                errors[fieldId] = "Your entered another password";
                            } else {
                                errors[fieldId] = undefined;
                            }
                        }
                    }
                    result[fieldId] = field.value;
                    break;
                }

                default:
                    console.log("Unsupported field");  
            }

        }

        const errorsLen = Object.values(errors).filter(Boolean).length;

        for (let key in errors) {
            if (errors[key]) {
                handleShowError(formFields, errors, key);
            } else {
                hideError(formFields, key);
            }
        }


        const successfulTag = document.querySelector(`.successful`);
        if (errorsLen === 0) {
            successfulTag.classList.add("show");
        } else {
            successfulTag.classList.remove("show");
        }

    }

    form.addEventListener('submit', logSubmit);
  });


