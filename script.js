const nav = document.getElementById("mainNav");
const menuToggle = document.getElementById("menuToggle");
const moreToggle = document.getElementById("moreToggle");
const moreMenu = document.getElementById("moreMenu");
const music = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");

function showPageFromHash() {
  const id = (location.hash || "#home").slice(1);
  const target = document.getElementById(id) || document.getElementById("home");
  document.querySelectorAll(".page").forEach(page => page.classList.toggle("active-page", page === target));
  document.querySelectorAll(".nav-link").forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + id));
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  moreMenu.classList.remove("open");
  moreToggle.setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
window.addEventListener("hashchange", showPageFromHash);
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener("click", () => {
  if (link.getAttribute("href") === location.hash) showPageFromHash();
}));
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
// Music Player
document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("background-music");
    const musicToggle = document.getElementById("music-toggle");

    if (!music || !musicToggle) {
        console.error("Music player or button was not found.");
        return;
    }

    musicToggle.addEventListener("click", async () => {
        try {
            if (music.paused) {
                await music.play();
                musicToggle.textContent = "❚❚";
                musicToggle.setAttribute("aria-label", "Pause music");
            } else {
                music.pause();
                musicToggle.textContent = "▶";
                musicToggle.setAttribute("aria-label", "Play music");
            }
        } catch (error) {
            console.error("Music playback error:", error);
            alert("The music could not play. Check your music file path and format.");
        }
    });

    music.addEventListener("error", () => {
        console.error("Music file failed to load:", music.currentSrc);
    });

    music.addEventListener("ended", () => {
        musicToggle.textContent = "▶";
    });
});
moreToggle.addEventListener("click", () => {
  const open = moreMenu.classList.toggle("open");
  moreToggle.setAttribute("aria-expanded", String(open));
});
document.addEventListener("click", event => {
  if (!event.target.closest("#moreToggle") && !event.target.closest("#moreMenu")) {
    moreMenu.classList.remove("open");
    moreToggle.setAttribute("aria-expanded", "false");
  }
});

const reasons = [
  "Your smile.",
  "Your sense of humor.",
  "How comfortable you make me feel.",
  "The way you tell stories.",
  "You're genuine and real.",
  "You notice little things.",
  "You're easy to talk to.",
  "You can make a simple chat feel special.",
  "I enjoy learning more about you.",
  "Your own way of seeing things.",
  "The way you share your thoughts.",
  "Your curiosity about things.",
  "You make me look forward to our talks.",
  "You have your own personality.",
  "You can be funny without even trying.",
  "I like hearing about your day.",
  "You make ordinary moments feel less ordinary.",
  "Your honesty.",
  "The little details you remember.",
  "The way you react to funny things.",
  "You give me new things to think about.",
  "I can be myself when we talk.",
  "You make me smile at my screen.",
  "Your thoughtful replies.",
  "The way our conversations flow.",
  "You have stories worth listening to.",
  "I like discovering your interests.",
  "You bring a good energy to our chats.",
  "Your perspective is interesting to me.",
  "I like how different we can be.",
  "You make me curious to know more.",
  "You don't need to pretend to be someone else.",
  "Your little jokes.",
  "The way you express yourself.",
  "I appreciate the time you give our conversations.",
  "You make me want to listen carefully.",
  "You have a side I still want to discover.",
  "I like the small surprises in our talks.",
  "Your enthusiasm when you talk about something you like.",
  "You make me appreciate simple conversations.",
  "You have your own kind of charm.",
  "You can make me laugh unexpectedly.",
  "I like hearing your opinions.",
  "You remind me that getting to know someone takes time.",
  "You make me want to be more thoughtful.",
  "You have little habits that make you you.",
  "You bring warmth to a conversation.",
  "I like the way you explain things.",
  "You make me want to ask more questions.",
  "Your individuality.",
  "You make a chat feel like a shared moment.",
  "I like your playful side.",
  "You can be both funny and thoughtful.",
  "I appreciate when you share something personal.",
  "You have a lot more to you than first impressions.",
  "I like the way you keep a conversation going.",
  "Your random thoughts can be interesting.",
  "You make me notice the little things too.",
  "I like learning what makes you happy.",
  "You have your own way of making things memorable.",
  "You inspire me to be sincere.",
  "I like when we find something to laugh about.",
  "You make me want to understand, not assume.",
  "You can turn a random topic into a good talk.",
  "I appreciate your point of view.",
  "You make getting to know you feel worthwhile.",
  "I like the little details in your stories.",
  "You give me reasons to be excited for another chat.",
  "You can make a quiet moment feel comfortable.",
  "I like that there's still so much to learn about you.",
  "You make me value patience.",
  "I like your way of looking at everyday things.",
  "You make me want to remember what you tell me.",
  "Your personality keeps me interested.",
  "You make me appreciate being present.",
  "I like how every conversation can be different.",
  "You make me smile in small ways.",
  "You remind me not to rush good things.",
  "I like the things that make you unique.",
  "You give me a reason to be a little braver.",
  "I enjoy the person I'm getting to know.",
  "You make sincerity feel important.",
  "I like sharing little moments with you.",
  "You make me want to show care through actions.",
  "I appreciate the chance to know you.",
  "You make me want to be a better listener.",
  "I like that our story is still being written.",
  "You make small conversations worth remembering.",
  "I admire the parts of yourself you choose to share.",
  "You make me happy I said hello.",
  "I like your energy when you're being yourself.",
  "You make me want to know your dreams.",
  "I like the possibility of making memories together.",
  "You deserve to be treated with kindness.",
  "I want to respect your pace and your feelings.",
  "I like who you are, not an idea of who you should be.",
  "I'm grateful our paths crossed.",
  "Getting to know you has been a lovely surprise.",
  "Because you're Lovern, and that's already special to me."
];
const reasonGrid = document.getElementById("reasonGrid");
const reasonCount = document.getElementById("reasonCount");
const openedReasons = new Set();

reasons.forEach((reason, index) => {
  const card = document.createElement("button");
  card.className = "reason-card";
  card.type = "button";
  card.setAttribute("aria-label", `Reveal reason ${index + 1}`);
  card.innerHTML = `<span class="num">${index + 1}</span><span class="reason-text">Tap to reveal ♡</span>`;
  card.addEventListener("click", () => {
    const revealed = card.classList.toggle("revealed");
    card.querySelector(".reason-text").textContent = revealed ? reason : "Tap to reveal ♡";
    if (revealed) openedReasons.add(index); else openedReasons.delete(index);
    reasonCount.textContent = openedReasons.size;
  });
  reasonGrid.appendChild(card);
});
document.getElementById("showMoreReasons").addEventListener("click", () => {
  const cards = [...document.querySelectorAll(".reason-card")];
  const allShown = cards.every(card => card.classList.contains("revealed"));
  cards.forEach((card, index) => {
    card.classList.toggle("revealed", !allShown);
    card.querySelector(".reason-text").textContent = allShown ? "Tap to reveal ♡" : reasons[index];
    if (allShown) openedReasons.delete(index); else openedReasons.add(index);
  });
  reasonCount.textContent = openedReasons.size;
  document.getElementById("showMoreReasons").textContent = allShown ? "Show all reasons ♡" : "Hide all reasons ♡";
});

const letters = {
  sad: ["For a hard day ♡", "Hey, Lovern. I'm sorry today feels heavy. You don't have to fix everything at once, and you don't have to pretend you're okay. Take your time, breathe, and be gentle with yourself. I hope tomorrow feels a little lighter. 🌷"],
  encouragement: ["You've got this ♡", "Just a reminder that you don't have to do everything perfectly to be doing your best. Take things one step at a time. I believe you can get through this, and I hope you give yourself credit for trying."],
  sleep: ["Before you rest ♡", "Put the worries down for tonight if you can. You've done enough for one day. Get comfortable, take a slow breath, and let yourself rest. I hope you have a peaceful sleep and wake up feeling a little better. 🌙"],
  miss: ["A little smile for you ♡", "Here's your reminder to smile, even if it's just a tiny one. Somewhere out there, someone is glad they got to know you. I hope something good happens to you today—something simple that makes you happy."],
  appreciated: ["You matter ♡", "You don't need to prove your worth by doing everything for everyone. You deserve kindness, patience, respect, and care just as you are. I hope the people around you remind you of that, and I hope you remember it too."]
};
document.querySelectorAll(".envelope").forEach(button => button.addEventListener("click", () => {
  const [title, text] = letters[button.dataset.letter];
  document.getElementById("letterTitle").textContent = title;
  document.getElementById("letterText").textContent = text;
  document.getElementById("letterReveal").hidden = false;
  document.getElementById("letterReveal").scrollIntoView({ behavior: "smooth", block: "center" });
}));
document.getElementById("closeLetter").addEventListener("click", () => {
  document.getElementById("letterReveal").hidden = true;
});

const responseMessage = document.getElementById("responseMessage");
document.getElementById("yesButton").addEventListener("click", () => {
  responseMessage.hidden = false;
  responseMessage.textContent = "That means a lot to me, Lovern. ♡ Let's talk about it and take things one step at a time. (This button only shows this message on the website—it does not send me a notification.)";
});
document.getElementById("maybeButton").addEventListener("click", () => {
  responseMessage.hidden = false;
  responseMessage.textContent = "Of course, Lovern. No rush at all. I'd be happy to talk whenever you're comfortable. Thank you for being honest. ♡ (This button only shows this message on the website—it does not send me a notification.)";
});


showPageFromHash();
