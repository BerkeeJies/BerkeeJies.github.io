let addItem = (objButton, id) => {
    let tablePrice = `orderPrice${id}`;
    
    let price = document.getElementById(tablePrice).innerHTML.slice(0, -1);
    price = parseInt(price);

    console.log(price);

    if(objButton.value == "Günün Çorbası"){
        price += 50;
    }else if(objButton.value == "Ülker ikram"){
        price += 10;
    }else if(objButton.value == "Americano"){
        price += 30;
    }else if(objButton.value == "Latte"){
        price += 30;
    }else if(objButton.value == "Pizza"){
        price += 50;
    }else if(objButton.value == "Hamburger"){
        price += 60;
    }else if(objButton.value == "Kola") {
        price += 10;
    }else if(objButton.value == "Makarna") {
        price += 20;
    }else if(objButton.value == "Ice tea") {
        price += 10;
    }else if(objButton.value == "Patates Kızartması") {
        price += 40;
    }else if(objButton.value == "Soğan Halkası") {
        price += 5;
    }else if(objButton.value == "Türk kahvesi") {
        price += 30;
    }else if(objButton.value == "Frozen") {
        price += 80;
    }else if(objButton.value == "Smoothie") {
        price += 80;
    }else if(objButton.value == "Patates Tava") {
        price += 50;
    }else if(objButton.value == "Combo Mix") {
        price += 90;
    }else if(objButton.value == "Tavuk Şiş") {
        price += 70;
    }else if(objButton.value == "Risotto") {
        price += 70;
    }else if(objButton.value == "Tavuk Sote") {
        price += 70;
    }else if(objButton.value == "Fettucine Alfredo") {
        price += 130;
    }else if(objButton.value == "Etli Wrap") {
        price += 100;
    }else if(objButton.value == "Tavuklı Wrap") {
        price += 80;
    }else if(objButton.value == "Bonfile") {
        price += 150;
    }else if(objButton.value == "Hamburger") {
        price += 70;
    }else if(objButton.value == "Biftek") {
        price += 150;
    }else if(objButton.value == "Sufle") {
        price += 50;
    }else if(objButton.value == "Profiterol") {
        price += 60;
    }else if(objButton.value == "Waffle") {
        price += 45;
    }


    let url = `https://restaurant-app-berke.herokuapp.com/order/`;
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "tableNo" : id,
        "order" : objButton.value,
        "orderState" : 1,
        "price": price
    }));
    window.location.reload();
}




let removeTable = async (id) => {

    let tablePrice = `orderPrice${id}`;

    let price = document.getElementById(tablePrice).innerHTML.slice(0, -1);
    price = parseInt(price);
    
    let url = `https://restaurant-app-berke.herokuapp.com/order/${id}`;
    fetch(url, { method: 'DELETE' }).then(() => console.log('Delete successful'));

    let b = await getBudget();
    
    b+=price;
    console.log(b)
    let urlRest = "https://restaurant-app-berke.herokuapp.com/restaurant";

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", urlRest);

    xhr.setRequestHeader("Content-Type", "application/json");

    var data = `{
        "restaurantName": "Temp rest",
        "budget": ${b}
    }`;

    xhr.send(data);
   
    //Push price to restaurant genel
    let table = `order${id}`;
    document.getElementById(tablePrice).innerHTML = 0 + "₺";
    document.getElementById(table).innerHTML = "";
}

let getOrders = async() => {
    console.log("asdasdasd");
    
    let url = "https://restaurant-app-berke.herokuapp.com/order/"
    
    let response = await fetch(url);
    let data = await response.json();

    data.forEach(element => {
        
        let table = "order";
        let tablePrice = "orderPrice";
        table = table.concat(element.tableNo);
        tablePrice = tablePrice.concat(element.tableNo);
        
        document.getElementById(table).innerHTML += element.order + ", "
        document.getElementById(tablePrice).innerHTML = element.price + "₺"
    });
    return data;
    
}

let getBudget = async() => {
    console.log("asdas")
    let url = "https://restaurant-app-berke.herokuapp.com/restaurant/"
    let response = await fetch(url);
    let data = await response.json();
    let budget =  data[0].budget;

    return budget;
}

let getRestaurantInfo = async() => {
    console.log("asdas")
    let url = "https://restaurant-app-berke.herokuapp.com/restaurant/"
    
    let response = await fetch(url);
    let data = await response.json();
    let name = data[0].restaurantName;
    let tableNumber = data[0].totalTableNumber;
    let budget =  data[0].budget;

    document.getElementById("nameOfRestaurant").innerHTML = "Restoran ismi: " + name;
    document.getElementById("budgetOfRestaurant").innerHTML = "Restoran bütçesi: " + budget;
    document.getElementById("tableNumberOfRestaurant").innerHTML = "Masa sayısı: " + tableNumber;

}
