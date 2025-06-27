document.addEventListener('DOMContentLoaded', function() {
    const suggestionForm = document.getElementById('suggestionForm');
    const successPopup = document.getElementById('successPopup');
    const closePopupBtn = document.getElementById('closePopupBtn'); // Pastikan ID ini benar di HTML Anda

    // --- LOGGING UNTUK DEBUGGING ---
    console.log('--- Inisialisasi Script ---');
    console.log('suggestionForm (ID: suggestionForm):', suggestionForm);
    console.log('successPopup (ID: successPopup):', successPopup);
    console.log('closePopupBtn (ID: closePopupBtn):', closePopupBtn);
    console.log('--------------------------');

    // Pastikan semua elemen penting ditemukan sebelum menambahkan event listener
    if (!suggestionForm || !successPopup || !closePopupBtn) {
        console.error('ERROR: Satu atau lebih elemen DOM penting tidak ditemukan. Pastikan ID di HTML sudah benar.');
        // Hentikan eksekusi script jika elemen tidak ditemukan, agar tidak ada error lebih lanjut.
        return;
    }

    // Event Listener untuk pengiriman form
    suggestionForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah halaman di-refresh saat form disubmit
        console.log('Form disubmit. Mencegah default action.');

        suggestionForm.reset(); // Reset form setelah "mengirim" (secara visual)
        successPopup.classList.add('show'); // Menampilkan pop-up
        console.log('Pop-up berhasil ditampilkan. Kelas "show" ditambahkan.');
    });

    // Event Listener untuk tombol 'OK' pada pop-up
    closePopupBtn.addEventListener('click', function() {
        console.log('Tombol OK di pop-up diklik.');
        successPopup.classList.remove('show'); // Menyembunyikan pop-up
        console.log('Pop-up disembunyikan. Kelas "show" dihapus.');

        // Jika Anda ingin halaman di-refresh setelah pop-up ditutup (opsional):
        // window.location.reload(); // Mengisi ulang seluruh halaman
    });

    // Event Listener untuk menutup pop-up saat mengklik di luar area konten
    successPopup.addEventListener('click', function(event) {
        // Memastikan klik terjadi tepat pada overlay, bukan konten pop-up itu sendiri
        if (event.target === successPopup) {
            console.log('Klik di luar area pop-up terdeteksi.');
            successPopup.classList.remove('show');
            console.log('Pop-up disembunyikan.');
        }
    });
});