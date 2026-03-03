const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((data) => displayLesson(data.data));
};
loadLessons();

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById("level_container");
    levelContainer.innerHTML = "";

    lessons.map((lesson) => {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `<button id="lesson_btn_${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-primary btn-outline lesson">
                        <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}
                    </button>`;
        levelContainer.append(btnDiv);
    });
};

const loadLevelWord = (id) => {
    manageSpniner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const clickBtn = document.getElementById(`lesson_btn_${id}`);
            removeActive();
            clickBtn.classList.add("active");
            displayLevelWord(data.data);
        });
};

const removeActive = () => {
    const activeBtn = document.querySelectorAll(".lesson");
    activeBtn.forEach((item) => item.classList.remove("active"));
};

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word_container");
    wordContainer.innerHTML = "";

    if (!words.length) {
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
        `;
        manageSpniner(false)
        return;
    }

    words.forEach((word) => {
        const card = document.createElement("div");
        card.innerHTML = `
                    <div
                class="bg-base-100 h-auto sm:h-[420px] rounded-xl shadow-sm text-center py-[56px] px-[64px] space-y-6"
            >
                <h2 class="text-[32px] font-bold">${!word.word ? `শব্দ পাওয়া যাই নি!` : `${word.word}`}</h2>
                <p class="text-[20px] font-medium">Meaning/Pronunciation</p>
                <h2
                    class="text-[32px] font-semibold text-neutral/80 font_bangla"
                >
                    " ${!word.meaning ? `অর্থ পাওয়া যাই নি!` : `${word.meaning} / ${word.pronunciation}`} "
                </h2>
                <div class="flex justify-between items-center mt-[69px]">
                    <button
                        onclick="loadWordDetail(${word.id})"
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
        `;
        wordContainer.append(card);
    });
    manageSpniner(false)
};

const loadWordDetail = async (id) => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/word/${id}`,
    );
    const detail = await res.json();
    displayDetail(detail.data);
};

const displayDetail = (words) => {
    const modalContent = document.getElementById("modal_content");
    console.log(words);
    modalContent.innerHTML = `
     <div class="space-y-6">
       <h2 class="text-[36px] font-bold">${words.word} (<i class="fa-solid fa-microphone-lines"></i> ${
           words.partsOfSpeech
       })</h2>
       <div class="space-y-3">
        <h2 class="text-[24px] font-semibold">Meaning</h2>
        <p class="text-[24px] font-medium font_bangla">${words.meaning}</p>
       </div>

       <div class="space-y-3">
        <h2 class="text-[24px] font-semibold">Example</h2>
        <p class="text-[18px] font-medium">${words.sentence}</p>
       </div>

       <div class="space-y-3">
        <h2 class="text-[24px] font-semibold font_bangla">সমার্থক শব্দ গুলো</h2>
        <div class="flex space-x-2">
    ${words.synonyms.map((word) => `<button class="capitalize bg-primary/20 text-neutral border border-base-300 px-3 py-2 rounded-lg">${word}</button>`).join("")}
  </div>
       </div>
     </div>
    `;
    document.getElementById("Word_modal").showModal();
};

const manageSpniner = (status) => {
    if (status === true) {
        document.getElementById("loading").classList.remove("hidden");
        document.getElementById("word_container").classList.add("hidden");
    } else {
        document.getElementById("word_container").classList.remove("hidden");
        document.getElementById("loading").classList.add("hidden");
    }
};
