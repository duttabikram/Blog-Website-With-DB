async function sendMessage(postId) {
  const input = document.getElementById("msg");
  const message = input.value;
  if (!message) return;

  const chatbox = document.getElementById("chatbox");
  chatbox.innerHTML += `<p><b>You:</b> ${message}</p>`;
  input.value = "";

  const res = await fetch(`/chat/${postId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: message })
  });

  const data = await res.json();
  chatbox.innerHTML += `<p><b>Bot:</b> ${data.reply}</p>`;
  chatbox.scrollTop = chatbox.scrollHeight;
}
