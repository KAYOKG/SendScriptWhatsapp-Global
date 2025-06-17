# SendScriptWhatsapp-Global
#### Sinta-se livre para colaborar com o projeto == Feel free to collaborate on the project
Código para enviar o Scripts para seus amigos ou grupos do WhatsApp

## Utilização

Abra algum script

Copie todo o conteúdo do arquivo

``clique em raw -> ctrl+a -> ctrl+c ou clique no botao copiar no GitHub``

No WhatsApp Web abra o console do Browser

``Clique com o botao direito -> clique em inspecionar -> cole o código no console e aperte Enter``

Pronto!

> **OBS:** em alguns navegadores o console pode estar bloqueado, para isso você pode escrever no console `allow pasting` ou `allow-scripts` e apertar Enter, depois cole o código do script.

#Script padrão
```
async function enviarScript(scriptText) {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const lines = scriptText.split(/\n+/).map(line => line.trim()).filter(line => line);
  const main = document.querySelector("#main");
  const textarea = main?.querySelector(`div[contenteditable="true"]`);

  if (!main || !textarea) throw new Error("Conversa não encontrada. Abra um chat no WhatsApp Web primeiro.");

  for (const line of lines) {
    // Foca no campo de mensagem e simula "colar" o texto
    textarea.focus();
    const dt = new DataTransfer();
    dt.setData("text", line);
    const pasteEvent = new ClipboardEvent("paste", {
      clipboardData: dt,
      bubbles: true
    });
    textarea.dispatchEvent(pasteEvent);

    await delay(200);

    // Novo seletor atualizado para botão de envio
    const sendButton = main.querySelector(`button span[data-icon="wds-ic-send-filled"]`)?.closest("button");

    if (!sendButton) throw new Error("❌ Botão de envio não encontrado. Verifique se a mensagem foi preenchida.");
    sendButton.click();

    await delay(800); // aguarda antes de enviar o próximo
  }

  return lines.length;
}

// Exemplo de uso:
enviarScript(`Cole a mensagem aqui`).then(e => console.log("✅ Mensagens enviadas!")).catch(console.error);
```
