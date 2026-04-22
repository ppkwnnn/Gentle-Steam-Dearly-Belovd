/**
 * ฟังก์ชัน เปิด-ปิด หน้า Credit
 */
function toggleCredit() {
    const overlay = document.getElementById('creditOverlay');
    overlay.classList.toggle('active');
}

/**
 * ปิด Credit เมื่อคลิกพื้นที่ว่างรอบๆ การ์ด
 */
function closeOverlay(event) {
    if (event.target.id === 'creditOverlay') {
        toggleCredit();
    }
}

/**
 * ฟังก์ชันสำหรับปุ่ม Start
 */
function startGame() {
    console.log("Game Sequence Initialized...");
    alert('Starting Game...');
    // คุณสามารถใส่โค้ดเปลี่ยนหน้าหรือเริ่มบทสนทนาตรงนี้ได้
}

/**
 * ฟังก์ชันสำหรับปุ่ม Wishboard
 */
function openWishboard() {
    alert('Opening Wishboard...');
}