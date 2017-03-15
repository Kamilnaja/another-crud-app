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
            //nadaj kolejno id
            data += '<li class="listItem"><span id=' + i + '>' + app.items[i].name + optionValue;
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
        app.items[app.items.length - 1].name = tempInput;
        app.items[app.items.length - 1].isFinished = "false";
        //zapisz do local storage
        app.saveToLocalStorage();
        $("#addInput").val("");
        app.displayItem();
    },

    editItem: function (e) {
    //pobierz z local
   //SPRAWDŹ wartość formularza
        app.getFromLocalStorage();
        var tableItemNumber = e.target.parentNode.id;
        var editItemValue = prompt("Edytuj");
        app.items[tableItemNumber].name = editItemValue;
        console.log(tableItemNumber);
        app.saveToLocalStorage();
        app.displayItem();
        // console.log(app.items);
    },

    deleteItem: function (e) {
        app.getFromLocalStorage();
            var tableItemNumber = e.target.parentNode.id;
            //zwraca cały obiekt
            app.items.splice(tableItemNumber, 1);
            app.saveToLocalStorage();
            app.displayItem();
    }
};

//event listeners

app.displayItem();
$('#addBtn').on('click', app.addItem);

$(document).on('change', '.itemSelect', function(e){
    if (this.value === "erase"){
        app.deleteItem(e);
    } else if (this.value === "edit"){
        app.editItem(e);
    }
});
