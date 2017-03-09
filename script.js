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
            data += '<select class="itemSelect"><option>Edit</option><option>Erase</option></select><li class="listItem"><span id=' + this.items[i] + '>' + this.items[i] + '</span></li>';
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
        $('#' + newItem.id).wrap('<li></li>');
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

    deleteItem: function (e) {

    }
}

app.displayItem();
//event listeners
$('#list span').on('click', app.editItem);
_('addBtn').addEventListener('click', app.addItem);
