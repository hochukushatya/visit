function getLanguageFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('lang') || 'kz';
}

function getParamsFromURL() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang') || 'kz'; // Язык по умолчанию
  const user = params.get('user') || '1'; // Пользователь по умолчанию (user_1)
  return { lang, user };
}

// Функция для обновления перевода и URL
function setLanguage(lang, user) {
  // Установка перевода
  document.getElementById('description').textContent = translations.content.logo[lang];
  document.getElementById('full-name').textContent = translations[`user_${user}`].full_name[lang];
  document.getElementById('user-description').textContent = translations[`user_${user}`].description[lang];
  document.getElementById('whatsapp-text').textContent = translations.content.whatsapp[lang].toUpperCase();
  document.getElementById('mail-text').textContent = translations[`user_${user}`].mail_login;

  // Убираем класс 'active' у всех кнопок
  document.getElementById('kz-button').classList.remove('active');
  document.getElementById('ru-button').classList.remove('active');
  document.getElementById('en-button').classList.remove('active');

  // Добавляем класс 'active' на выбранную кнопку
  if (lang === 'kz') {
    document.getElementById('kz-button').classList.add('active');
  } else if (lang === 'ru') {
    document.getElementById('ru-button').classList.add('active');
  } else if (lang === 'en') {
    document.getElementById('en-button').classList.add('active');
  }

  // Формирование правильных ссылок для WhatsApp и почты
  const userInfo = translations[`user_${user}`];
  const whatsappLink = `https://wa.me/${userInfo.whatsapp_number.replace('+', '')}`; // Убираем '+' из номера
  const mailLink = `mailto:${userInfo.mail_login}`;

  // Устанавливаем ссылки на кнопки
  document.getElementById('whatsapp-link').href = whatsappLink;
  document.getElementById('mail-link').href = mailLink;

  // Обновляем URL с параметром lang и user
  window.history.pushState({}, '', `index.html?lang=${lang}&user=${user}`);
}

// Функция для изменения языка при нажатии на кнопку
function changeLanguage(lang) {
  const currentUser = new URLSearchParams(window.location.search).get('user') || '1';
  setLanguage(lang, currentUser);
}

document.addEventListener('DOMContentLoaded', () => {
  const { lang, user } = getParamsFromURL();
  setLanguage(lang, user);
});
