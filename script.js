/**
 * Created by Kamil on 2017-03-08.
 */
var app = {
    data: [],
    init: function () {
        this.cacheDom();
        this.bindEvents();
        this.renderItems();
    },
    cacheDom: function () {
        this.list = document.getElementById("list");
        this.addInput = document.getElementById("addInput");
        this.addBtn = document.getElementById("addBtn");
    },
    renderItems: function () {
        this.getFromLocalStorage();
        console.log(typeof app.items);
    },
    bindEvents: function () {
        this.addBtn.addEventListener("click", app.addItem);
        $(document).on("change", ".itemSelect", function (e) {
            if (this.value === "erase") {
                app.deleteItem(e);
            } else if (this.value === "edit") {
                app.editItem(e);
            }
        });
    },
    saveToLocalStorage: function () {
        localStorage.setItem("app.items", JSON.stringify(app.items));
    },
    getFromLocalStorage: function () {
        var retrievedObject = localStorage.getItem("app.items");
        app.items = JSON.parse(retrievedObject);
    },

    displayItem: function () {
        app.getFromLocalStorage();
        var data = "";
        for (var i in app.items) {
            var optionValue =
                '<select class="itemSelect">' +
                '<option hidden value="unchosen">Options</option>' +
                '<option value="edit">Edit</option>' +
                '<option value="erase">Erase</option>' +
                '</select></li></span>';
            //nadaj kolejno id
            data += '<li class="listItem"><span id=' + i + ">" + app.items[i].name + optionValue;
        }
        app.list.innerHTML = data;
    },

    addItem: function () {
        // jeśli localstorage jest pusta to dodaj do niej pusty element
        if (localStorage.getItem("app.items") === null) {
            //zainicjuj
            app.items = [];
            this.saveToLocalStorage();
        }
        app.getFromLocalStorage();
        var tempInput = app.addInput.value;
        if (tempInput.length > 0) {
            //wrzuć element do tablicy na koniec
            app.items[app.items.length] = {};
            app.items[app.items.length - 1].name = tempInput;
            app.items[app.items.length - 1].isFinished = "false";
            app.saveToLocalStorage();
            //wyzeruj wartość pola
            app.addInput.value = "";
        } else {
            alert("wpisz coś");
        }
        app.displayItem();
    },

    editItem: function (e) {
        app.getFromLocalStorage();
        var tableItemNumber = e.target.parentNode.id;
        var editItemValue = prompt("Edytuj");
        if (editItemValue.length === 0) {
            alert("Formularz jest pusty");
        }
        app.items[tableItemNumber].name = editItemValue;
        app.saveToLocalStorage();
        app.displayItem();
    },

    deleteItem: function (e) {
        app.getFromLocalStorage();
        //pobierz odpowiedni element tablicy
        var tableItemNumber = e.target.parentNode.id;
        app.items.splice(tableItemNumber, 1);
        app.saveToLocalStorage();
        app.displayItem();
    }
};

app.init();