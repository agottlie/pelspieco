$(function() {
    console.log("js connected");

    let rowCount = 0;

    $('.list-form').on('submit', (e) => {
        e.preventDefault();
        rowCount++;

        let summaryDiv = $(`<div class='rowContainer groceries' row='${rowCount}'></div>`);
        let lowPriceDiv = $(`<div class='rowContainer groceries' row='${rowCount}'></div>`);
        let newName = $("<div></div>").text($(".list-input").val()),
            lowPriceName = $("<div></div>").text($(".list-input").val()),
            newJetro = $("<div id='jetro'></div>").text($("option:selected", this).attr("jetro").substr(0, 7)),
            newDairy = $("<div id ='dairy'></div>").text($("option:selected", this).attr("dairyland").substr(0, 7)),
            newBaldor = $("<div id='baldor'></div>").text($("option:selected", this).attr("baldor").substr(0, 7)),
            newDollar = $("<div id='dollar'></div>").text($("option:selected", this).attr("dollartree").substr(0, 7)),
            newOther = $("<div id='other'></div>").text($("option:selected", this).attr("other").substr(0, 7)),
            newQuantity = $(`<div><input class='list-quantity-input' data-id='${rowCount}' value=1 required /></div>`),
            newMeasurement = $("<div></div>").text($("option:selected", this).attr("measurement")),
            newRemove = $(`<div class='remove-grocery' data-id='${rowCount}'>Remove</div>`);

        let prices = [newJetro, newDairy, newBaldor, newDollar, newOther];
        let lowPrice = -1;
        let lowVendor;

        for (let i = 0; i < prices.length; i++) {

            if (Number((prices[i].text()) < lowPrice || lowPrice === -1) && Number(prices[i].text()) > 0) {
                lowPrice = Number(prices[i].text());
                lowVendor = prices[i];
            }
        };

        let vendorClass = "." + lowVendor.attr("id") + "_total";
        let amount = vendorClass + "_amount";
        let lowPriceVendor = lowVendor.clone();
        lowPriceVendor.attr("class", "priceDiv")
        lowPriceDiv.append(lowPriceName, lowPriceVendor);
        lowPriceDiv.attr({
            "price": lowPrice,
            "vendor": amount
        });
        summaryDiv.attr({
            "price": lowPrice,
            "vendor": amount
        });
        newQuantity.attr({
            "price": lowPrice,
            "vendor": amount
        });
        
        $(vendorClass).before(lowPriceDiv);

        $(amount).text(Number($(amount).text()) + Number(lowVendor.text()));

        lowVendor.addClass('green');

        summaryDiv.append(newName, newJetro, newDairy, newBaldor, newDollar, newOther, newQuantity, newMeasurement, newRemove);
        $(".shopping_list").append(summaryDiv);

    });

    $(document.body).on('click', '.remove-grocery', (e) => {
        e.preventDefault();

        let row = $(e.target).attr("data-id"),
            vendorTotal = $(`.rowContainer[row="${row}"]`).attr("vendor"),
            priceDiv = $(`.rowContainer[row="${row}"]`).eq(1).find(".priceDiv"),
            price = Number(priceDiv.text()),
            newTotal = Number($(vendorTotal).text()) - price;

        $(vendorTotal).text(newTotal);
        
        $(`.rowContainer[row="${row}"]`).remove();
    })

    $(document.body).on('input', (e) => {
        e.preventDefault();

        let quantity = $(e.target).val(),
            row = $(e.target).attr("data-id"),
            price = $(`.rowContainer[row="${row}"]`).eq(0).attr("price"),
            vendorTotal = $(`.rowContainer[row="${row}"]`).eq(0).attr("vendor"),
            priceDiv = $(`.rowContainer[row="${row}"]`).eq(1).find(".priceDiv"),
            oldPrice = Number(priceDiv.text());

        if (!isNaN(Number(quantity))) {
            let newPrice = Number(quantity) * Number(price);
            priceDiv.text(newPrice);
            let newTotal = Number($(vendorTotal).text()) - oldPrice + newPrice;
            $(vendorTotal).text(newTotal);          
        }

    })

})