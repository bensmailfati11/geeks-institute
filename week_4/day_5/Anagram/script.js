function isAnagram(str1, str2) {
const cleanStr1 = str1.replace(/\s/g, '').toLowerCase();
const cleanStr2 = str2.replace(/\s/g, '').toLowerCase();


if (cleanStr1.length !== cleanStr2.length) return false;


return cleanStr1.split('').sort().join('') === cleanStr2.split('').sort().join('');
}


function checkAnagram() {
const str1 = document.getElementById('word1').value;
const str2 = document.getElementById('word2').value;
const result = document.getElementById('result');


if (!str1 || !str2) {
result.textContent = '⚠️ Please fill both fields!';
result.className = 'wrong';
return;
}


if (isAnagram(str1, str2)) {
result.textContent = '✅ They are anagrams!';
result.className = 'correct';
} else {
result.textContent = '❌ Not anagrams!';
result.className = 'wrong';
}
}
document.getElementById('checkBtn').addEventListener('click', checkAnagram);