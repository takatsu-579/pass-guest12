document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const messagesContainer = document.getElementById('messages');
    let hintCount = 0;

    // 保存用配列（localStorageから復元）
    let chatHistory = JSON.parse(localStorage.getItem("chatHistory") || "[]");

    // ページ読み込み時に復元
    chatHistory.forEach(item => addMessage(item.text, item.isUser));

    // メッセージをチャットに表示
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', isUser ? 'user-message' : 'ai-message');
        messageDiv.innerHTML = `<p>${text}</p>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // 履歴に追加して localStorage に保存
        chatHistory.push({ text, isUser });
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }

    // ユーザー入力処理
    function handleUserInput() {
        const userText = userInput.value.trim().toLowerCase();
        if (!userText) return;

        addMessage(userText, true);
        userInput.value = '';

        // AI返信シミュレーション
        setTimeout(() => {
            let aiResponse = "ごめんなさい、よくわかりません。";

            if (userText.includes("ヒント")) {
                hintCount++;
                if (hintCount === 1) {
                    aiResponse = "ヒント1：パスワードは、このサイトを作るのに使ったツールの名前だよ。";
                } else if (hintCount === 2) {
                    aiResponse = "ヒント2：大文字を使わない5文字の単語だよ。";
                } else {
                    aiResponse = "ヒント3：デザインやプロトタイピングにとても有名なツールだよ。";
                }
            } else if (userText.includes("figma")) {
                aiResponse = "正解です！おめでとう！君はパスワードを思い出した！";
                // 次のページへの誘導や演出はここに追加可能
            } else {
                aiResponse = "それはパスワードではないようです。もう少し考えてみましょう。";
            }

            addMessage(aiResponse, false);
        }, 500);
    }

    // イベント設定
    sendBtn.addEventListener('click', handleUserInput);
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') handleUserInput();
    });
});
