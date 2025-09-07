// Letter messages
const message = `I don’t even know if you’ll ever read this.\nBut if you do… I just want you to know, I still think about you sometimes.\n\nWe both tried. We both cared. But the universe just never gave us enough space to become “us.”\n\nI just wonder… if we had met at a different point in life, would the ending have been different?\n\nAnyway, I hope you're doing okay, even though we’re not in each other’s lives anymore.`;

// Prepare audio
const audio = new Audio("audio/mySong.mp3");

// Allowed special day (YYYY, MM-1, DD)  8 Oktober 2025
const allowedDate = new Date(2025, 9, 8); 

// --- Dapatkan masa server ---
async function getServerTime() {
  try {
    const response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kuala_Lumpur");
    const data = await response.json();
    return new Date(data.datetime); // masa dari server
  } catch (e) {
    console.error("Gagal dapat masa server, fallback ke masa local.");
    return new Date(); // fallback kalau API gagal
  }
}

// --- Show letter ---
async function showLetter() {
  const now = await getServerTime(); // guna masa server

  const isSameDay =
    now.getFullYear() === allowedDate.getFullYear() &&
    now.getMonth() === allowedDate.getMonth() &&
    now.getDate() === allowedDate.getDate();

  if (isSameDay) {
    // Betul hari → tunjuk surat
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
        setTimeout(typeWriter, 60); // kelajuan typewriter
      }
    }

    typeWriter();
  } else if (now < allowedDate) {
    // Terlalu awal
    alert("Birthday Damia tak sampai lagi... tunggu 8 Oktober boleh?");
  } else {
    // Terlambat
    alert("Sorry... Surat ni hanya untuk hari jadi Damia...");
  }
}
