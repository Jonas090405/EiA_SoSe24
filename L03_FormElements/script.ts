// Name: Jonas Gissler     
// Matrikel: 275577
// Quellen: ChatGPT
class ShoppingItem {
    constructor(
        public name: string,
        public quantity: number,
        public Date: string,
        public comment: string
    ) {}

    render(): HTMLElement {
        let item = document.createElement('li');
        item.classList.add('list-group-item');
        item.dataset.name = this.name;
        item.dataset.quantity = this.quantity.toString();
        item.dataset.Date = this.Date;
        item.dataset.comment = this.comment;

        const contentContainer = document.createElement('div');
        contentContainer.classList.add('content-container');

        const textContent = document.createElement('span');
        textContent.textContent = `${this.name} - Menge: ${this.quantity}, Datum: ${this.Date}, Kommentar: ${this.comment}`;
        contentContainer.appendChild(textContent);

        const editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-sm', 'btn-primary', 'edit-item', 'ml-2');
        editButton.textContent = 'Edit';
        contentContainer.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-sm', 'btn-danger', 'delete-item', 'ml-2');
        deleteButton.textContent = 'Delete';
        contentContainer.appendChild(deleteButton);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('form-check-input', 'ml-auto');
        contentContainer.appendChild(checkbox);

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                item.style.backgroundColor = 'lightgreen';
            } else {
                item.style.backgroundColor = '';
            }
        });

        item.appendChild(contentContainer);

        return item;        
    }

}

// Globale Variable zum Speichern der Einkaufsliste
let shoppingItems: ShoppingItem[] = [];

function addItemToList(item: HTMLElement) {
    let shoppingList = document.getElementById('shopping-list')!;
    shoppingList.appendChild(item);
}

function editItem(item: HTMLElement) {
    const name = item.dataset.name!;
    const quantity = parseInt(item.dataset.quantity!);
    const date = item.dataset.date!;
    const comment = item.dataset.comment!;

    const nameInput = document.getElementById('itemName') as HTMLInputElement;
    const quantityInput = document.getElementById('itemQuantity') as HTMLInputElement;
    const commentInput = document.getElementById('itemComment') as HTMLInputElement;

    nameInput.value = name;
    quantityInput.value = quantity.toString();
    commentInput.value = comment;

    nameInput.scrollIntoView({ behavior: 'smooth', block: 'start' });
    showAddItemModal();
}

function deleteItem(item: HTMLElement) {
    const name = item.dataset.name!;
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
        item.remove();
        // Entfernen des Elements auch aus der globalen Liste
        shoppingItems = shoppingItems.filter(item => item.name !== name);
        console.log(`Item "${name}" deleted.`);
    }
}

function markAsBought(item: HTMLElement) {
    console.log(`Item "${item.dataset.name}" marked as bought.`);
    item.remove();
}

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
        shoppingItems.push(newItem); // Hinzufügen zum globalen Array
        addItemToList(newItem.render());
        GoBack();
        console.log(`New item "${name}" added to the list.`);
        nameInput.value = '';
        quantityInput.value = '';
        commentInput.value = '';
    } else {
        alert('Please enter name and quantity.');
    }
});

function getCurrentDate(): string {
    let today = new Date();
    let year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, '0');
    let day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

document.getElementById('addItemBtn')!.addEventListener('click', () => {
    showAddItemModal();
});

function showAddItemModal() {
    let addItemModal = document.getElementById('addItemModal')!;
    addItemModal.classList.add('show');
    addItemModal.setAttribute('aria-hidden', 'false');
    addItemModal.style.display = 'block';
    addItemModal.style.left = '0';
    document.body.classList.add('modal-open');
}

function GoBack() {
    let addItemModal = document.getElementById('addItemModal')!;
    addItemModal.classList.remove('show');
    addItemModal.setAttribute('aria-hidden', 'true');
    addItemModal.style.display = 'none';
    document.body.classList.remove('modal-open');
}

let closeButton = document.querySelector('#addItemModal .close')!;
closeButton.addEventListener('click', () => {
    GoBack();
});

window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('addItemModal')) {
        GoBack();
    }
});
