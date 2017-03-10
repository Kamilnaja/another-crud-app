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
    items: ['uno', '2', '3'],
    //status open gdy user wpisuje coś do formularza
    isOpen:  false,
    displayItem: function () {
        var data = "";
        for (var i = 0; i < this.items.length; i++) {
            var optionValue = `<select class="itemSelect">" + optionValue + "<option hidden>Options</option><option value="edit">Edit</option>
                <option value="erase">Erase</option>
                </select></li></span>`;
            data += '<li class="listItem"><span id=' + this.items[i] + '>' + this.items[i] + optionValue;
        }
        _('list').innerHTML = data;
    },

    addItem: function () {
        var newItem = document.createElement('span');
        newItem.classList = 'listItem';
        newItem.innerHTML = _('addInput').value;
        newItem.id = _('addInput').value.replace(/\s+/g, '');
        //wrapnij w span
        _('list').appendChild(newItem);
        var listItems = newItem.id;
        $('#' + newItem.id).wrap('<li class="listItem"></li>').append('<select class="itemSelect"><option value="erase">Edit</option><option>Erase</option></select>');
        $listItems = "";

        _('addInput').value = "";
    },

    editItem: function (e) {
        var editor = e.target;
        //wyłącz przycisk edit
        //dodaj input
        //jeśli element nie ma inputa to dodaj
        function checkAndEdit (event) {
            if (editInput.value.length !== 0) {
                console.log(e.target.id);
                e.target.innerHTML = editInput.value;
            } else {
                console.log("wpisz coś");
            }
            event.stopPropagation();
            $('#list span').on('click', app.editItem);
        }
        $('#list span').off('click', app.editItem);

        var editInput = document.createElement('input');
        editInput.placeholder = 'edytuj';
        editInput.id = 'editInput';
        var editSubmit = document.createElement('button');
        //stwórz btn do potwierdzenia zmian
        editSubmit.innerHTML = "Edytuj";
        editSubmit.id = 'editSubmit';
        editor.appendChild(editInput);
        editor.appendChild(editSubmit);
        _('editSubmit').addEventListener('click', checkAndEdit);
        e.stopPropagation();
    },

    deleteItem: function () {
        if ($('.itemSelect').val() == "erase"){
            console.log('item erased');
            $(this).parent().parent().detach();
            $(this).parent().detach();
        }
    }
}

app.displayItem();
//event listeners
_('addBtn').addEventListener('click', app.addItem);
//also for dynamically created elements
$(document).on('change', '.itemSelect', app.deleteItem);
