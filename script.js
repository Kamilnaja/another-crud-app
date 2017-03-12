/**
 * Created by Kamil on 2017-03-08.
 */
_ = function (id) {
    return document.getElementById(id);
};
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
            <select class="itemSelect">
                <option hidden>Options</option>
                <option value="edit">Edit</option>
                <option value="erase">Erase</option>
            </select></li></span>`;
            data += '<li class="listItem"><span id="' + app.items[i] + '">' + this.items[i] + optionValue;
        }
        _('list').innerHTML = data;
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
        _('addInput').value = "";
        localStorage.setItem('app.items', JSON.stringify(app.items));
        app.displayItem();
    },

    editItem: function () {

        if ($('.itemSelect').val() == "edit"){
            console.log('app is edited');
        }
    },

    deleteItem: function () {
        $('select').on('change', function(){
            //wyszukaj dane id w obiekcie i usuń
            var itemToDelete = (this.parentElement.id);
            //znajdź to id w obiekcie
            //zwróć numer tego elementu
            delete app.items.itemToDelete;
            console.log(app.items);
            var toDelete = $(this.parentElement);
            // toDelete.parent().detach();


        });

    }
};

//event listeners

app.displayItem();
$('#addBtn').on('click', app.addItem);
$(document).on('change', '.itemSelect', app.editItem);
app.deleteItem();