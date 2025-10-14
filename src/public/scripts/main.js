document.getElementById("bookingType").addEventListener("change", function() {
  const type = this.value;
  
  const oneTwoWay = document.getElementById("oneTwoWayFields");
  const twoWayReturn = document.getElementById("twoWayReturnFields");
  const hourly = document.getElementById("hourlyFields");
  const finalSection = document.getElementById("finalSection");

  // Hide all first
  oneTwoWay.style.display = "none";
  twoWayReturn.style.display = "none";
  hourly.style.display = "none";
  finalSection.style.display = "none";

  if (type === "one-way") {
    oneTwoWay.style.display = "block";
    finalSection.style.display = "block";
  } else if (type === "two-way") {
    oneTwoWay.style.display = "block";
    twoWayReturn.style.display = "block";
    finalSection.style.display = "block";
  } else if (type === "hourly") {
    hourly.style.display = "block";
    finalSection.style.display = "block";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      fullName: form.fullName.value,
      phone: form.phone.value,
      email: form.email.value,
      bookingType: form.bookingType.value,
      date: form.date.value,
      time: form.time.value,
      pickup: form.pickup.value,
      passengers: form.passengers.value,
      destination: form.destination.value,
      additionalNotes: form.additionalNotes.value
    };

    try {
     const res = await fetch("/api/bookings", {
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
