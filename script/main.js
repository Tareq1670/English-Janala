const loadLessons = () =>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(data => displayLesson(data.data))
}
loadLessons();

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById("level_container")
    levelContainer.innerHTML = "";

    lessons.map(lesson => {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `<button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-primary btn-outline">
                        <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}
                    </button>`
         levelContainer.append(btnDiv)
    })
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayLevelWord(data.data))
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word_container");
    wordContainer.innerHTML = "";

    if(!words.length){
        wordContainer.innerHTML = `
        <div class="text-center space-y-3">
                <img class="mx-auto" src="assets/alert-error.png" alt="">
                <p class="text-[13px] text-neutral/60 font_bangla">
                    এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
                </p>
                <h2 class="text-[34px] text-neutral font-medium font_bangla">
                    নেক্সট Lesson এ যান
                </h2>
            </div>
        `
    }
    

    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
                    <div
                class="bg-base-100 h-auto sm:h-[420px] rounded-xl shadow-sm text-center py-[56px] px-[64px] space-y-6"
            >
                <h2 class="text-[32px] font-bold">${!word.word?`শব্দ পাওয়া যাই নি!`:`${word.word}`}</h2>
                <p class="text-[20px] font-medium">Meaning/Pronunciation<</p>
                <h2
                    class="text-[32px] font-semibold text-neutral/80 font_bangla"
                >
                    " ${!word.meaning?`অর্থ পাওয়া যাই নি!`:`${word.meaning} / ${word.pronunciation}`} "
                </h2>
                <div class="flex justify-between items-center mt-[69px]">
                    <button
                        class="bg-info/10 rounded-md p-4 cursor-pointer hover:bg-blue-300 transition-all duration-300 ease-in-out"
                    >
                        <i class="fa-solid fa-circle-info text-[24px]"></i>
                    </button>
                    <button
                        class="bg-info/10 rounded-md p-4 cursor-pointer hover:bg-blue-300 transition-all duration-300 ease-in-out"
                    >
                        <i class="fa-solid fa-volume-high text-[24px]"></i>
                    </button>
                </div>
            </div>
        `
        wordContainer.append(card);
    });
}