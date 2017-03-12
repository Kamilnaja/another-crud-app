/**
 * Created by Kamil on 2017-03-08.
 */

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
var app = {
    items: {
    },
    saveToLocalStorage: function () {
        localStorage.setItem('app.items', JSON.stringify(app.items));
    },
    getFromLocalStorage: function () {
        var retrievedObject = localStorage.getItem('app.items');
        app.parsedObject = JSON.parse(retrievedObject);
        return parsedObject;
    },
    displayItem: function () {
        var retrievedObject = localStorage.getItem('app.items');
        app.parsedObject = JSON.parse(retrievedObject);
        app.items = app.parsedObject;
        // var retrievedObject = localStorage.getItem('app.items');
        // app.items = JSON.parse(retrievedObject);
        var data = "";
        for (var i in app.items) {
            var optionValue = `
            <select class="itemSelect">" + optionValue + "
                <option hidden>Options</option>
                <option value="edit">Edit</option>
                <option value="erase">Erase</option>
            </select></li></span>`;
            data += '<li class="listItem"><span id=' + this.items[i] + '>' + this.items[i] + optionValue;
        }
        $('#list').html(data);
    },

    addItem: function () {
        //jeśli localstorage jest pusta to dodaj do niej pusty elemenent
        if (localStorage.getItem('app.items') === null) {
            app.items = {}
            localStorage.setItem('app.items', JSON.stringify(app.items));
        }
        var retrievedObject = localStorage.getItem('app.items');
        app.items = JSON.parse(retrievedObject);
        var tempInput = $('#addInput').val();
        var submitNewitem = $('#addBtn');
        // http://stackoverflow.com/questions/5223/length-of-a-javascript-object
        Object.size = function(obj) {
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };
        app.items[Object.size(app.items) + 1] = tempInput;
           // app.items.push(tempInput);
        $("#addInput").val(" ");
        localStorage.setItem('app.items', JSON.stringify(app.items));
        app.displayItem();
    },

    editItem: function () {

        if ($('.itemSelect').val() == "edit"){
            console.log('app is edited');
        }
    },

    deleteItem: function () {
        if ($('.itemSelect').val() == "erase"){
            console.log('item erased');
            $(this).parent().parent().detach();
            $(this).parent().detach();
        }
    }
};

//event listeners

app.displayItem();
$('#addBtn').on('click', app.addItem);
$(document).on('change', '.itemSelect', app.deleteItem);
$(document).on('change', '.itemSelect', app.editItem);