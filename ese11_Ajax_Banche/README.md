# Es ajax banche - Mina Nicolò - 4B Informatica
## Descrizione ##
> Questo esercizio si basa su un database "4b_banche".
Nella prima lista sono contenuti tutti i nomi delle banche, mentre nella seconda tutte le filiali riferite alla banca
precedentemente selezionata. Una volta che le due combobox sono state selezionate verranno visualizzati all'interno di una tabella le informazioni anagrafiche di tutti i correntisti che hanno un conto in quella filiale.

### Tabelle all'interno del database con relativi campi ###
* BANCHE (cBanca, Nome, cComune)
* COMUNI (cComune, Nome)
* CORRENTISTI (cCorrentista, Nome, cComune, Tel, Pwd)
* FILIALI (cFiliale, Nome, cComune, cBanca)
* CONTI (cConto, cCorrentista, cFiliale, Saldo)
* MOVIMENTI (cMov, cConto, cOperazione, Data, Importo) 
* OPERAZIONI (cOperazione, Descrizione)
