console.log("Atharva");

let audio = new Audio();

async function getdata() {
    let response = await fetch("story.json");
    let story = await response.json();
    console.log(story);
    return story;
}

async function getSongs() {
    let response = await fetch("songs.json");
    let songs = await response.json();
    console.log(songs);
    return songs[0];  // Directly return the first object
}

async function playSong(language) {
    let songs = await getSongs();
    if (language === "hindi") {
        audio.src = songs.hindi;
    } else if (language === "english") {
        audio.src = songs.english;
    }
    audio.play();
}

async function playChapterSong(pageNumber) {
    if (pageNumber >= 30) {
        audio.pause();  // Stop background music at page 30
        return;
    }

    let songs = await getSongs();
    let chapterSongs = {
        2: songs.chapter1,
        4: songs.chapter2,
        8: songs.chapter3,
        11: songs.chapter4,
        13: songs.chapter5,
        17: songs.chapter6,
        19: songs.chapter7,
        22: songs.chapter8
    };

    if (chapterSongs[pageNumber]) {
        audio.src = chapterSongs[pageNumber];
        audio.play();
    }
}

async function showStory(num) {
    let story = await getdata();
    let replacements = {
        "Renuka": `<span class="highlight">Renuka</span>`,
        "renuka": `<span class="highlight">Renuka</span>`,
        "RENUKA": `<span class="highlight">Renuka</span>`,
        "SAMPADA": "Sampada aunty",
        "Unsopken WORDS": `<hr><span class="title">Unsopken <u> WORDS </u></span><hr>`,
        "Chapter 1 :- Tution Classes": `<span class="title">Chapter 1 :-<u> Tution Classes</u></span>`,
        "Chapter 2 : The Good Childhood": `<span class="title">Chapter 2 :-<u> The Good Childhood</u></span>`,
        "Chapter 3 - The shift in the feelings & The Silent Years": `<span class="title">Chapter 3 :-<u> The shift in the feelings & The Silent Years</u></span>`,
        "CHAPTER 4- The Roumers and Decision": `<span class="title">CHAPTER 4 :-<u> The Roumers and Decision</u></span>`,
        "CHAPTER 5- The Confrontation": `<span class="title">CHAPTER 5 :-<u> The Confrontation</u></span>`,
        "Chapter 6 - Emotional Struggle": `<span class="title">Chapter 6 :-<u> Emotional Struggle</u></span>`,
        "CHAPTER 7- The Confrontation 2.0": `<span class="title">CHAPTER 7 :-<u> The Confrontation 2.0</u></span>`,
        "CHAPTER 8 Conclusion.. maybe": `<span class="title">CHAPTER 8 :-<u> Conclusion.. maybe</u></span>`
    };

    let key = "page" + num;
    let xop = story[0][key] || "Content not found";
    let content = xop.replace(/Renuka|RENUKA|renuka|SAMPADA|Unsopken WORDS|Chapter 1 :- Tution Classes|Chapter 2 : The Good Childhood|Chapter 3 - The shift in the feelings & The Silent Years|CHAPTER 4- The Roumers and Decision|CHAPTER 5- The Confrontation|Chapter 6 - Emotional Struggle|CHAPTER 7- The Confrontation 2.0|CHAPTER 8 Conclusion.. maybe/g, match => replacements[match]);

    let clear = document.querySelector(".text");
    clear.innerHTML = "";
    let text = document.createElement("p");
    text.innerHTML = content;
    document.querySelector(".text").append(text);

    // If on page 30, add Hindi & English buttons dynamically
    if (num === 30) {
        let hindibtn = document.createElement("div");
        hindibtn.innerHTML = `<br><button class="hindi">Hindi Song</button>`;
        hindibtn.addEventListener("click", () => playSong("hindi"));
        document.querySelector(".text").append(hindibtn);

        let englishbtn = document.createElement("div");
        englishbtn.innerHTML = `<br><button class="english">English Song</button>`;
        englishbtn.addEventListener("click", () => playSong("english"));
        document.querySelector(".text").append(englishbtn);
    }

    // Play background music based on chapter (Stops at page 30)
    playChapterSong(num);
}

async function main() {
    let password = prompt("Enter password")
    if (password == "ddskdhf123") {
        let ao = Number(prompt("Want to play songs? Yes(1) / No(0)"));
        let i = 1;
        showStory(i);

        let final_num = 30;
        let lowest_num = 0;

        let btnR = document.querySelector(".right");
        let btnL = document.querySelector(".left");

        btnR.addEventListener("click", () => {
            if (i >= final_num) {
                alert("Page over");
            } else {
                console.log("clicked");
                i++;
                showStory(i);
                console.log(i)
            }
        });

        btnL.addEventListener("click", () => {
            if (i <= lowest_num + 1) {
                alert("Go forward");
            } else {
                console.log("clicked");
                i--;
                showStory(i);
                console.log(i)
            }
        });

        // If the user chooses to play songs, start background music from chapter 1
        if (ao === 1) {
            playChapterSong(i);
        }
    }else{
        alert("Eror")
    }
}

main();