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
        bg: "https://img2.pic.in.th/IMG_7830564ed53c7a0bceb1.md.jpeg",
        character: null,
        name: null, // โหมดบรรยาย: ไม่มี name tag
        text: "บานประตูไม้เก่าถูกผลักออกเบาๆ พร้อมกับกระดิ่งทองเหลืองที่ส่งเสียงใสกังวานไปทั่วร้านที่เงียบสงบ..."
    },
    {
        bg: "https://img2.pic.in.th/IMG_7830564ed53c7a0bceb1.md.jpeg",
        character: "https://img2.pic.in.th/-182_20260411164509.md.png",
        name: "บาริสต้าหนุ่ม", // โหมดสนทนา: มี name tag
        text: "อรุณสวัสดิ์ครับ... วันนี้บรรยากาศข้างนอกดูวุ่นวายจังเลยนะครับ สนใจพักดื่มอะไรอุ่นๆ ก่อนไหม?"
    }
];

let currentStep = 0;

function renderScene() {
    const scene = storyData[currentStep];
    const nameTag = document.getElementById('name-tag');
    const charImg = document.getElementById('character-img');
    const dialogueText = document.getElementById('dialogue-text');
    const gameScreen = document.getElementById('game-screen');

    // 1. เปลี่ยน Background
    gameScreen.style.backgroundImage = `url(${scene.bg})`;

    // 2. จัดการ Name Tag และการบรรยาย
    if (scene.name) {
        nameTag.innerText = scene.name;
        nameTag.style.display = "block";
    } else {
        nameTag.style.display = "none";
    }

    // 3. จัดการตัวละคร
    if (scene.character) {
        charImg.src = scene.character;
        charImg.style.display = "block";
    } else {
        charImg.style.display = "none";
    }

    // 4. ใส่เนื้อเรื่อง
    dialogueText.innerText = scene.text;
}

// เรียกใช้งานครั้งแรก
renderScene();