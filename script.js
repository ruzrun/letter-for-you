// Letter messages
const message = `Happy birthday, Damia.\n\nni first time warun wish damia birthday, warun nak jadikan this letter something yang special.\nDamia mungkin tahu yang warun suka Damia, dan itu memang betul.\nwarun nak bagitahu yang warun ada feeling dekat damia sejak form 2 lagi, tau tau sekarang dah form 4.\nSelama tu, perasaan ini banyak ajar warun... tentang sabar, tentang menghargai seseorang, tentang usaha untuk menjadi lebih baik setiap hari and banyak lagi.\nwalau kita tak pernah sembang, damia tetap seseorang yang jadi inspiration untuk warun.\nCara damia jaga diri, cara damia serius bila buat sesuatu, cara damia bimbing orang lain and banyak lagi, semua ni buat warun kagum dengan damia.\n\nWarun wish tahun ni damia dapat straight A kat UASA, dapat kawan kawan yang baik dan hari hari yang buat damia selalu happy. warun harap setiap hari damia rasa dihargai, rasa tenang and selalu bangga dengan diri sendiri sebab damia memang layak dapat semua tu.\n\nwarun tulis surat ni bukan untuk buat damia tak selesa ke apa, warun cuma nak luah kan perasaan warun yang warun simpan selama ni, walaupun sejak form 2, rasa macam kejap je masa berlalu and warun tulis surat ni untuk lepaskan perasaan ni slow slow. walaupun susah, tapi at least warun jujur dengan damia apa yang warun rasa. Satu hari nanti, mungkin semua ni cuma kenangan untuk warun, walaupun cuma kenangan, warun tahu satu hari nanti bila warun ingat balik, warun akan senyum, bukan sebab sedih, tapi sebab bersyukur pernah rasa semua ni.\n\nTerima kasih Damia, sebab pernah jadi seseorang yang special dalam hidup warun, walaupun hanya dari jauh.\n\nHappy Birthday Damia. May Allah always guide you to be a better person.\n
`;

// Prepare audio 
const audio = new Audio("audio/mySong.mp3");
audio.loop = true; // audio akan repeat

// Allowed range (24 jam penuh pada 8 Okt 2025)
const allowedStart = new Date("2025-10-02T00:00:00+08:00"); 
const allowedEnd   = new Date("2025-10-08T23:59:59+08:00");

// masa bila surat boleh dibuka
// start: 8 Okt 2025 jam 00:00
// end:   8 Okt 2025 jam 23:59
// "+08:00" timezone Malaysia (GMT+8)

// masa server
async function getServerTime() {
  try {
    const response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kuala_Lumpur");
    const data = await response.json();
    return new Date(data.datetime); // masa server (global)
  } catch (e) {
    console.error("Gagal dapat masa server, fallback ke masa local.");
    return new Date(); // fallback kalau API gagal
  }
}

// Function ini hanya untuk masa dari server (worldtimeapi.org)
// Kalau orang tukar masa kat phone/laptop - tak boleh nak tipu
// Kalau API tak boleh loading - fallback ke masa local device

async function logVisit(note) {
  try {
    await fetch("https://script.google.com/macros/s/AKfycbwKpDkzed_La6bGbtC8gT32JlFQIMMnT8Tn1zvaFzFmzExpVwnX5yl8mOmhZdpCJO-K/exec", {
      method: "POST",
      body: JSON.stringify({ message: note }),
      headers: { "Content-Type": "application/json" },
      mode: "no-cors" // untuk elak CORS error
    });
  } catch (err) {
    console.error("Log failed:", err);
  }
}

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
    
    // jika di bukak google sheet detect 
    logVisit("Opened");
     

    // Effect typeWriter
    function typeWriter() {
      if (i < message.length) {
        typedText.innerHTML +=
          message.charAt(i) === "\n" ? "<br>" : message.charAt(i);
        // Kalau jumpa "\n" - tukar jadi <br> (line break)
        // Kalau huruf biasa - terus tambah

        i++;
        setTimeout(typeWriter, 70); // delay 70ms - untuk tulisan 
      }
    }

    typeWriter(); // typeWriter start

  } else if (now < allowedStart) {
    alert("Birthday Damia tak sampai lagi... tunggu 8 Oktober boleh?");
    // Kalau bukak awal
  } else {
    alert("Sorry... Surat ni hanya untuk hari jadi Damia...");
    // Kalau bukak selepas tarikh dah lepas
  }
}

//Thanks you Damia... You will always be my favourite incomplete wish














