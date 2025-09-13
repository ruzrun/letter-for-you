// Letter messages
const message = `I don’t even know if you’ll ever read this.\nBut if you do… I just want you to know, I still think about you sometimes.\n\nWe both tried. We both cared. But the universe just never gave us enough space to become “us.”\n\nI just wonder… if we had met at a different point in life, would the ending have been different?\n\nAnyway, I hope you're doing okay, even though we’re not in each other’s lives anymore.`;

// Prepare audio 
const audio = new Audio("audio/mySong.mp3");
audio.loop = true; // audio akan repeat

// Allowed range (24 jam penuh pada 8 Okt 2025)
const allowedStart = new Date("2025-09-14T00:00:00+08:00"); 
const allowedEnd   = new Date("2025-09-14T23:59:59+08:00");

// masa bila surat boleh dibuka
// start: 8 Okt 2025 jam 00:00
// end:   8 Okt 2025 jam 23:59
// "+08:00" timezone Malaysia (GMT+8)

// masa server
async function getServerTime() {
  try {
    const response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kuala_Lumpur");
    const data = await response.json();
    return new Date(data.datetime); // masa server
  } catch (e) {
    console.error("Gagal dapat masa server, fallback ke masa local.");
    return new Date(); // fallback kalau API gagal
  }
}

// Function ini minta masa dari server (worldtimeapi.org)
// Jadi kalau orang tukar masa phone/laptop - tak boleh nak tipu
// Kalau API gagal loading - fallback ke masa local device

// show letter
async function showLetter() {
  const now = await getServerTime(); // guna masa server

  if (now >= allowedStart && now <= allowedEnd) {
    // kalau sekarang dalam range (antara 00:00 – 23:59 tarikh tu)

    document.getElementById("introText").style.opacity = 0; // hilangkan introText

    document.querySelector(".btn").style.display = "none"; // hilangkan  button "Read it"

    const letterBox = document.getElementById("letterBox");
    const typedText = document.getElementById("typedText");

    letterBox.style.display = "block";
    typedText.innerHTML = "";

    let i = 0;
    audio.play(); // start lagu

    // Effect typewriter
    function typeWriter() {
      if (i < message.length) {
        typedText.innerHTML +=
          message.charAt(i) === "\n" ? "<br>" : message.charAt(i);
        // Kalau jumpa "\n" - tukar jadi <br> (line break)
        // Kalau huruf biasa - terus tambah

        i++;
        setTimeout(typeWriter, 60); // delay 60ms
      }
    }

    typeWriter(); // start typeWriter

  } else if (now < allowedStart) {
    alert("Birthday Damia tak sampai lagi... tunggu 8 Oktober boleh?");
    // Kalau bukak awal
  } else {
    alert("Sorry... Surat ni hanya untuk hari jadi Damia...");
    // Kalau bukak selepas tarikh dah lepas
  }
}



