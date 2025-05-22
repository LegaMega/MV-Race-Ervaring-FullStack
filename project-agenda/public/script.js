document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.querySelector('.calendar-grid');
    const weekHeader = document.querySelector('.week-header');
    const weekGrid = document.querySelector('.week-grid');
    const timeSlots = document.querySelector('.time-slots');
    const datePicker = document.getElementById('datePicker');
    const selectedDateDisplay = document.getElementById('selectedDate');
    const currentDate = new Date();
    let selectedDate = new Date();

    // Set initial date in date picker and set min date to today
    datePicker.valueAsDate = currentDate;
    datePicker.min = currentDate.toISOString().split('T')[0];

    // Function to format date as DD-MM-YYYY
    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    // Function to format date for database (YYYY-MM-DD)
    function formatDateForDB(date) {
        return date.toISOString().split('T')[0];
    }

    // Update selected date display
    function updateSelectedDateDisplay() {
        selectedDateDisplay.textContent = formatDate(selectedDate);
    }

    // Generate time slots from 8:00 to 23:00
    for (let hour = 8; hour <= 23; hour++) {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = `${hour}:00`;
        timeSlots.appendChild(timeSlot);
    }

    // Generate week header
    const days = ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag', 'Zondag'];
    days.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'week-day';
        dayElement.innerHTML = `<span class=\"day-name\"></span><span class=\"day-date\"></span>`;
        weekHeader.appendChild(dayElement);
    });

    // Generate week grid
    for (let i = 0; i < 7; i++) {
        const dayColumn = document.createElement('div');
        dayColumn.className = 'day-column';
        weekGrid.appendChild(dayColumn);
    }

    // Function to show new event form
    function showNewEventForm(date) {
        const modal = document.getElementById('eventModal');
        const dateInput = document.getElementById('eventDate');
        const startTimeInput = document.getElementById('eventStartTime');
        const endTimeInput = document.getElementById('eventEndTime');
        const nameInput = document.getElementById('eventName');
        const emailInput = document.getElementById('eventEmail');
        const phoneInput = document.getElementById('eventPhone');
        const descriptionInput = document.getElementById('eventDescription');

        // Reset form
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
        descriptionInput.value = '';

        // Set default values
        dateInput.value = formatDateForDB(date);
        startTimeInput.value = '10:00';
        endTimeInput.value = '16:00';

        // Show modal with flex display
        modal.classList.add('show');
    }

    // Function to update calendar
    function updateCalendar() {
        const firstDay = new Date(selectedDate);
        firstDay.setDate(selectedDate.getDate() - selectedDate.getDay() + 1);

        // Update selected date display
        updateSelectedDateDisplay();

        // Update week days
        const weekDays = document.querySelectorAll('.week-day');
        weekDays.forEach((day, index) => {
            const date = new Date(firstDay);
            date.setDate(firstDay.getDate() + index);
            day.querySelector('.day-name').textContent = days[index];
            day.querySelector('.day-date').textContent = formatDate(date);
            
            // Check if this is the selected day
            if (date.toDateString() === selectedDate.toDateString()) {
                day.classList.add('current-day');
            } else {
                day.classList.remove('current-day');
            }
        });

        // Update day columns
        const dayColumns = document.querySelectorAll('.day-column');
        dayColumns.forEach((column, index) => {
            column.innerHTML = '';
            const date = new Date(firstDay);
            date.setDate(firstDay.getDate() + index);
            
            // Check if this is the selected day
            if (date.toDateString() === selectedDate.toDateString()) {
                column.classList.add('current-day');
            } else {
                column.classList.remove('current-day');
            }

            // Only show time block on Wednesday (index 2) and Friday (index 4)
            if (index === 2 || index === 4) {
                // Add time block from 10:00 to 16:00
                const timeBlock = document.createElement('div');
                timeBlock.className = 'time-block';
                const startHour = 10;
                const endHour = 16;
                const startPosition = (startHour - 8) * 60; // 8:00 is the start time
                const height = (endHour - startHour) * 60;
                timeBlock.style.top = `${startPosition}px`;
                timeBlock.style.height = `${height}px`;
                timeBlock.textContent = 'Max Verstappen Meet & Greet';
                
                // Add click event to time block
                timeBlock.addEventListener('click', () => showNewEventForm(date));
                
                column.appendChild(timeBlock);
            }
        });
    }

    // Animation for week switch
    function animateWeekSwitch(callback) {
        const weekGrid = document.querySelector('.week-grid');
        weekGrid.classList.add('animating');
        setTimeout(() => {
            weekGrid.classList.remove('animating');
            if (callback) callback();
        }, 500);
    }

    // Event listener for date picker
    datePicker.addEventListener('change', () => {
        animateWeekSwitch(() => {
            const newDate = new Date(datePicker.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time to start of day
            
            if (newDate >= today) {
                selectedDate = newDate;
                updateCalendar();
            } else {
                // Als de geselecteerde datum in het verleden ligt, reset naar vandaag
                selectedDate = today;
                datePicker.valueAsDate = today;
                updateCalendar();
            }
        });
    });

    // Event listeners for navigation
    document.getElementById('prevWeek').addEventListener('click', () => {
        animateWeekSwitch(() => {
            const newDate = new Date(selectedDate);
            newDate.setDate(selectedDate.getDate() - 7);
            if (newDate >= currentDate) {
                selectedDate = newDate;
                datePicker.valueAsDate = selectedDate;
                updateCalendar();
            }
        });
    });

    document.getElementById('nextWeek').addEventListener('click', () => {
        animateWeekSwitch(() => {
            selectedDate.setDate(selectedDate.getDate() + 7);
            datePicker.valueAsDate = selectedDate;
            updateCalendar();
        });
    });

    // Event listener for form submission
    document.getElementById('eventForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Toon loading overlay
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) overlay.style.display = 'flex';
        
        try {
            // Eerst de email versturen
            await emailjs.sendForm("service_sdu1gyn", "template_1", e.target);
            
            // Dan de data naar de server sturen
            const formData = new FormData(e.target);
            
            // Debug logging voor locatie
            console.log('Form element:', e.target);
            console.log('Location select element:', document.getElementById('eventLocation'));
            console.log('Location value from select:', document.getElementById('eventLocation').value);
            console.log('Location from FormData:', formData.get('location'));
            
            const eventData = {
                date: formData.get('date'),
                startTime: formData.get('startTime'),
                endTime: formData.get('endTime'),
                location: document.getElementById('eventLocation').value, // Direct van het element
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                description: formData.get('description')
            };

            console.log('Complete eventData:', eventData);
            console.log('JSON string being sent:', JSON.stringify(eventData));

            const response = await fetch('http://localhost:3001/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            });

            if (response.ok) {
                const result = await response.json();
                const modal = document.getElementById('eventModal');
                modal.classList.remove('show');
                if (overlay) overlay.style.display = 'none';
                showCustomPopup('✅ Afspraak succesvol aangemaakt!');
            } else {
                if (overlay) overlay.style.display = 'none';
                const errorData = await response.json();
                console.error('Error submitting form:', errorData);
                showCustomPopup('❌ Er is een fout opgetreden bij het verzenden van het formulier.');
            }
        } catch (error) {
            if (overlay) overlay.style.display = 'none';
            console.error('Error:', error);
            showCustomPopup('❌ Er is een fout opgetreden bij het verzenden van het formulier.');
        }
    });

    // Close modal when clicking the close button
    document.querySelector('.close').addEventListener('click', () => {
        const modal = document.getElementById('eventModal');
        modal.classList.remove('show');
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('eventModal');
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Houd het hidden veld user_email gelijk aan het ingevulde emailadres
    document.getElementById('eventEmail').addEventListener('input', function() {
        document.getElementById('eventUserEmail').value = this.value;
    });

    // Houd het hidden veld user_name gelijk aan het ingevulde naamveld
    document.getElementById('eventName').addEventListener('input', function() {
        document.getElementById('eventUserName').value = this.value;
    });

    // Initial calendar update
    updateCalendar();

    // Custom popup functie
    function showCustomPopup(message) {
        const popup = document.getElementById('customPopup');
        if (!popup) return;
        popup.textContent = message;
        popup.style.display = 'block';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 2500);
    }
}); 