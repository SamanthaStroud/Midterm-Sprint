// Add to Order button functionality for the menu page

document.addEventListener('DOMContentLoaded', function () {
    // Get all menu "Add to Order" buttons
    const orderButtons = document.querySelectorAll('.add-to-order');

    // On click, store order in localStorage and show confirmation to user
    orderButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const itemName = btn.getAttribute('data-name');
            const itemPrice = btn.getAttribute('data-price');

            // Get existing order from localStorage, or start new
            let order = JSON.parse(localStorage.getItem('order')) || {};

            // If item already ordered, increment quantity; else, set to 1
            if(order[itemName]){
                order[itemName].quantity += 1;
            } else {
                order[itemName] = {
                    price: Number(itemPrice),
                    quantity: 1
                };
            }

            // Save updated order to localStorage
            localStorage.setItem('order', JSON.stringify(order));

            // Show quick notification
            showAddNotification(itemName);
        });
    });

    // Helper: show notification after adding item
    function showAddNotification(itemName) {
        let notif = document.createElement('div');
        notif.textContent = '✔️ Added ' + itemName + ' to order!';
        notif.className = 'order-notification';
        notif.style.position = 'fixed';
        notif.style.bottom = '32px';
        notif.style.right = '32px';
        notif.style.background = '#E2BFAE';
        notif.style.padding = '14px 24px';
        notif.style.borderRadius = '16px';
        notif.style.fontFamily = "'Lora', serif";
        notif.style.fontSize = '20px';
        notif.style.color = '#452816';
        notif.style.boxShadow = '0 2px 10px #2222';
        notif.style.zIndex = '9999';
        document.body.appendChild(notif);

        setTimeout(function () {
            notif.remove();
        }, 1600); // notification disappears after 1.6 seconds
    }
});
