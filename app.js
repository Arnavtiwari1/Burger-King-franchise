function getRandomTime() {
    return Math.floor(Math.random() * 5000) + 5000;
}

function getRandomOrderId() {
    return Math.floor(Math.random() * 1000) + 100;
}

document.getElementById('orderButton').addEventListener('click', function() {
    const selectedItems = [];
    const checkBoxes = document.getElementsByName('foodItem');

    checkBoxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            selectedItems.push(checkbox.value);
        }
    });

    if (selectedItems.length === 0) {
        alert("Please select at least one item");
        return;
    }

    const orderButton = document.getElementById('orderButton');
    orderButton.disabled = true;

    const loadingMessage = document.getElementById('loadingMessage');
    const imageContainer = document.getElementById('imageContainer');
    const orderIdElement = document.getElementById('orderId');
    const orderIdValueElement = document.getElementById('orderIdValue');
    const timerElement = document.getElementById('timer');

    orderIdElement.style.display = 'none';
    imageContainer.innerHTML = '';
    loadingMessage.style.display = 'block';

    const timeLeft = getRandomTime();
    let timeRemaining = timeLeft / 1000;

    const interval = setInterval(() => {
        timerElement.textContent = `${timeRemaining.toFixed(2)} seconds`;
        timeRemaining -= 0.1;

        if (timeRemaining < 0) {
            clearInterval(interval);
        }
    }, 100);

    const promise = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, timeLeft);
    });

    promise.then(function() {
        const orderId = getRandomOrderId();
        orderIdValueElement.textContent = orderId;
        orderIdElement.style.display = 'block';
        loadingMessage.style.display = 'none';

        selectedItems.forEach(item => {
            const foodImage = document.createElement('img');
            foodImage.src = getImageUrl(item);
            foodImage.alt = item;
            foodImage.classList.add('foodImage');
            imageContainer.appendChild(foodImage);
        });

        orderButton.disabled = false;
    });
});

function getImageUrl(foodItem) {
    switch (foodItem) {
        case 'Burger':
            return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60';
        case 'Fries':
            return 'https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZnJpZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60';
        case 'Drink':
            return 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZHJpbmt8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60';
        default:
            return 'https://plus.unsplash.com/premium_photo-1663852297267-827c73e7529e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60';
    }
}
