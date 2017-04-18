/**
 * Created by Kamil on 2017-03-08.
 */
var app = (function () {
    "use strict";
    var _saveToLocalStorage = function () {
        localStorage.setItem("app.items", JSON.stringify(app.items));
    };
    var _getFromLocalStorage = function () {
        var retrievedObject = localStorage.getItem("app.items");
        app.items = JSON.parse(retrievedObject);
    };

    var _displayItem = function () {
        _getFromLocalStorage();
        var _data = "";
        for (var i in app.items) {
            var optionValue =
                '<select class="itemSelect">' +
                '<option hidden value="unchosen">Options</option>' +
                '<option value="edit">Edit</option>' +
                '<option value="erase">Erase</option>' +
                '</select></li></span>';
            //nadaj kolejno id
            _data += '<li class="listItem"><span id=' + i + ">" + app.items[i].name + optionValue;
        }
        _list.innerHTML = _data;
    };

    var _addItem = function () {
        // jeśli localstorage jest pusta to dodaj do niej pusty element
        if (localStorage.getItem("app.items") === null) {
            //zainicjuj
            app.items = [];
            _saveToLocalStorage();
        }
        _getFromLocalStorage();
        var tempInput = _addInput.value;
        if (tempInput.length > 0) {
            //wrzuć element do tablicy na koniec
            app.items[app.items.length] = {};
            app.items[app.items.length - 1].name = tempInput;
            app.items[app.items.length - 1].isFinished = "false";
            _saveToLocalStorage();
            //wyzeruj wartość pola
            _addInput.value = "";
        } else {
            alert("wpisz coś");
        }
        _displayItem();
    };

    var _editItem = function (e) {
        _getFromLocalStorage();
        var tableItemNumber = e.target.parentNode.id;
        var editItemValue = prompt("Edytuj");
        if (editItemValue.length === 0) {
            alert("Formularz jest pusty");
        }
        app.items[tableItemNumber].name = editItemValue;
        _saveToLocalStorage();
        _displayItem();
    };

    var _deleteItem = function (e) {
        _getFromLocalStorage();
        //pobierz odpowiedni element tablicy
        var tableItemNumber = e.target.parentNode.id;
        app.items.splice(tableItemNumber, 1);
        _saveToLocalStorage();
        _displayItem();
    };

    //cached dom items
    var _list = document.getElementById("list");
    var _addInput = document.getElementById("addInput");
    var _addBtn = document.getElementById("addBtn");

    return {
        displayItem: _displayItem,
        editItem: _editItem,
        deleteItem: _deleteItem,
        addItem: _addItem,
        addBtn: _addBtn
    }
}());

app.displayItem();

app.addBtn.addEventListener("click", app.addItem);

$(document).on("change", ".itemSelect", function (e) {
    if (this.value === "erase") {
        app.deleteItem(e);
    } else if (this.value === "edit") {
        app.editItem(e);
    }
});
