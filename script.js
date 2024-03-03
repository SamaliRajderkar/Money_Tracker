document.addEventListener('DOMContentLoaded', function () {
    let expenses = [];
    let totalAmount = 0;

    const categorySelect = document.getElementById('Category-select');
    const amountInput = document.getElementById('Amount-input');
    const dateInput = document.getElementById('Date-input');
    const addButton = document.getElementById('Add-button');
    const expenseTableBody = document.getElementById('Expense-table-body');
    const total = document.getElementById('Total-amount');

    addButton.addEventListener('click', function () {
        const category = categorySelect.value;
        const amount = parseFloat(amountInput.value);
        const date = dateInput.value;

        if (!category) {
            alert('Select category');
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            alert('Enter valid amount');
            return;
        }

        if (!date) {
            alert('Enter valid date');
            return;
        }

        const newRow = expenseTableBody.insertRow();
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        categoryCell.textContent = category;
        amountCell.textContent = amount.toFixed(2); 
        dateCell.textContent = date;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('Delete-button');

        deleteButton.addEventListener('click', function () {
            const deletedAmount = parseFloat(amountCell.textContent);
            totalAmount -= deletedAmount;
            total.textContent = totalAmount.toFixed(2);
            expenses.splice(expenses.indexOf({ category, amount, date }), 1);
            newRow.remove();
        });

        deleteCell.appendChild(deleteButton);

        // Update total amount
        totalAmount += amount;
        total.textContent = totalAmount.toFixed(2);

        // Add expense to the array
        expenses.push({ category, amount, date });

        // Clear inputs
        categorySelect.value = '';
        amountInput.value = '';
        dateInput.value = '';
    });
});
