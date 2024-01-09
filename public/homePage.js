"use strict";

// Выход из личного кабинета
let logoutButton = new LogoutButton();

logoutButton.action = function() {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    })
}

// Получение информации о пользователе
ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
})


// Получение текущих курсов валюты
let ratesBoard = new RatesBoard();

ratesBoard.getCurrencyRate = function() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            this.clearTable();
            this.fillTable(response.data)
        }
    })
}

ratesBoard.getCurrencyRate();
const getCurrencyRateInterval = setInterval(() => ratesBoard.getCurrencyRate(), 60000);

// Операции с деньгами

let moneyManager = new MoneyManager();

let money = (method) => data => method(data, response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    } 
})

// Пополнение баланса
moneyManager.addMoneyCallback = money(ApiConnector.addMoney);

// Конвертирование валюты
moneyManager.conversionMoneyCallback  = money(ApiConnector.convertMoney);

// Перевод валюты
moneyManager.sendMoneyCallback  = money(ApiConnector.transferMoney);


// Работа с избранным

let favoritesWidget = new FavoritesWidget();

// Начальный список избранного
favoritesWidget.getFavoritesWidget = function() {
    ApiConnector.getFavorites(response => {
        if (response.success) {
            this.clearTable();
            this.fillTable(response.data);
            this.updateUsersList(response.data);   
        }      
    })
}

// Добавление пользователя в список избранных
let favorite = (method) => data => method(data, response => {
        if (response.success) {
            this.clearTable();
            this.fillTable(response.data);
            this.updateUsersList(data);   
        }    
})

favoritesWidget.addUserCallback = favorite(ApiConnector.addUserToFavorites);

// Удаление пользователя из списка избранных
favoritesWidget.removeUserCallback = favorite(ApiConnector.removeUserFromFavorites);



