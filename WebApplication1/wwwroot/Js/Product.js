count = 0;
bagProducts = [];
categories = [];
bool = false;

function drawProduct(product) {
    temp = document.getElementById("temp-card");
    var cloneProduct = temp.content.cloneNode(true);
    cloneProduct.querySelector(".price").innerHTML = product.productPrice +" ₪";
    cloneProduct.querySelector(".description").innerHTML = product.productDescription;
    var img = cloneProduct.querySelector(".img-w");
    img.src = "./Images/" + product.productImage;
    img.addEventListener("mouseover", () => {
        if (img.src == "https://localhost:44383/Images/over/" + product.productImage)
            img.src = "./Images/" + product.productImage;
        else
            img.src = "./Images/over/" + product.productImage;
    })
    cloneProduct.querySelector("button").addEventListener("click", () => {
        addProductToBag(product)
    });
    document.getElementById("ProductList").appendChild(cloneProduct);
}

function getAllProducts() {
    fetch("api/Product")
        .then(response => {
        return response.json();
    })
    .then(data => {
        if (data != null) {
            count = document.getElementById("counter");
            count.innerHTML = data.length; 
            data.forEach(product => drawProduct(product));
        }
        else
            alert("There is no product available :(")
    })
}

function GetCategory() {
    fetch("api/Catagory")
        .then(
            (Response) => { return Response.json(); }).then(
                data => {
                    if (data != null)
                        data.forEach(catagory => drawCategory(catagory));
                    else
                        alert("There is no category available :(");
    });
}

function drawCategory(category) {
    temp = document.getElementById("temp-category");
    var cloneCategory = temp.content.cloneNode(true);
    cloneCategory.querySelector(".OptionName").innerHTML = category.catagoryName;
    var checked = cloneCategory.querySelector(".opt");
    checked.addEventListener("click", () => {
        if (checked.checked) {
            if (!bool) {
                document.getElementById("ProductList").innerHTML = "";
                document.getElementById("counter").textContent = 0;
                getByCategoy(category.catagoryId);
                bool = true;
            }
            else {
                bool = false;
                getByCategoy(category.catagoryId);
            }
        }
        else {
            count = document.getElementById("counter");
            count.innerHTML = "";
            document.getElementById("ProductList").innerHTML = "";
            getAllProducts();
        }
    })
    document.getElementById("filters").appendChild(cloneCategory);
}

function getPage() {
    getAllProducts();
    GetCategory();
    listProd = JSON.parse(sessionStorage.getItem("BagProducts"));
    if (listProd != null)
        document.getElementById("ItemsCountText").textContent = listProd.length;
    else
        document.getElementById("ItemsCountText").textContent = 0;
}

function addProductToBag(product) {
    exist = 0;
    tempArr = [];
    oldBag = sessionStorage.getItem("BagProducts");
    if (bagProducts.length == 0 && oldBag != null) {
        bagProducts = JSON.parse(oldBag);
    }
    for (var i = 0; i < bagProducts.length; i++) {
        if (bagProducts[i][0].productId == product.productId) {
            bagProducts[i][1] = bagProducts[i][1] + 1;
            exist = 1;
        }
    }
    if (exist == 0) {
        tempArr[0] = product;
        tempArr[1] = 1;
        bagProducts.push(tempArr);
    }
    sessionStorage.setItem("BagProducts", JSON.stringify(bagProducts));
    document.getElementById("ItemsCountText").textContent = bagProducts.length;
    count++;
    sessionStorage.setItem("Count", count);
}


function getByCategoy(categoryId) {
    fetch("api/Product/" + categoryId)
        .then(response => {
            if (response.status == 204)
                alert("שגיאה בהזנת הנתונים");
            else
                if (response.ok)
                    return response.json();
        })
        .then(products => {
            count2 = document.getElementById("counter");
            count2.textContent = count2.textContent * 1 + products.length;
            console.log(products);
            for (i in products) {
                drawProduct(products[i]);
            }
        })
}
