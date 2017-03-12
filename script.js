/**
 * Created by Kamil on 2017-03-08.
 */
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
var app = {
    // items: [{id: 1, name: "coś tam", isFinished: false}, {id: 2, name: "hello", isFinished: true}],
    // saveToLocalStorage: function () {
    //     localStorage.setItem('app.items', JSON.stringify(app.items));
    // },
    // getFromLocalStorage: function () {
    //     var retrievedObject = localStorage.getItem('app.items');
    //     app.parsedObject = JSON.parse(retrievedObject);
    //     return parsedObject;
    // },
    displayItem: function () {
        var retrievedObject = localStorage.getItem('app.items');
        app.items = JSON.parse(retrievedObject);
        var data = "";
        for (var i in app.items) {
            var optionValue = `
            <select class="itemSelect">
                <option hidden>Options</option>
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
            localStorage.setItem('app.items', JSON.stringify(app.items));
        }
        app.items = JSON.parse(localStorage.getItem('app.items'));
        var tempInput = $('#addInput').val();
        var submitNewitem = $('#addBtn');
        //dodaj pusty object na koniec
        app.items[app.items.length] = {};
        app.items[app.items.length - 1].id = app.items.length;
        app.items[app.items.length - 1].name = tempInput;
        app.items[app.items.length - 1].isFinished = "false";
        //zapisz do local storage
        localStorage.setItem('app.items', JSON.stringify(app.items));
        $("#addInput").val("");
        app.displayItem();
    },

    editItem: function () {

        if ($('.itemSelect').val() == "edit"){
        }
    },

    deleteItem: function () {

        if ($('.itemSelect').val() == "erase"){
            $(this).parent().parent().detach();
            $(this).parent().detach();
        }
    }
};

//event listeners

app.displayItem();
$('#addBtn').on('click', app.addItem);
$(document).on('change', '.itemSelect', app.editItem);
app.deleteItem();