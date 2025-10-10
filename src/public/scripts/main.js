// scripts/main.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      fullName: form.fullName.value,
      phone: form.phone.value,
      email: form.email.value,
      date: form.date.value,
      time: form.time.value,
      pickup: form.pickup.value,
      destination: form.destination.value,
      preferences: form.preferences.value
    };

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("Booking submitted successfully!");
        form.reset();
      } else {
        const data = await res.json();
        alert("Error: " + data.message);
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
      console.error(err);
    }
  });
});
