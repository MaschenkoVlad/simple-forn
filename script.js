document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    const form = document.querySelector(".form");

    const checkLength = (len, selector) => {
        const field = document.querySelector(selector)
        if (field && field.value.length > len) {
            return true
        }
        return false
    }

    const checkEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const checkPasswordsMatch = (pass, confpass) => {
        if ( pass && confpass ) {
            if (pass.value === confpass.value) {
                return true
            }
        }
        return false
    }

    const handleShowError = (errorText, selector) => {
        const errorMessage = document.querySelector(selector);
        errorMessage.classList.add("show");
        const text = document.createTextNode(errorText);
        errorMessage.appendChild(text);
    }

    const hideError = (selector) => {
        const errorMessage = document.querySelector(selector);
        errorMessage.innerHTML = "";
        errorMessage.classList.remove("show");
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
                            errors[fieldId] = true;
                        } else {
                            errors[fieldId] = false;
                        }
                    }
                    result[fieldId] = field.value;
                    break;
                }
                case "email": {
                    if (isRequire) {
                        const isValid = checkEmail(field.value);
                        if (!isValid) {
                            errors[fieldId] = true;
                        } else {
                            errors[fieldId] = false;
                        }
                    }
                    result[fieldId] = field.value;
                    break;
                }
                case "pass": {
                    if (isRequire) {
                        const isValid = checkLength(6, '#pass');
                        if (!isValid) {
                            errors[fieldId] = true;
                        } else {
                            errors[fieldId] = false;
                        }
                    }
                    result[fieldId] = field.value;
                    break;
                }
                case "confpass": {
                    if (isRequire) {
                        if (!field.value) {
                            errors[fieldId] = true;
                        } else {
                            const pass = document.querySelector("#pass"); // !!!
                            const isValid = checkPasswordsMatch(field, pass);
                            if (!isValid) {
                                errors[fieldId] = true;
                            } else {
                                errors[fieldId] = false;
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

        if (Object.keys(errors).length !== 0) {
            for (let key in errors) {
                const field = formFields.find(el => el.id === key);
                if (errors[key]) {
                    field.classList.add("error");
                    handleShowError("Error", `#${key} + .error-msg`);
                } else {
                    field.classList.remove("error");
                    hideError(`#${key} + .error-msg`);
                }
            }
        }

    }

    form.addEventListener('submit', logSubmit);
  });


