const message = `I don’t even know if you’ll ever read this.\nBut if you do… I just want you to know, I still think about you sometimes.\n\nWe both tried. We both cared. But the universe just never gave us enough space to become “us.”\n\nI just wonder… if we had met at a different point in life, would the ending have been different?\n\nAnyway, I hope you're doing okay, even though we’re not in each other’s lives anymore.`;

// prepare audio
const audio = new Audio("audio/mySong.mp3");

// 🎯 Allowed special day (YYYY, MM-1, DD)
const allowedDate = new Date(2025, 3, 6); // Feb 14, 2025

function showLetter() {
  const now = new Date();

  const isSameDay =
    now.getFullYear() === allowedDate.getFullYear() &&
    now.getMonth() === allowedDate.getMonth() &&
    now.getDate() === allowedDate.getDate();

  if (isSameDay) {
    // ✅ Correct day → show letter
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
        setTimeout(typeWriter, 60);
      }
    }

    typeWriter();
  } else if (now < allowedDate) {
    // ⏳ Too early
    alert("Not yet... come back on February 14, 2025 ❤");
  } else {
    // ⛔ Too late
    alert("Sorry... the letter was only available on February 14, 2025. The moment has passed 💔");
  }
}





