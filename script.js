document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const messagesContainer = document.getElementById('messages');
    let hintCount = 0; // ヒントの回数を管理する変数

    // メッセージをチャットに表示する関数
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
        messageDiv.innerHTML = `<p>${text}</p>`;
        messagesContainer.appendChild(messageDiv);

        // 新しいメッセージが追加されたら、自動的にスクロール
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // ユーザーからの入力を処理する関数
    function handleUserInput() {
        const userText = userInput.value.trim().toLowerCase();
        if (!userText) return;

        addMessage(userText, true); // ユーザーのメッセージを追加
        userInput.value = '';       // 入力欄クリア

        // AIの返信をシミュレート
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
                // ここで次のページへの誘導やクリア演出を追加可能
            } else {
                aiResponse = "それはパスワードではないようです。もう少し考えてみましょう。";
            }
            addMessage(aiResponse, false);
        }, 500);
    }

    // 送信ボタンのクリックイベント
    sendBtn.addEventListener('click', handleUserInput);

    // Enterキーで送信
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleUserInput();
        }
    });
});
