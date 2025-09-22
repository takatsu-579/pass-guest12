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
        // 新しいメッセージが追加されたら、自動的にスクロールする
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // ユーザーからの入力を処理する関数
    function handleUserInput() {
        const userText = userInput.value.trim().toLowerCase(); // 入力を小文字に変換
        if (!userText) return; // 空のメッセージは送信しない

        addMessage(userText, true); // ユーザーのメッセージを表示
        userInput.value = ''; // 入力欄をクリア

        // AIからの返信をシミュレート
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
                // ここに次のページへの誘導や、クリアメッセージを追加できます
            } else {
                aiResponse = "それはパスワードではないようです。もう少し考えてみましょう。";
            }
            addMessage(aiResponse, false);
        }, 500); // 応答の遅延
    }

    // 送信ボタンのクリックイベント
    sendBtn.addEventListener('click', handleUserInput);

    // Enterキーの入力イベント
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleUserInput();
        }
    });
});
