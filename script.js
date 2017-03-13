/**
 * Created by Kamil on 2017-03-08.
 */
var app = {
    saveToLocalStorage: function () {
        localStorage.setItem('app.items', JSON.stringify(app.items));
    },
    getFromLocalStorage: function () {
        var retrievedObject = localStorage.getItem('app.items');
        app.items = JSON.parse(retrievedObject);
    },
    displayItem: function () {
        app.getFromLocalStorage();
        var data = "";
        for (var i in app.items) {
            var optionValue = `
            <select class="itemSelect">
                <option hidden value="unchosen">Options</option>
                <option value="edit">Edit</option>
                <option value="erase">Erase</option>
            </select></li></span>`;

            data += '<li class="listItem"><span id=' + app.items[i].id + '>' + app.items[i].name + optionValue;
        }
        $('#list').html(data);
    },

    addItem: function () {
        // jeśli localstorage jest pusta to dodaj do niej pusty element
        if (localStorage.getItem('app.items') == null) {
            //zainicjuj
            app.items = [];
            app.saveToLocalStorage();
        }
        app.getFromLocalStorage();
        // app.items = JSON.parse(localStorage.getItem('app.items'));
        var tempInput = $('#addInput').val();
        var submitNewitem = $('#addBtn');
        //dodaj pusty object na koniec
        app.items[app.items.length] = {};
        app.items[app.items.length - 1].id = app.items.length;
        app.items[app.items.length - 1].name = tempInput;
        app.items[app.items.length - 1].isFinished = "false";
        //zapisz do local storage
        app.saveToLocalStorage();
        $("#addInput").val("");
        app.displayItem();
    },

    editItem: function () {

   //SPRAWDŹ wartość formularza
        if ($('.itemSelect').val() === "edit") {
            console.log('edit');
        }
    },

    deleteItem: function () {
        if ($('.itemSelect').val() === "erase") {
            var tableItemNumber = $(this).parent().attr('id');
            $('.itemSelect').val = "unchosen";
            app.items.splice(tableItemNumber, 1);
            app.saveToLocalStorage();
            app.displayItem();
        }
    }
};

//event listeners

app.displayItem();
$('#addBtn').on('click', app.addItem);
$(document).on('change', '.itemSelect', app.editItem);
$(document).on('change', '.itemSelect', app.deleteItem);