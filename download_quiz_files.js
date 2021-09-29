//Script sederhana ini dibuat agar tidak klik file satu-satu untuk di-download hehe, mohon maaf kalau fail atau tidak sempurna, saya baru belajar Javascript :)
//Klik quiz -> ke menu manual grading -> pilih varian soal esai yang ingin dinilai (jangan pilih grade all)
//Catatan: kalau soal esai biasa, harusnya bisa pakai opsi "download essay submissions", tapi kalau pakai soal esai yang di-random, entah mengapa tidak bisa bulk download dari Scele
//Pada halaman yang berisi file mahasiswa + kotak komentar, set sehingga semua berkas yang ingin didownload ditampilkan (ganti angka di Questions per page). Kalau mau mengetes saya sarankan jangan banyak-banyak dulu, karena scriptnya tidak bisa dihentikan di tengah jalan (atau bisa tetapi saya belum tahu caranya...).
//Jika tidak ingin klik OK satu-satu setiap kali mendownload, pastikan opsi "Ask where to save each file before downloading" atau sejenisnya sudah dimatikan dan folder tempat download sudah ditentukan.
//Ctrl+shift+I (buka console) lalu copy paste script di bawah ini dan tekan enter. File akan tersimpan secara otomatis pada folder download.

//get each student
var objek = document.querySelectorAll("h4:not([class])");

//get student's name
function getName(parent) {
  return parent.innerText.split(" for ")[1];
};

// get student's file
function getLink(parent) {
  try {return parent.nextElementSibling.querySelector(".attachments").querySelector("div > p > a").href}
  catch(err){};
};

// ini harusnya untuk rename file ke nama mahasiswa + download file, tapi somehow tidak bisa ke-rename :(
function download(fileUrl, fileName) {
  var a = document.createElement("a");
  try {a.href = fileUrl;
  a.download = fileName; 
  a.target= "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);}
  catch(err){};
}

//kayaknya kalau terlalu cepat mendownloadnya, malah jadi fail
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

var objek = Array.from(objek);

var names = objek.map(getName);
var links = objek.map(getLink);

for (let i = 0; i < links.length; i++) {
  download(links[i], names[i]);
  sleep(2000);
}

