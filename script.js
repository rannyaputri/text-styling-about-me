document.addEventListener("DOMContentLoaded", () => {
      const aboutText = document.getElementById("about-text");
      const originalText = aboutText.innerHTML;
      let isAnimated = false;

      // Pisahkan kata saat scroll ke bawah
      const splitWords = () => {
            const words = originalText.split(" ");
            aboutText.innerHTML = words.map(word => `<span>${word} </span>`).join("");
      };

      // Fungsi debounce untuk mengoptimalkan scroll
      const debounce = (func, delay) => {
            let timeoutId;
            return function (...args) {
                  if (timeoutId) {
                        clearTimeout(timeoutId);
                  }
                  timeoutId = setTimeout(() => {
                        func.apply(null, args);
                  }, delay);
            };
      };

      //  bagian about muncul di viewport
      const onScroll = () => {
            const aboutTextPosition = aboutText.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.0; // Sesuaikan untuk trigger

            if (aboutTextPosition < screenPosition && !isAnimated) {
                  // Memanggil fungsi untuk memisahkan kata
                  splitWords();
                  animateText();
                  isAnimated = true; // Set agar animasi tidak berjalan lagi
            }
      };

      // Animasi saat teks muncul
      const animateText = () => {
            const spans = document.querySelectorAll("#about-text span");
            spans.forEach((span, index) => {
                  setTimeout(() => {
                        span.style.opacity = 1;
                        span.style.color = 'white'; // Warna saat muncul
                  }, 50 * index); // delay
            });
      };

      // Menggunakan debounce untuk scroll
      window.addEventListener("scroll", debounce(onScroll, 100));
});
