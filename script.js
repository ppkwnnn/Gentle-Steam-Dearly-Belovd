// ฟังก์ชัน เปิด-ปิด หน้า Credit
function toggleCredit() {
    const overlay = document.getElementById('creditOverlay');
    overlay.classList.toggle('active');
}

// ปิด Credit เมื่อคลิกพื้นที่ว่างรอบๆ การ์ด
function closeOverlay(event) {
    if (event.target.id === 'creditOverlay') {
        toggleCredit();
    }
}

const storyData = [
    {
        // ฉากที่ 1: บรรยาย
        bg: "https://img2.pic.in.th/IMG_7830564ed53c7a0bceb1.md.jpeg",
        character: null,
        name: null,
        text: "คุณยืนอยู่หน้าร้านกาแฟที่ดูอบอุ่น กลิ่นหอมจางๆ ของเมล็ดกาแฟทำให้คุณหยุดนิ่ง...",
        choices: [
            { text: "เข้าไปในร้าน", nextStep: 2 }, // ไปสู่ฉาก index 2 (ฉากที่ 3)
            { text: "ไม่เข้าไป", action: "home" } // กลับหน้าหลัก
        ]
    },
    {
        // ฉากที่ 2: (ถ้ามีเนื้อเรื่องคั่นกลาง)
        text: "เนื้อเรื่องระหว่างทาง..."
    },
    {
        // ฉากที่ 3: ฉากในร้านหลังจากเลือกข้อ A
        bg: "https://img2.pic.in.th/IMG_7830564ed53c7a0bceb1.md.jpeg",
        character: "https://img2.pic.in.th/-182_20260411164509.md.png",
        name: "บาริสต้าหนุ่ม",
        text: "ยินดีต้อนรับครับ! กำลังรออยู่พอดีเลย เชิญนั่งก่อนสิครับ"
    }
];

let currentStep = 0;

function renderScene() {
    const scene = storyData[currentStep];
    const nameTag = document.getElementById('name-tag');
    const charImg = document.getElementById('character-img');
    const dialogueText = document.getElementById('dialogue-text');
    const choicesContainer = document.getElementById('choices-container');
    const gameScreen = document.getElementById('game-screen');

    // ล้างค่าตัวเลือกเดิมก่อน
    choicesContainer.innerHTML = "";

    // 1. แสดงพื้นหลังและตัวละคร
    gameScreen.style.backgroundImage = `url(${scene.bg})`;
    charImg.style.display = scene.character ? "block" : "none";
    if (scene.character) charImg.src = scene.character;

    // 2. แสดง Name Tag
    if (scene.name) {
        nameTag.innerText = scene.name;
        nameTag.style.display = "block";
    } else {
        nameTag.style.display = "none";
    }

    // 3. แสดงเนื้อเรื่อง
    dialogueText.innerText = scene.text;

    // 4. สร้างปุ่มตัวเลือก (ถ้ามี)
    if (scene.choices) {
        scene.choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.innerText = choice.text;
            
            button.onclick = () => {
                if (choice.action === "home") {
                    location.reload(); // กลับหน้าหลัก (รีโหลดหน้าเว็บ)
                } else {
                    currentStep = choice.nextStep;
                    renderScene();
                }
            };
            choicesContainer.appendChild(button);
        });
    }
}