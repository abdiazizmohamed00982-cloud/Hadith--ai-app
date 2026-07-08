<!DOCTYPE html>
<html>
<body>
    <h2>Jarvis Hadith AI</h2>
    
    <!-- Language Selector -->
    <label for="languageSelect">Choose Language:</label>
    <select id="languageSelect">
        <option value="English">English</option>
        <option value="Swedish">Swedish</option>
        <option value="Arabic">Arabic</option>
    </select>

    <br><br>
    <input type="text" id="userInput" placeholder="Ask anything..." style="width: 300px;">
    <button onclick="askJarvis()">Ask</button>
    <p id="response">Response will appear here...</p>

    <script>
        async function askJarvis() {
            const msg = document.getElementById('userInput').value;
            const lang = document.getElementById('languageSelect').value;
            const resDisplay = document.getElementById('response');
            
            resDisplay.innerText = "Jarvis is thinking...";

            const response = await fetch('https://hadith-ai-app.onrender.com/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msg, language: lang })
            });
            
            const data = await response.json();
            resDisplay.innerText = "Response: " + data.reply;
            
            // Play audio
            const audio = new Audio("data:audio/mp3;base64," + data.audio);
            audio.play();
        }
    </script>
</body>
</html>
