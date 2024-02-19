// global variables
let selectedSeats = [];
let totalSeats = 0;
let invalidCoupon = false;

// toggle disable property
function toggleDisabled(id) {
    const element = document.getElementById(id);
    element.removeAttribute('disabled')
}

// update seat prices
function updatePrices(elem, price) {
    const element = document.getElementById(elem);
    element.innerText = price;
}

//showing selected seat details eg. prices, discounts
function updateSeatDetails(value) {
    const elemTotalSeats = document.getElementById('total-seat');
    const element = document.getElementById('seat-details');

    elemTotalSeats.innerText = totalSeats;
    element.innerHTML += `<tr class="dark:bg-gray-800">
        <th scope="row"
            class="lg:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            ${value}
        </th>
        <td class="lg:px-6 py-4">
            Economy
        </td>
        <td class="lg:px-6 py-4 text-right">
            550
        </td>
    </tr>`
    updatePrices('update-total-price', 550 * totalSeats);
    updatePrices('update-grand-total', 550 * totalSeats);
}

// changing the selected seats bg-color
function seatSelection(element) {
    if (totalSeats === 4)
        return false;
    selectedSeats.push(element.innerText);
    totalSeats += 1;
    element.classList.remove('hover:bg-gray-200');
    element.classList.add('bg-primary/70', 'hover:bg-primary');
    updateSeatDetails(element.innerText);
    if (totalSeats === 4) {
        toggleDisabled('coupon-button');
    }
}

// apply coupon
function applyCoupon() {
    const discountField = document.getElementById('discount-field');
    const discount = document.getElementById('update-discount-total');
    const couponRow = document.getElementById('coupon-row');
    const coupon = document.getElementById('coupon-code').value;
    const elem = document.getElementById('invalid-coupon');
    if (!invalidCoupon) {
        elem.classList.remove('hidden');
        invalidCoupon = true;
    }
    let price = document.getElementById('update-grand-total').innerText;
    price = parseInt(price);
    if (coupon === 'NEW15') {
        const discountAmount = price * .15;
        discount.innerText = discountAmount;
        price = price - discountAmount;
        couponRow.classList.add('hidden');
        discountField.classList.remove('hidden');
    }
    if (coupon === 'Couple 20') {
        const discountAmount = price * .20;
        discount.innerText = discountAmount;
        price = price - discountAmount;
        couponRow.classList.add('hidden');
        discountField.classList.remove('hidden');
    }
    updatePrices('update-grand-total', Math.round(price));
}

// buy ticket
function buyTicket() {
    const name = document.getElementById('input-name').value;
    const phoneNumber = document.getElementById('input-phone-number').value;
    const email = document.getElementById('input-email').value;
    if (name && phoneNumber) {
        console.log('abc');
        const modal = document.getElementById('popup-modal');
        modal.classList.remove('hidden');
    }
}

function reload() {
    window.location.reload();
}

elements = document.getElementsByClassName('seat-num');
for (const element of elements) {
    element.addEventListener('click', (e) => {
        seatSelection(e.target);
    })
}
// document.addEventListener('click', () => {
//     console.log('clicked');
// })