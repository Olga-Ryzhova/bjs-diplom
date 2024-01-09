"use strict";

let userForm = new UserForm();
let form = (method, errorMess) => data => method(data, response => {
    if (response.success) {
        location.reload();
    } else {
        errorMess(response.data);
    }
})


userForm.loginFormCallback = form(ApiConnector.login, userForm.setLoginErrorMessage.bind(userForm));
userForm.registerFormCallback = form(ApiConnector.register, userForm.setLoginErrorMessage.bind(userForm));
