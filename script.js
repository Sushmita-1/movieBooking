document.addEventListener('DOMContentLoaded', () => {
    const totalBookedElement = document.getElementById('totalBooked');
    const bookButton = document.getElementById('bookButton');
    const numberInput = document.getElementById('number');
    const usernameInput = document.getElementById('username');
    const seatNumberInput = document.getElementById('seatnumber');
    const bookingList = document.createElement('ul');
    document.querySelector('.booking-list').appendChild(bookingList);

    let totalBooked = 0;
    const bookings = [];

    function updateTotalBooked() {
        totalBookedElement.textContent = bookings.length;
    }

    function renderBookings() {
        bookingList.innerHTML = '';
        bookings.forEach((booking, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                User: ${booking.username}, Seat: ${booking.seatNumber}
                <button class="deleteButton" data-index="${index}">Delete</button>
                <button class="editButton" data-index="${index}">Edit</button>
            `;
            bookingList.appendChild(listItem);
        });
        attachEventListeners();
    }

    function attachEventListeners() {
        const editButtons = document.querySelectorAll('.editButton');
        const deleteButtons = document.querySelectorAll('.deleteButton');

        editButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                const booking = bookings[index];
                usernameInput.value = booking.username;
                seatNumberInput.value = booking.seatNumber;
                bookings.splice(index, 1);
                renderBookings();
                updateTotalBooked();
            });
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                bookings.splice(index, 1);
                renderBookings();
                updateTotalBooked();
            });
        });
    }

    bookButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        const seatNumber = seatNumberInput.value.trim();

        if (username === '' || seatNumber === '') {
            alert('Please enter both username and seat number');
            return;
        }

        const existingBooking = bookings.find(booking => booking.seatNumber === seatNumber);

        if (existingBooking) {
            alert('Seat already booked');
            return;
        }

        const newBooking = { username, seatNumber };
        bookings.push(newBooking);

        renderBookings();
        updateTotalBooked();

        usernameInput.value = '';
        seatNumberInput.value = '';
    });

    numberInput.addEventListener('input', () => {
        const slot = numberInput.value.trim();
        const booking = bookings.find(booking => booking.seatNumber === slot);

        if (slot !== '' && booking) {
            alert(`Seat ${slot} is booked by ${booking.username}`);
        } else if (slot !== '') {
            alert('Nothing Present');
        }
    });
});