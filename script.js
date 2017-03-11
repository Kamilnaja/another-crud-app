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
        1: 'uno',
        2: '2',
        3: '3'
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
        app.items = JSON.parse(retrievedObject);
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
        _('list').innerHTML = data;
        localStorage.setItem('app.items', JSON.stringify(app.items));
    },

    addItem: function () {

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
        // var editor = e.target;
        // //wyłącz przycisk edit
        // //dodaj input
        // //jeśli element nie ma inputa to dodaj
        // function checkAndEdit (event) {
        //     if (editInput.value.length !== 0) {
        //         console.log(e.target.id);
        //         e.target.innerHTML = editInput.value;
        //     } else {
        //         console.log("wpisz coś");
        //     }
        //     event.stopPropagation();
        //     $('#list span').on('click', app.editItem);
        // }
        // $('#list span').off('click', app.editItem);
        //
        // var editInput = document.createElement('input');
        // editInput.placeholder = 'edytuj';
        // editInput.id = 'editInput';
        // var editSubmit = document.createElement('button');
        // //stwórz btn do potwierdzenia zmian
        // editSubmit.innerHTML = "Edytuj";
        // editSubmit.id = 'editSubmit';
        // editor.appendChild(editInput);
        // editor.appendChild(editSubmit);
        // _('editSubmit').addEventListener('click', checkAndEdit);
        // e.stopPropagation();
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