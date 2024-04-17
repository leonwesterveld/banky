class GetData {
    url;
    data = null;
    constructor(newUrl) {
        this.url = newUrl
    }
    async getJson() {
        await fetch(this.url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.data = data
            });

        return this.data;
    }
}

class Header {
    RenderHeader;
    constructor(RenderHeader) {
        this.RenderHeader = document.getElementsByTagName(RenderHeader)[0];

        this.header = document.createElement("header");
        this.header.classList = "header";

        this.divEmpty = document.createElement("div");
        this.divEmpty.classList = "header__empty"

        this.divTitle = document.createElement("div");
        this.divTitle.classList = "header__title"

        this.figure = document.createElement("figure");
        this.figure.classList = "header__logo";

        this.logoI = document.createElement("i");
        this.logoI.classList = "fa-solid fa-credit-card";

        this.logoHeading = document.createElement("h2");
        this.logoHeading.classList = "header__banky";
        this.logoHeading.innerText = "Banky"

        this.avatarWrapper = document.createElement("div");
        this.avatarWrapper.classList = "header__avatarWrapper";

        this.avatar = document.createElement("figure");
        this.avatar.classList = "avatar";

        this.avatarHead = document.createElement("div");
        this.avatarHead.classList = "avatar__head";

        this.avatarBody = document.createElement("div");
        this.avatarBody.classList = "avatar__body";

    }

    render() {
        this.RenderHeader.appendChild(this.header);
        this.header.appendChild(this.divEmpty);
        this.header.appendChild(this.divTitle);
        this.divTitle.appendChild(this.figure);
        this.figure.appendChild(this.logoI);
        this.figure.appendChild(this.logoHeading);

        this.header.appendChild(this.avatarWrapper);
        this.avatarWrapper.appendChild(this.avatar);
        this.avatar.appendChild(this.avatarHead);
        this.avatar.appendChild(this.avatarBody);
    }
}




class BankyMain {
    RenderMain;
    main;
    left;
    right


    constructor(RenderMain) {
        this.RenderMain = document.getElementsByTagName(RenderMain)[0];

        this.main = document.createElement("main");
        this.main.classList = "banky";

        this.left = new Bankyleft(this.main);
        this.right = new Bankyright(this.main, this);

    }

    makeButtons(data) {
        this.right.makeButtons(data);
    }

    makeTransactions(data) {
        this.left.makeTransactions(Object.entries(data)[0][0],data);
    }

    callFromright(account , data){
        this.left.makeTransactions(account,data);
    }

    render() {
        //main
        this.RenderMain.appendChild(this.main);

        this.left.render();
        this.right.render()
    }
}


class Bankyleft {
    main
    constructor(main) {
        this.main = main
        this.left = document.createElement("section");
        this.left.classList = "banky__section banky__section--left";

        this.bankyHeader = document.createElement("header");
        this.bankyHeader.classList = "banky__header";

        this.bankyHeaderWrap = document.createElement("div");

        this.bankyLogo = document.createElement("figure");
        this.bankyLogo.classList = "banky__logo";

        this.bankyLogoI = document.createElement("i");
        this.bankyLogoI.classList = "fa-solid fa-house";

        this.bankyLogoText = document.createElement("h1");
        this.bankyLogoText.classList = "banky__money";

        this.eyeButton = document.createElement("button");
        this.eyeButton.classList = "banky__eyeButton";
        this.eyeButton.onclick = this.eyeButtonClicked;

        this.eyeFigure = document.createElement("figure");
        this.eyeFigure.classList = "banky__eye";

        this.eyeI = document.createElement("i");
        this.eyeI.classList = "fa-solid fa-eye";
        this.eyeI.idList =

        this.transactions = document.createElement("ul");
        this.transactions.classList = "banky__transactions";

        

        this.transferButton = document.createElement("button");
        this.transferButton.classList = "banky__transferButton";
        this.transferButton.innerText = "Overboeken";
    }

    makeTransactions(account, data) {
        let totalMoney = 0;
        this.transactions.innerHTML = "";
        for(let i = 0; i < data[account].length; i++){
            totalMoney += data[account][i]["amount"];
            this.transaction = document.createElement("li");
            this.transaction.classList = "banky__transaction"

            this.transactionFrom = document.createElement("h3");
            this.transactionFrom.classList = "banky__name";
            this.transactionFrom.innerText = data[account][i]["from/to"];

            this.transactionAmount = document.createElement("h3");
            this.transactionAmount.classList = "banky__amount";
            this.transactionAmount.innerText = data[account][i]["amount"];

            this.transactions.appendChild(this.transaction)
            this.transaction.appendChild(this.transactionFrom)
            this.transaction.appendChild(this.transactionAmount)
            
        }
        this.bankyLogoText.innerText = "saldo €" + totalMoney;
    }

    eyeButtonClicked = () =>{
        this.transactions.classList.toggle("banky__transactions--blur")
        this.bankyLogoText.classList.toggle("banky__money--blur")
    }

    render() {
        //left
        this.main.appendChild(this.left);
        //header
        this.left.appendChild(this.bankyHeader);
        this.bankyHeader.appendChild(this.bankyHeaderWrap);




        //logo
        this.bankyHeaderWrap.appendChild(this.bankyLogo);
        this.bankyLogo.appendChild(this.bankyLogoI);
        this.bankyHeaderWrap.appendChild(this.bankyLogoText);

        
        //eye
        this.bankyHeaderWrap.appendChild(this.eyeButton);
        this.eyeButton.appendChild(this.eyeFigure);
        this.eyeFigure.appendChild(this.eyeI);


        //transactions
        this.left.appendChild(this.transactions);
        
        this.left.appendChild(this.transferButton)
    }
}

class Bankyright {
    main
    bankyMain;
    constructor(main, bankyMain) {
        this.main = main;
        this.bankyMain = bankyMain;
        this.right = document.createElement("section");
        this.right.classList = "banky__section banky__section--right";

        this.accounts = document.createElement("ul");
        this.accounts.classList = "banky__accounts";


    }

    makeButtons(data) {
        Object.entries(data).forEach((entry) => {
            this.mainAccount = document.createElement("li");
            this.mainAccount.classList = "banky__account";
            
            this.mainAccount.onclick = () => {
                this.bankyMain.callFromright(entry[0] ,data)
            }
            this.bankButton = document.createElement("button");
            this.bankButton.classList = "banky__switchAccount"

            this.bankButtonFigure = document.createElement("figure");
            this.bankButtonFigure.classList = "banky__logo";

            this.houseIcon = document.createElement("i");
            this.houseIcon.classList = data[entry[0]][0]["logo"]

            this.bankTitle = document.createElement("h4");
            this.bankTitle.classList = "banky__nameOfAccount";
            this.bankTitle.innerText = entry[0];

            this.accounts.appendChild(this.mainAccount)

            this.accounts.appendChild(this.mainAccount);
            this.mainAccount.appendChild(this.bankButton);
            this.bankButton.appendChild(this.bankButtonFigure);
            this.bankButtonFigure.appendChild(this.houseIcon);
            this.mainAccount.appendChild(this.bankTitle);
        })
    }

    

    render() {
        this.main.appendChild(this.right);
        this.right.appendChild(this.accounts);
    }
}

class App {
    bankyHeader;
    bankyMain;
    getData;
    constructor() {
        this.header = new Header("body")
        this.bankyMain = new BankyMain("body");

        this.getData = new GetData("./data/transactions.json")
        this.getData
            .getJson().then((data) => {
                this.bankyMain.makeButtons(data);
                this.bankyMain.makeTransactions(data);
            });

        this.header.render();
        this.bankyMain.render();
    }
}


const app = new App()