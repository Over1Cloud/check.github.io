window.onload = async function() {
  const accessMessage = document.getElementById('accessMessage');

  try {
    // Используем токен вашего бота MIRAPOLIS
    const botToken = '7077808617:AAHTxL5VnDClpBZpE5_Di97OJIn0BOZv6JA';

    // Получаем информацию о боте
    const botInfoResponse = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
    const botInfoData = await botInfoResponse.json();
    const botId = botInfoData.result.id;

    // Получаем информацию о последнем обновлении
    const updatesResponse = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`);
    const updatesData = await updatesResponse.json();
    const userId = updatesData.result[updatesData.result.length - 1].message.from.id;

    // Проверяем, есть ли ID пользователя и ID бота
    if (!userId || !botId) {
      throw new Error('User ID or Bot ID not provided.');
    }

    // Добавляем ID пользователя к хешу URL
    window.location.hash = userId;

    // Проверяем доступ пользователя
    checkAccess(userId);
  } catch (error) {
    console.error('Error:', error);
    accessMessage.textContent = 'Ошибка, попробуйте позже.';
  }
};

async function checkAccess(userId) {
  const accessMessage = document.getElementById('accessMessage');

  try {
    const response = await fetch(`https://raw.githubusercontent.com/Over1Cloud/mira.github.io/main/users.txt?token=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`);
    const data = await response.json();
    
    const user = data.find(user => user.ID == userId);
    
    if (!user) {
      // Если пользователя нет
      accessMessage.textContent = 'Доступ запрещен.';
    } else if (user.ACCESS === "1") {
      // Если доступ есть
      accessMessage.textContent = 'Доступ получен. Redirecting...';
      setTimeout(function() {
        window.location.href = 'https://over1cloud.github.io/mira.github.io/';
      }, 2000);
    } else {
      // Если доступ запрещен
      accessMessage.textContent = 'Access denied.';
    }
  } catch (error) {
    console.error('Error:', error);
    accessMessage.textContent = 'An error occurred. Please try again later.';
  }
}
