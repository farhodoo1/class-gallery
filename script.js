/* script.js
   Вся логика: данные учеников, рендеринг главной, сетки и профиля.
*/

(() => {
  // --- Конфигурация и элементы DOM ---
  const btnHeroView = document.getElementById('btn-hero-view');
  const btnViewStudents = document.getElementById('btn-view-students');
  const studentsSection = document.getElementById('students-section');
  const studentsGrid = document.getElementById('students-grid');
  const profileOverlay = document.getElementById('profile-overlay');
  const profileContent = document.getElementById('profile-content');
  const btnBack = document.getElementById('btn-back');

  // --- ДАННЫЕ УЧЕНИКОВ (ТВОИ ИМЕНА) ---
  const students = [
    {
      id: "student-1",
      name: "Фарход",
      photos: [
        "images/student-1/1.jpg",
        "images/student-1/2.jpg",
        "images/student-1/3.jpg"
      ]
    },
    {
      id: "student-2",
      name: "Назар",
      photos: [
        "images/student-2/1.jpg",
        "images/student-2/2.jpg",
        "images/student-2/3.jpg"
      ]
    },
    {
      id: "student-4",
      name: "Имрон",
      photos: [
        "images/student-4/1.jpg",
        "images/student-4/2.jpg",
        "images/student-4/3.jpg"
      ]
    },
    {
      id: "student-5",
      name: "Идрис",
      photos: [
        "images/student-5/1.jpg",
        "images/student-5/2.jpg",
        "images/student-5/3.jpg"
      ]
    }
  ];

  // --- Создание карточки ученика ---
  function createStudentCard(student) {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.setAttribute('data-id', student.id);
    card.setAttribute('tabindex', '0');
    card.innerHTML = `
      <div class="photo">
        <img src="${student.photos[0]}" alt=" ${student.name}" loading="lazy" />
      </div>
      <h4>${student.name}</h4>
    `;
    return card;
  }

  // --- Рендер сетки ---
  function renderStudentsGrid(list) {
    studentsGrid.innerHTML = '';
    const fragment = document.createDocumentFragment();
    list.forEach(s => fragment.appendChild(createStudentCard(s)));
    studentsGrid.appendChild(fragment);
    studentsSection.classList.remove('hidden');
    studentsSection.scrollIntoView({behavior:'smooth'});
  }

  // --- Открытие профиля ---
  function openProfile(studentId) {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    document.body.classList.add('profile-open');

    profileContent.innerHTML = `
      <div class="profile-header">
        <div class="profile-avatar">
          <img src="${student.photos[0]}" alt="Аватар ${student.name}" />
        </div>
        <div class="profile-info">
          <h2>${student.name}</h2>
          <p style="color:var(--muted); margin-top:8px;">Профиль ученика</p>
        </div>
      </div>

      <div class="profile-gallery" id="profile-gallery">
        ${student.photos.map(p => `<img src="${p}" alt="Фото ${student.name}" loading="lazy">`).join('')}
      </div>
    `;

    profileOverlay.classList.remove('hidden');
    profileOverlay.setAttribute('aria-hidden', 'false');

    const gallery = document.getElementById('profile-gallery');
    gallery.addEventListener('click', onGalleryClick);
  }

  // --- Закрытие профиля ---
  function closeProfile() {
    document.body.classList.remove('profile-open');
    profileOverlay.classList.add('hidden');
    profileOverlay.setAttribute('aria-hidden', 'true');
    profileContent.innerHTML = '';
  }

  // --- Лайтбокс ---
  function onGalleryClick(e) {
    const img = e.target.closest('img');
    if (!img) return;

    const light = document.createElement('div');
    light.style.position = 'fixed';
    light.style.inset = '0';
    light.style.background = 'rgba(0,0,0,0.9)';
    light.style.display = 'flex';
    light.style.alignItems = 'center';
    light.style.justifyContent = 'center';
    light.style.zIndex = 120;
    light.style.cursor = 'zoom-out';

    light.innerHTML = `<img src="${img.src}" style="max-width:92%; max-height:92%; border-radius:10px;">`;
    document.body.appendChild(light);

    light.addEventListener('click', () => light.remove(), { once: true });
  }

  // --- События ---
  studentsGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.student-card');
    if (!card) return;
    openProfile(card.getAttribute('data-id'));
  });

  studentsGrid.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const card = e.target.closest('.student-card');
      if (!card) return;
      openProfile(card.getAttribute('data-id'));
    }
  });

  btnHeroView.addEventListener('click', () => renderStudentsGrid(students));
  btnViewStudents.addEventListener('click', () => renderStudentsGrid(students));
  btnBack.addEventListener('click', closeProfile);

  profileOverlay.addEventListener('click', (e) => {
    if (e.target === profileOverlay) closeProfile();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !profileOverlay.classList.contains('hidden')) {
      closeProfile();
    }
  });

  // --- Старт ---
  renderStudentsGrid(students);

})();
