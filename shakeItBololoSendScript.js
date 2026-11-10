// Motor do SendScript (atualizado em 11/2026 para o WhatsApp Web atual).
// Uso: abra uma conversa no WhatsApp Web, cole o arquivo inteiro no console e aperte Enter.
// Para parar no meio: digite  pararScript = true  no console e aperte Enter.
async function enviarScript(scriptText) {
  const espera = (ms) => new Promise((r) => setTimeout(r, ms));
  const linhas = scriptText.split(/[\n\t]+/).map((l) => l.trim()).filter(Boolean);
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

enviarScript(`
Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K

Shake It Bololo
AOM

Cabelo da Tony Country pra mostrar que é de vilão
Lado mal e lado bem, nós é bom mas não é bombom
O toque da horneteira entre becos e vielas
Meia preta e meia branca que nós joga na canela
Os irmão tá de AK em cima da CB 1000
Recalcado cresce o olho, vai pra puta que pariu
Vai

Menina sem coração, bandido apaixonado
E cadê o amor? Foi pra casa do caralho
Dei um fim na relação, você não acreditou
Por causa de traição, o amor acabou
E cadê o amor? Foi pra casa do caralho
E cadê o amor? Foi pra casa do caralho

Não existe mais amor, a moda é uma pentada
Usando camisinha, pele a pele é mó furada

Sou foda, na cama eu te esculacho
Na sala ou no quarto
No beco ou no carro
Eu, eu sou sinistro
Melhor que seu marido
Esculacho seu amigo
No escuro eu sou um perigo
Mas, mas não se esqueça
Que eu sou vagabundo
Depois que a putaria começou rolar no mundo

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

A mina aqui do baile
Se prepara pra sentar
Rebolando desse jeito
Vai me fazer delirar
Aah, eu vou gozar
Vem que eu vou te tacar o piru

A cada segundo nós dá uma acelerada
E a cada acelerada é um tipo de risada
Vrau-vrau-vrau, ho-ho-ho, ha-ha-ha, bololo, vai
Que 1-9-0 os vizinho já até discou
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Faz o sinal da vida louca, joga a pistola pro ar
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)
Deixa os garoto brincar, deixa os garoto brincar (bololo, ha-ha, bololo, ha-ha-ha-ha)

Pepeca bate na pica com vontade
Meu piru na sua boca derrete igual choco- (e o quê?)
Nesse calor?

Eu tô boladão
Eu vou sarrar em tu com copo de whisky na mão
Eu vou sarrar em tu com copo de whisky na mão
Daquele jeito, mulher

É o Brinquedo
É o Bin Laden
É o Bin Laden
É o Brinquedo
Tá lançando uma de novo
E tá de volta, esse é o retorno, vai, vai, vai

Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (pul-pul)
Senta na peça de prata (tá-tá)
Quica no fuzil de ouro (bololo, ha-ha, bololo, ha-ha-ha-ha)

(Bololo, ha-ha, bololo, ha-ha-ha-ha)
(Bololo, ha-ha, bololo, ha-ha-ha-ha)
Experimenta, experimenta
Se sua xota é temperada, a minha piroca é de pimenta
Experimenta, experimenta
Se sua xota é temperada a minha pi- é de pimenta

É o cabelo da Tony Country, quero ver os homi pegar
Porque aqui nós da risada e bota pra acelerar

Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha
Bololo, ha-ha, bololo, ha-ha-ha-ha

É 2, é K, então vem pra cá
Na sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
Sequência da putaria com o Pikachu e o 2K
`).then(e => console.log(`Código finalizado, ${e} mensagens enviadas`)).catch(console.error)
