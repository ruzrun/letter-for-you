const message = I don’t even know if you’ll ever read this.\nBut if you do… I just want you to know, I still think about you sometimes.\n\nWe both tried. We both cared. But the universe just never gave us enough space to become “us.”\n\nI just wonder… if we had met at a different point in life, would the ending have been different?\n\nAnyway, I hope you're doing okay, even though we’re not in each other’s lives anymore.;

// prepare audio (place your file inside /audio/mySong.mp3)
const audio = new Audio("audio/mySong.mp3");

function showLetter() {
  // fade out intro + hide button
  document.getElementById("introText").style.opacity = 0;
  document.querySelector(".btn").style.display = "none";

  // wait before showing letter
  setTimeout(() => {
    const letterBox = document.getElementById("letterBox");
    const typedText = document.getElementById("typedText");

    letterBox.style.display = "block";
    typedText.innerHTML = ""; // reset if clicked again

    let i = 0;

    // play music once letter starts
    audio.play();

    // typing effect
    function typeWriter() {
      if (i < message.length) {
        typedText.innerHTML +=
          message.charAt(i) === "\n" ? "<br>" : message.charAt(i);
        i++;
        setTimeout(typeWriter, 30); // typing speed
      }
    }

    typeWriter();
  }, 600);
}
