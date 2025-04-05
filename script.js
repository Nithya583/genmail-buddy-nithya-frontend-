async function processEmail() {
  const emailInput = document.getElementById("emailInput").value;

  const summaryElement = document.getElementById("summaryOutput");
  const replyElement = document.getElementById("replyOutput");
  const remindersElement = document.getElementById("reminderOutput");

  try {
    const response = await fetch("http://localhost:5000/process-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailInput }),
    });

    const data = await response.json();

    // Fill in the fields with the data from the backend response
    if (data.summary) {
      summaryElement.innerText = data.summary;
    } else {
      summaryElement.innerText = "❌ Failed to generate summary.";
    }

    if (data.reply) {
      replyElement.innerText = data.reply;
    } else {
      replyElement.innerText = "❌ Failed to generate reply.";
    }

    if (data.reminders && data.reminders.length > 0) {
      remindersElement.innerHTML = "";
      data.reminders.forEach((reminder) => {
        const listItem = document.createElement("li");
        listItem.innerText = reminder;
        remindersElement.appendChild(listItem);
      });
    } else {
      remindersElement.innerHTML = "❌ Failed to generate reminders.";
    }
  } catch (error) {
    console.error("Fetch error:", error);
    summaryElement.innerText = "❌ Error connecting to backend.";
    replyElement.innerText = "❌ Error connecting to backend.";
    remindersElement.innerHTML = "❌ Error connecting to backend.";
  }
}
