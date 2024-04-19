class ShoppingItem {
    constructor(
        public name: string,
        public quantity: number,
        public Date: string,
        public comment: string
    ) {}

    // Methode zur Erstellung der HTML-Repräsentation des Eintrags
    render(): HTMLElement {
        let item = document.createElement('li');
        item.classList.add('list-group-item');
        item.dataset.name = this.name;
        item.dataset.quantity = this.quantity.toString();
        item.dataset.Date = this.Date;
        item.dataset.comment = this.comment;

        // Container für Inhalt und Buttons erstellen
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('content-container');

        // Textinhalt des Listenelements setzen
        const textContent = document.createElement('span');
        textContent.textContent = `${this.name} - Menge: ${this.quantity}, Datum: ${this.Date}, Kommentar: ${this.comment}`;
        contentContainer.appendChild(textContent);

        // Editier-Button hinzufügen
        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-sm', 'btn-primary', 'edit-item', 'ml-2');
        editButton.textContent = 'Edit';
        contentContainer.appendChild(editButton);

        // Löschen-Button hinzufügen
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-sm', 'btn-danger', 'delete-item', 'ml-2');
        deleteButton.textContent = 'Delete';
        contentContainer.appendChild(deleteButton);

        // Checkbox hinzufügen
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('form-check-input', 'ml-auto');
        contentContainer.appendChild(checkbox);

        // Eventlistener für die Checkbox hinzufügen
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                item.style.backgroundColor = 'lightgreen'; // Hintergrundfarbe auf Grün setzen
            } else {
                item.style.backgroundColor = ''; // Hintergrundfarbe zurücksetzen
            }
        });

        // Content-Container dem Listenelement hinzufügen
        item.appendChild(contentContainer);

        return item;        
    }

}

// Funktion zum Hinzufügen eines Listenelements
function addItemToList(item: HTMLElement) {
    let shoppingList = document.getElementById('shopping-list')!;
    shoppingList.appendChild(item);

    // Eventlistener für den Edit-Button hinzufügen
    let editButton = item.querySelector('.edit-item')!;
    editButton.addEventListener('click', () => {
        editItem(item);
    });

    // Eventlistener für den Löschen-Button hinzufügen
    let deleteButton = item.querySelector('.delete-item')!;
    deleteButton.addEventListener('click', () => {
        deleteItem(item);
    });
}

// Funktion zum Bearbeiten eines Listenelements
function editItem(item: HTMLElement) {
    const name = item.dataset.name!;
    const quantity = parseInt(item.dataset.quantity!);
    const date = item.dataset.date!;
    const comment = item.dataset.comment!;

    // Hier kannst du Logik zum Bearbeiten des Elements implementieren, z.B. das Befüllen des Formulars im Modal mit den vorhandenen Daten
    const nameInput = document.getElementById('itemName') as HTMLInputElement;
    const quantityInput = document.getElementById('itemQuantity') as HTMLInputElement;
    const commentInput = document.getElementById('itemComment') as HTMLInputElement;

    nameInput.value = name;
    quantityInput.value = quantity.toString();
    commentInput.value = comment;

    // Scrollen zum Anfang des Formulars, um das Bearbeiten zu erleichtern
    nameInput.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Öffnen des Modal-Menüs zum Bearbeiten
    showAddItemModal();
}

// Funktion zum Löschen eines Listenelements
function deleteItem(item: HTMLElement) {
    const name = item.dataset.name!;
    // Hier kannst du Logik zum Löschen des Elements implementieren, z.B. eine Bestätigungsabfrage und anschließendes Entfernen des Elements aus der Liste
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
        item.remove();
        console.log(`Item "${name}" deleted.`);
    }
}

// Funktion zum Markieren eines Elements als gekauft
function markAsBought(item: HTMLElement) {
    console.log(`Item "${item.dataset.name}" marked as bought.`);
    item.remove(); // Element aus der Liste entfernen
}

// Eventlistener für das Hinzufügen eines neuen Eintrags
document.getElementById('addItemForm')!.addEventListener('submit', (event) => {
    event.preventDefault();
    let nameInput = document.getElementById('itemName') as HTMLInputElement;
    let quantityInput = document.getElementById('itemQuantity') as HTMLInputElement;
    let commentInput = document.getElementById('itemComment') as HTMLInputElement;

    let name = nameInput.value.trim();
    let quantity = parseInt(quantityInput.value);
    let comment = commentInput.value.trim();

    if (name && quantity) {
        let newItem = new ShoppingItem(name, quantity, getCurrentDate(), comment);
        addItemToList(newItem.render()); // Hinzufügen des neuen Elements zur Liste
        // Verstecke das Modal für das Hinzufügen eines neuen Elements
        GoBack();
        console.log(`New item "${name}" added to the list.`);
        // Form zurücksetzen
        nameInput.value = '';
        quantityInput.value = '';
        commentInput.value = '';
    } else {
        alert('Please enter name and quantity.');
    }
});

// Funktion zur Bereitstellung des aktuellen Datums im Format "YYYY-MM-DD"
function getCurrentDate(): string {
    let today = new Date();
    let year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, '0');
    let day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Eventlistener für den "Add Item" Button
document.getElementById('addItemBtn')!.addEventListener('click', () => {
    showAddItemModal();
});

// Funktion zum Anzeigen des "Add Item" Modals
function showAddItemModal() {
    let addItemModal = document.getElementById('addItemModal')!;
    addItemModal.classList.add('show');
    addItemModal.setAttribute('aria-hidden', 'false');
    addItemModal.style.display = 'block';
    addItemModal.style.left = '0'; // Verschieben des Pop-up-Menüs nach links
    document.body.classList.add('modal-open');
}

// Funktion zum Verstecken des "Add Item" Modals
function GoBack() {
    let addItemModal = document.getElementById('addItemModal')!;
    addItemModal.classList.remove('show');
    addItemModal.setAttribute('aria-hidden', 'true');
    addItemModal.style.display = 'none';
    document.body.classList.remove('modal-open');
}

// Eventlistener für den Zurück-Button bzw. das Schließen-Icon im "Add Item" Modal
let closeButton = document.querySelector('#addItemModal .close')!;
closeButton.addEventListener('click', () => {
    GoBack();
});

// Eventlistener für Klicks außerhalb des Modals, um das Modal zu schließen
window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('addItemModal')) {
        GoBack();
    }
});
