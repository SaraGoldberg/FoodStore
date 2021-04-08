
function drawCategory(c) {
    temp = document.getElementById("temp-row");
    var cloneProduct = temp.content.cloneNode(true);
    cloneProduct.querySelector(".price").innerHTML = c.productPrice + " ₪";
    //cloneProduct.querySelector(".name").innerHTML = product.productName;
    cloneProduct.querySelector(".description").innerHTML = c.productDescription;
    cloneProduct.querySelector(".img-w").src = "./Images/" + product.productImage;
    document.getElementById("ProductList").appendChild(cloneProduct);
}


function getPage() {
    getAllProducts();
}

