// Letter messages
const message = `I don’t even know if you’ll ever read this.\nBut if you do… I just want you to know, I still think about you sometimes.\n\nWe both tried. We both cared. But the universe just never gave us enough space to become “us.”\n\nI just wonder… if we had met at a different point in life, would the ending have been different?\n\nAnyway, I hope you're doing okay, even though we’re not in each other’s lives anymore.`;

// prepare audio
const audio = new Audio("audio/mySong.mp3");

// Allowed date range (UTC) → 24 jam
const allowedStart = new Date("2025-09-08T00:00:00Z"); 
const allowedEnd   = new Date("2025-09-08T23:59:59Z");

// Get global time from API
async function getServerTime() {
  try {
    const res = await fetch("https://worldtimeapi.org/api/ip");
    const data = await res.json();
    return new Date(data.utc_datetime); // Masa global UTC
  } catch (err) {
    console.error("Failed to fetch server time:", err);
    return new Date(); // fallback? guna masa device kalau API gagal
  }
}

// Show letter if valid date
async function showLetter() {
  const now = await getServerTime(); // masa global

  if (now >= allowedStart && now <= allowedEnd) {
    // Correct day to show letter
    document.getElementById("introText").style.opacity = 0;
    document.querySelector(".btn").style.display = "none";

    const letterBox = document.getElementById("letterBox");
    const typedText = document.getElementById("typedText");

    letterBox.style.display = "block";
    typedText.innerHTML = "";

    let i = 0;
    audio.play();

    function typeWriter() {
      if (i < message.length) {
        typedText.innerHTML +=
          message.charAt(i) === "\n" ? "<br>" : message.charAt(i);
        i++;
        setTimeout(typeWriter, 60); // Speed typing
      }
    }

    typeWriter();

  } else if (now < allowedStart) {
    // Too early
    alert("Birthday Damia tak sampai lagi... tunggu 8 October boleh?");
  } else {
    // Too late
    alert("Sorry... Surat ni hanya untuk hari jadi Damia...");
  }
}

