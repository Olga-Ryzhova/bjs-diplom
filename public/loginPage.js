"use strict";

let userForm = new UserForm();
let form = (method, messError) => data => method(data, response => {
    if (response.success) {
        location.reload();
    } else {
        messError(response.error);
    }
})

userForm.loginFormCallback = form(ApiConnector.login, userForm.setLoginErrorMessage.bind(userForm));
userForm.registerFormCallback = form(ApiConnector.register, userForm.setRegisterErrorMessage.bind(userForm));