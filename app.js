console.log("Atharva")
let audio = new Audio()
async function getdata() {
    let response = await fetch("story.json")
    let story = await response.json();
    console.log(story)
    return story;
}

async function showStory(num) {
    let story = await getdata();
    let replacements = {
        "Renuka": `<span class = "highlight">Renuka</span>`,
        "renuka": `<span class = "highlight">Renuka</span>`,
        "RENUKA": `<span class = "highlight">Renuka</span>`,
        "SAMPADA": "Sampada aunty",
        "Unsopken WORDS" : `<hr><span class = "title">Unsopken <u> WORDS </u></span><hr>`,
        "Chapter 1 :- Tution Classes" : `<span class = "title">Chapter 1 :-<u> Tution Classes</u></span>`,
        "Chapter 2 : The Good Childhood" : `<span class = "title">Chapter 2 :-<u> The Good Childhood</u></span>`,
        "Chapter 3 - The shift in the feelings & The Silent Years" : `<span class = "title">Chapter 3 :-<u> The shift in the feelings & The Silent Years</u></span>`,
        "CHAPTER 4- The Roumers and Decision" : `<span class = "title">CHAPTER 4 :-<u> The Roumers and Decision</u></span>`,
        "CHAPTER 5- The Confrontation" : `<span class = "title">CHAPTER 5 :-<u> The Confrontation</u></span>`,
        "Chapter 6 - Emotional Struggle" : `<span class = "title">Chapter 6 :-<u> Emotional Struggle</u></span>`,
        "CHAPTER 7- The Confrontation 2.0" : `<span class = "title">CHAPTER 7 :-<u> The Confrontation 2.0</u></span>`,
        "CHAPTER 8 Conclusion.. maybe" : `<span class = "title">CHAPTER 8 :-<u> Conclusion.. maybe</u></span>`

    };
    let key = "page" + num
    let xop =  story[0][key]
    let content = xop.replace(/Renuka|RENUKA|renuka|SAMPADA|Unsopken WORDS|Chapter 1 :- Tution Classes|Chapter 2 : The Good Childhood|Chapter 3 - The shift in the feelings & The Silent Years|CHAPTER 4- The Roumers and Decision|CHAPTER 5- The Confrontation|Chapter 6 - Emotional Struggle|CHAPTER 7- The Confrontation 2.0|CHAPTER 8 Conclusion.. maybe/g, match => replacements[match])
    
    let clear = document.querySelector(".text")
    clear.innerHTML = ""
    let text = document.createElement("p")
    text.innerHTML = content
    document.querySelector(".text").append(text)
    console.log(story[0][key])
}
async function PlaySong() {
    let response = await fetch("songs.json")
    let songs =  await response.json()
    console.log(songs)
    return songs
    
}

async function main() {
    let songs = await PlaySong()
    let i = 1;
    showStory(i);
    let final_num = 30;
    let lowest_num = 0
    let btnR = document.querySelector(".right")
    btnR.addEventListener("click", () => {
        if (i > final_num - 1) {
            alert("Page over")
        } else {
            console.log("clicked")
            i = i + 1
            showStory(i);
            console.log(i)
        }
    })
    let btnL = document.querySelector(".left")
    btnL.addEventListener("click", () => {
        if (i == lowest_num + 1 ) {
            alert("go forward")
        } else {
            console.log("clicked")
            i = i - 1
            showStory(i);
            console.log(i)
        }
    })
    if(i >= 2) {
        audio.src = songs[0].chapter3
        audio.play()
    }
        
    


}

main();

