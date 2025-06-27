// JS/script.js

document.addEventListener('DOMContentLoaded', function() {
    // This site can’t be reached
    // === Fungsionalitas untuk Halaman Detail Komik (Menambahkan ke Readlist) ===
    // Pastikan elemen dengan ID 'addToReadlistBtn' ada di halaman saat ini
    const addToReadlistBtn = document.getElementById('addToReadlistBtn');

    if (addToReadlistBtn) { // Hanya jalankan jika tombol ada di halaman
        // Ambil data komik dari elemen HTML menggunakan atribut data-*
        const comicTitleElement = document.querySelector('[data-comic-title]');
        const comicCoverElement = document.querySelector('[data-comic-cover]');

        if (comicTitleElement && comicCoverElement) {
            const comicTitle = comicTitleElement.dataset.comicTitle;
            const comicCover = comicCoverElement.dataset.comicCover;
            // Ambil nama file HTML saat ini sebagai ID unik
            const comicDetailPage = window.location.pathname.split('/').pop();
            const comicId = comicDetailPage.replace('.html', '');

            addToReadlistBtn.addEventListener('click', function() {
                let readlist = JSON.parse(localStorage.getItem('readlist')) || [];

                // Cek apakah komik sudah ada di readlist
                const isAlreadyInReadlist = readlist.some(item => item.id === comicId);

                if (!isAlreadyInReadlist) {
                    readlist.push({
                        id: comicId,
                        title: comicTitle,
                        cover: comicCover,
                        detailPage: comicDetailPage // Simpan nama file detail untuk tautan
                    });
                    localStorage.setItem('readlist', JSON.stringify(readlist));
                    alert(`${comicTitle} telah ditambahkan ke Readlist Anda!`);
                } else {
                    alert(`${comicTitle} sudah ada di Readlist Anda.`);
                }
            });
        }
    }

    // === Fungsionalitas untuk Halaman Readlist (Memuat dan Menghapus dari Readlist) ===
    const readlistContainer = document.getElementById('readlist-container');
    const emptyMessage = document.getElementById('empty-message');

    if (readlistContainer && emptyMessage) { // Hanya jalankan jika elemen ada di halaman
        loadReadlist(); // Muat readlist saat halaman readlist dimuat
    }

    function loadReadlist() {
        const readlist = JSON.parse(localStorage.getItem('readlist')) || [];
        readlistContainer.innerHTML = ''; // Kosongkan container sebelum mengisi ulang

        if (readlist.length === 0) {
            emptyMessage.style.display = 'block'; // Tampilkan pesan kosong
        } else {
            emptyMessage.style.display = 'none'; // Sembunyikan pesan kosong
            readlist.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('readlist-card');
                card.dataset.id = item.id; // Simpan ID untuk penghapusan

                card.innerHTML = `
                    <button class="remove-button">&times;</button>
                    <a href="${item.detailPage}" class="cover-link">
                        <img src="${item.cover}" alt="${item.title}" class="komik-cover" />
                    </a>
                    <div class="card-info">
                        <a href="${item.detailPage}" class="judul-komik">${item.title}</a>
                    </div>
                `;
                readlistContainer.appendChild(card);
                //anak nya append di panggil biar nampil di body dari html dan css
            });

            // Tambahkan event listener untuk tombol hapus setelah card dibuat
            document.querySelectorAll('.readlist-card .remove-button').forEach(button => {
                button.addEventListener('click', function() {
                    const cardToRemove = this.closest('.readlist-card');
                    const comicId = cardToRemove.dataset.id;
                    removeFromReadlist(comicId);
                });
            });
        }
    }

    function removeFromReadlist(id) {
        let readlist = JSON.parse(localStorage.getItem('readlist')) || [];
        readlist = readlist.filter(item => item.id !== id);
        localStorage.setItem('readlist', JSON.stringify(readlist));
        loadReadlist(); // Muat ulang readlist setelah penghapusan
    }
});