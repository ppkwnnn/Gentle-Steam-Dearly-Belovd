// Story Data Structure
const storyData = {
    scene1: {
        bg: 'https://img2.pic.in.th/IMG_7826.md.jpeg',
        type: 'narration',
        narration: 'หลังจากผ่านมรสุมความเหนื่อยล้ามาทั้งสัปดาห์ในที่สุดวันหยุดที่เฝ้าฝันถึงเสียที คุณไม่อยากปล่อยให้เวลาอันมีค่านี้หมดไปกับการนอนซึมอยู่บนเตียง จึงตัดสินใจก้าวเท้าออกจากบ้านเพื่อสูดอากาศบริสุทธิ์ แสงแดดอ่อน ๆ ยามเช้าชวนให้รู้สึกดีไม่น้อย แต่สิ่งเดียวที่ขาดไปในตอนนี้คือเครื่องดื่มดี ๆ สักแก้วที่จะมาเติมเต็มในวันหยุดของคุณ',
        nextScene: 'scene2'
    },
    scene2: {
        bg: 'https://img2.pic.in.th/IMG_7825a630c755af16e393.md.jpeg',
        type: 'narration-then-dialogue',
        narration: 'คุณเดินผ่านย่านการค้าที่คึกคัก ร้านค้าเรียงรายมากมายอยู่ตามข้างทาง แต่กลับไม่มีร้านไหนที่ดึงดูดใจคุณได้เลย จนกระทั่ง ขาของคุณหยุดชะงักลงที่หน้าร้านกาแฟเล็ก ๆ ร้านหนึ่ง มันดูเรียบง่าย ไม่ได้หวือหวา แต่มันกลับให้ความรู้สึกอบอุ่นอย่างบอกไม่ถูก กลิ่นหอมจาง ๆ ของเมล็ดกาแฟที่ลอยมาแตะจมูก ชวนให้คุณนึกถึงความทรงจำเก่า ๆ ที่เกือบจะลืมเลือนไป ความรู้สึกชวนให้คิดถึงบางอย่างหรือใครบางคนที่ไม่ได้เจอมานาน ยืนมองอยู่หน้าร้านอยู่สักพักกำลังตัดสินใจว่าจะเข้าไปดีไหม',
        characterName: 'Y',
        dialogue: 'อืมจะลองเข้าไปดีมั้ยนะ ?',
        choices: {
            1: { text: 'เข้าไปในร้าน', nextScene: 'scene3' },
            2: { text: 'ไม่เข้าไป', nextScene: 'menu' }
        }
    },
    scene3: {
        bg: 'https://img2.pic.in.th/IMG_7825a630c755af16e393.md.jpeg',
        type: 'narration',
        narration: 'ทันทีที่คุณผลักประตูเข้าไป เสียงกระดิ่งทองเหลืองเหนือหัวก็ดัง \'กรุ๊งกริ๊ง\' ต้อนรับอย่างสดใส กลิ่นกาแฟคั่วบดโอบล้อมตัวคุณไว้ราวกับกำลังปลอบประโลม',
        nextScene: 'end'
    }
};

let currentScene = 'scene1';

// ฟังก์ชัน เริ่มเกม - ซ่อนหน้าเมนู และแสดงหน้าเรื่องราว
function startGame() {
    const menuScreen = document.getElementById('menuScreen');
    const storyScreen = document.getElementById('storyScreen');
    
    menuScreen.classList.add('hidden');
    storyScreen.classList.remove('hidden');
    
    currentScene = 'scene1';
    loadScene(currentScene);
}

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

// ฟังก์ชัน โหลดฉากตาม scene ID
function loadScene(sceneId) {
    if (sceneId === 'menu') {
        // กลับไปเมนู
        document.getElementById('menuScreen').classList.remove('hidden');
        document.getElementById('storyScreen').classList.add('hidden');
        return;
    }
    
    const scene = storyData[sceneId];
    if (!scene) return;
    
    // อัปเดต background
    updateBackground(scene.bg);
    
    // ซ่อนทั้งหมดก่อน
    document.getElementById('narrationSection').classList.add('hidden');
    document.getElementById('dialogueSection').classList.add('hidden');
    document.getElementById('choicesSection').classList.add('hidden');
    document.getElementById('nextButton').classList.add('hidden');
    document.querySelector('.character-container').classList.remove('visible');
    
    // แสดงตามประเภทฉาก
    if (scene.type === 'narration') {
        showNarration(scene.narration);
        if (scene.nextScene) {
            showNextButton(scene.nextScene);
        }
    } else if (scene.type === 'narration-then-dialogue') {
        // แสดง narration ก่อน
        showNarration(scene.narration);
        // จากนั้นแสดง dialogue หลังจากเล่นฉากนี้
        currentSceneData = scene;
    } else if (scene.type === 'dialogue') {
        showDialogue(scene.characterName, scene.dialogue);
        if (scene.choices) {
            displayChoices(scene.choices);
        }
    }
    
    currentScene = sceneId;
}

// ฟังก์ชัน อัปเดต background
function updateBackground(bgUrl) {
    const storyBg = document.querySelector('.story-bg');
    storyBg.style.backgroundImage = `url('${bgUrl}')`;
}

// ฟังก์ชัน แสดงปุ่ม Next
function showNextButton(nextScene) {
    const nextBtn = document.getElementById('nextButton');
    nextBtn.classList.remove('hidden');
    nextBtn.onclick = () => loadScene(nextScene);
}

// ตัวแปรสำหรับให้ narration ทำงานกับ dialogue
let currentSceneData = null;

// ฟังก์ชัน ดำเนินการต่อจาก narration ไปยัง dialogue
function continueToDialogue() {
    if (currentSceneData) {
        showDialogue(currentSceneData.characterName, currentSceneData.dialogue);
        document.getElementById('nextButton').classList.add('hidden');
        if (currentSceneData.choices) {
            displayChoices(currentSceneData.choices);
        }
    }
}

// ฟังก์ชัน แสดง Choices พร้อมกับ callback
function displayChoices(choices) {
    const choicesSection = document.getElementById('choicesSection');
    const choiceButtons = choicesSection.querySelectorAll('.choice-btn');
    
    choiceButtons.forEach((btn, index) => {
        const choiceNum = index + 1;
        if (choices[choiceNum]) {
            btn.textContent = choices[choiceNum].text;
            btn.style.display = 'block';
            btn.onclick = () => {
                loadScene(choices[choiceNum].nextScene);
            };
        } else {
            btn.style.display = 'none';
        }
    });
    
    choicesSection.classList.remove('hidden');
}

// ฟังก์ชัน แสดง Narration
function showNarration(text) {
    const narrationSection = document.getElementById('narrationSection');
    const dialogueSection = document.getElementById('dialogueSection');
    const characterContainer = document.querySelector('.character-container');
    
    document.getElementById('narrationText').textContent = text;
    
    narrationSection.classList.remove('hidden');
    dialogueSection.classList.add('hidden');
    choicesSection.classList.add('hidden');
    characterContainer.classList.remove('visiblen');
    choicesSection.classList.add('hidden');
}

// ฟังก์ชัน แสดง Dialogue
function showDialogue(characterName, dialogueText) {
    const characterContainer = document.querySelector('.character-container');
    
    document.getElementById('characterName').textContent = characterName;
    document.getElementById('dialogueText').textContent = dialogueText;
    
    narrationSection.classList.add('hidden');
    dialogueSection.classList.remove('hidden');
    choicesSection.classList.add('hidden');
    characterContainer.classList.add('visible
    narrationSection.classList.add('hidden');
    dialogueSection.classList.remove('hidden');
    choicesSection.classList.add('hidden');
}

// ฟังก์ชัน จัดการการเลือก (ใช้กับ onclick ใน HTML)
function makeChoice(choiceNumber) {
    // ฟังก์ชันนี้ถูกอัปเดตโดย displayChoices
    console.log('ผู้เล่นเลือก: ' + choiceNumber);
}
