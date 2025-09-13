// Letter messages
const message = `I don’t even know if you’ll ever read this.\nBut if you do… I just want you to know, I still think about you sometimes.\n\nWe both tried. We both cared. But the universe just never gave us enough space to become “us.”\n\nI just wonder… if we had met at a different point in life, would the ending have been different?\n\nAnyway, I hope you're doing okay, even though we’re not in each other’s lives anymore.`;

// Ini teks surat yang akan ditaip satu-satu (guna effect typewriter)
// "\n" digunakan untuk buat baris baru (newline)

// Prepare audio
const audio = new Audio("audio/mySong.mp3");

// Sediakan audio/music yang akan main bila surat dibuka
// Lokasi file "audio/mySong.mp3"

// Allowed range (24 jam penuh pada 8 Okt 2025)
const allowedStart = new Date("2025-10-08T00:00:00+08:00"); 
const allowedEnd   = new Date("2025-10-08T23:59:59+08:00");

// Tentukan masa bila surat boleh dibuka
// Start: 8 Okt 2025 jam 00:00 (tengah malam)
// End:   8 Okt 2025 jam 23:59 (hujung hari)
// "+08:00" maksudnya ikut timezone Malaysia (GMT+8)

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

// Function ini minta masa sebenar dari server (worldtimeapi.org)
// Jadi kalau orang tukar masa phone/laptop → tak boleh tipu
// Kalau API gagal loading → fallback ke masa local device

// --- Show letter ---
async function showLetter() {
  const now = await getServerTime(); // guna masa server

  if (now >= allowedStart && now <= allowedEnd) {
    // kalau sekarang dalam range (antara 00:00 – 23:59 tarikh tu)

    document.getElementById("introText").style.opacity = 0;
    // hilangkan teks intro

    document.querySelector(".btn").style.display = "none";
    // hilangkan  butang "Read it"

    const letterBox = document.getElementById("letterBox");
    const typedText = document.getElementById("typedText");

    letterBox.style.display = "block";
    typedText.innerHTML = "";

    let i = 0;
    audio.play(); 
    // Mainkan lagu

    // --- Effect typewriter ---
    function typeWriter() {
      if (i < message.length) {
        typedText.innerHTML +=
          message.charAt(i) === "\n" ? "<br>" : message.charAt(i);
        // Kalau jumpa "\n" → tukar jadi <br> (line break)
        // Kalau huruf biasa → terus tambah

        i++;
        setTimeout(typeWriter, 60); // delay 60ms
      }
    }

    typeWriter(); // start typrWriter

  } else if (now < allowedStart) {
    alert("Birthday Damia tak sampai lagi... tunggu 8 Oktober boleh?");
    // Kalau user cuba buka lebih awal
  } else {
    alert("Sorry... Surat ni hanya untuk hari jadi Damia...");
    // Kalau user cuba buka selepas tarikh berlalu
  }
}
