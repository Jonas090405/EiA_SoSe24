"use strict";
// ShoppingItem Klasse zur Repräsentation von Einkaufslisten-Einträgen
class ShoppingItem {
    name;
    quantity;
    lastPurchase;
    comment;
    constructor(name, quantity, lastPurchase, comment) {
        this.name = name;
        this.quantity = quantity;
        this.lastPurchase = lastPurchase;
        this.comment = comment;
    }
    // Methode zur Erstellung der HTML-Repräsentation des Eintrags
    render() {
        const item = document.createElement('li');
        item.classList.add('list-group-item');
        item.dataset.name = this.name;
        item.dataset.quantity = this.quantity.toString();
        item.dataset.lastPurchase = this.lastPurchase;
        item.dataset.comment = this.comment;
        item.textContent = `${this.name} - Qty: ${this.quantity}, Last purchase: ${this.lastPurchase}, Comment: ${this.comment}`;
        return item;
    }
}
// Funktion zum Markieren eines Elements als gekauft
function markAsBought(item) {
    console.log(`Item "${item.dataset.name}" marked as bought.`);
    item.remove(); // Element aus der Liste entfernen
}
// Eventlistener für das Markieren eines Elements als gekauft
document.getElementById('shopping-list').addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'LI') {
        markAsBought(target);
    }
});
// Eventlistener für das Hinzufügen eines neuen Eintrags
document.getElementById('addItemForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = document.getElementById('itemName');
    const quantityInput = document.getElementById('itemQuantity');
    const commentInput = document.getElementById('itemComment');
    const name = nameInput.value.trim();
    const quantity = parseInt(quantityInput.value);
    const comment = commentInput.value.trim();
    if (name && quantity) {
        const newItem = new ShoppingItem(name, quantity, getCurrentDate(), comment);
        const newList = document.getElementById('shopping-list');
        newList.appendChild(newItem.render());
        // Verstecke das Modal für das Hinzufügen eines neuen Elements
        const addItemModal = document.getElementById('addItemModal');
        addItemModal.classList.remove('show');
        addItemModal.setAttribute('aria-hidden', 'true');
        addItemModal.style.display = 'none';
        document.body.classList.remove('modal-open');
        console.log(`New item "${name}" added to the list.`);
        // Form zurücksetzen
        nameInput.value = '';
        quantityInput.value = '';
        commentInput.value = '';
    }
    else {
        alert('Please enter name and quantity.');
    }
});
// Funktion zur Bereitstellung des aktuellen Datums im Format "YYYY-MM-DD"
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}
// Eventlistener für den "Add Item" Button
document.getElementById('addItemBtn').addEventListener('click', () => {
    const addItemModal = document.getElementById('addItemModal');
    addItemModal.classList.add('show');
    addItemModal.setAttribute('aria-hidden', 'false');
    addItemModal.style.display = 'block';
    document.body.classList.add('modal-open');
});
//# sourceMappingURL=script.js.map