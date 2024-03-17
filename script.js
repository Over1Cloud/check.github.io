window.onload = async function() {
  console.log("Запущена проверка доступа.");

  const accessMessage = document.getElementById('accessMessage');

  try {
    // Используем токен вашего бота MIRAPOLIS
    const botToken = '7077808617:AAHTxL5VnDClpBZpE5_Di97OJIn0BOZv6JA';

    // Получаем информацию о боте
    const botInfoResponse = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
    const botInfoData = await botInfoResponse.json();
    console.log("Информация о боте получена:", botInfoData);

    const botId = botInfoData.result.id;

    // Проверяем, есть ли ID бота
    if (!botId) {
      throw new Error('Bot ID not provided.');
    }

    console.log("ID бота:", botId);

    // Проверяем доступ пользователя
    checkAccess(botId);
  } catch (error) {
    console.error('Ошибка:', error);
    accessMessage.textContent = 'Ошибка, попробуйте позже.';
  }
};

async function checkAccess(botId) {
  const accessMessage = document.getElementById('accessMessage');

  try {
    const response = await fetch(`https://raw.githubusercontent.com/Over1Cloud/mira.github.io/main/users.txt?token=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`);
    const data = await response.text();
    console.log("Текст файла получен:", data);
    
    const users = data.split('\n');
    console.log("Список пользователей:", users);
    
    const userId = users[users.length - 1].split(',')[0]; // Получаем ID пользователя из последней строки файла
    
    console.log("ID пользователя:", userId);

    if (!userId) {
      // Если ID пользователя не найден
      accessMessage.textContent = 'Доступ запрещен.';
    } else {
      // Проверяем, есть ли доступ у пользователя
      const userAccess = users.find(user => user.split(',')[0] == userId).split(',')[1];
      
      if (userAccess === "1") {
        // Если доступ есть
        accessMessage.textContent = 'Доступ получен. Перенаправление...';
        setTimeout(function() {
          window.location.href = 'https://over1cloud.github.io/mira.github.io/';
        }, 2000);
      } else {
        // Если доступа нет
        accessMessage.textContent = 'Доступ запрещен.';
      }
    }
  } catch (error) {
    console.error('Ошибка:', error);
    accessMessage.textContent = 'Произошла ошибка. Пожалуйста, попробуйте позже.';
  }
}
