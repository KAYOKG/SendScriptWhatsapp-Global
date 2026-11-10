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

Para **parar no meio**, digite `pararScript = true` no console e aperte Enter.

> **OBS:** em alguns navegadores o console pode estar bloqueado, para isso você pode escrever no console `allow pasting` ou `allow-scripts` e apertar Enter, depois cole o código do script.

## Script padrão

Use para mandar qualquer texto: troque `Cole a mensagem aqui` pelo seu texto (uma mensagem por linha).

```js
// Motor do SendScript (atualizado em 11/2026 para o WhatsApp Web atual).
// Uso: abra uma conversa no WhatsApp Web, cole o arquivo inteiro no console e aperte Enter.
// Para parar no meio: digite  pararScript = true  no console e aperte Enter.
async function enviarScript(scriptText) {
  const espera = (ms) => new Promise((r) => setTimeout(r, ms));
  const linhas = scriptText.split(/[
	]+/).map((l) => l.trim()).filter(Boolean);
  const main = document.querySelector("#main");
  // a caixa de mensagem fica no rodape da conversa; o seletor amplo cobre versoes antigas
  const caixa = main?.querySelector('footer div[contenteditable="true"]') || main?.querySelector('div[contenteditable="true"]');
  if (!caixa) throw new Error("Abra uma conversa no WhatsApp Web antes de rodar o script.");

  // o WhatsApp troca o nome do botao de enviar de tempos em tempos: tenta todos os conhecidos
  const botaoEnviar = () =>
    main.querySelector('button[aria-label="Enviar"], button[aria-label="Send"]') ||
    ['wds-ic-send-filled', 'send'].map((i) => main.querySelector(`span[data-icon="${i}"]`)?.closest("button, [role=button]")).find(Boolean) ||
    main.querySelector('[data-testid="send"]');

  window.pararScript = false;
  let enviadas = 0;
  for (const linha of linhas) {
    if (window.pararScript) { console.warn(`Parado pelo usuario apos ${enviadas} mensagens.`); break; }
    caixa.focus();
    // colar funciona no editor novo do WhatsApp; insertText cobre o antigo
    const dados = new DataTransfer();
    dados.setData("text/plain", linha);
    caixa.dispatchEvent(new ClipboardEvent("paste", { clipboardData: dados, bubbles: true, cancelable: true }));
    if (!caixa.textContent.trim()) document.execCommand("insertText", false, linha);
    await espera(150);

    const botao = botaoEnviar();
    if (botao) botao.click();
    else caixa.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", keyCode: 13, which: 13, bubbles: true, cancelable: true }));

    // espera a caixa esvaziar (mensagem enviada) antes da proxima, ate 3 s
    for (let t = 0; t < 30 && caixa.textContent.trim(); t++) await espera(100);
    if (caixa.textContent.trim()) throw new Error(`Nao consegui enviar: "${linha.slice(0, 40)}". O WhatsApp mudou de novo? Abra uma issue.`);
    enviadas++;
    await espera(250);
  }
  return enviadas;
}

enviarScript(`Cole a mensagem aqui`).then((n) => console.log(`✅ ${n} mensagens enviadas`)).catch(console.error);
```
