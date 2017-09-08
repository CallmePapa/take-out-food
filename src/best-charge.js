function bestCharge(inputs) {
  let allItems = loadAllItems();
  let promotions = loadPromotions();
  let Inputs = getItems(inputs);
  let Items = AboutItems(allItems, Inputs);
  let Subtotal = subTotal(Items);
  let Total = endTotal(Subtotal);
  let setPromotions = getPromotions(promotions, Total, Subtotal);
  let SavedTotal = savedTotal(setPromotions);
  let result = print(setPromotions, Total, SavedTotal, Subtotal);
}
function getItems(inputs) {
  return inputs.map(function (inputs) {
    let temp = inputs.split(' x ');
    return {
      id: temp[0],
      count: parseInt(temp[1])
    }
  });
}
function AboutItems(allItems, Inputs) {
  let result = [];
  for (let i = 0; i < Inputs.length; i++) {
    let exist = allItems.find(function (item) {
      return item.id === Inputs[i].id;
    });
    if (exist) {
      result.push(Object.assign({}, exist, {count: Inputs[i].count}));
    }
  }
  return result;
}
function subTotal(Items) {
  let result = [];
  for (let i = 0; i < Items.length; i++) {
    result.push(Object.assign({}, Items[i], {subtotal: Items[i].price * Items[i].count}));
  }
  return result;
}
function endTotal(Subtotal) {
  let sum = 0;
  for (let i = 0; i < Subtotal.length; i++) {
    sum += Subtotal[i].subtotal;
  }
  return sum;
}
function getPromotions(Subtotal, promotions) {
  let result = [];
  for (let i = 0; i < Subtotal.length; i++) {
    let exist = promotions[1].items.find(function (item) {
      return item === Subtotal[i].id;
    });
    var flag = 0;
    if (exist) {
      flag = 1;
      result.push(Object.assign({}, {
        id: Subtotal[i].id,
        name: Subtotal[i].name,
        price: Subtotal[i].price,
        count: Subtotal[i].count,
        subtotal: parseFloat(Subtotal[i].subtotal / 2)
      }));

    }
    if (flag === 0) {
      result.push(Object.assign({}, Subtotal[i]));
    }
  }
  return result;
}
function savedTotal(setPromotions) {
  let sum = 0;
  for (let i = 0; i < setPromotions.length; i++) {
    sum += setPromotions[i].subtotal;
  }
  return sum;
}
function print(setPromotions, Total, SavedTotal, Subtotal) {
  let result = "============= 订餐明细 =============";
  if (Total === SavedTotal) {
    for (let i = 0; i < setPromotions.length; i++) {
      result += "\n" + setPromotions[i].name + " x " + setPromotions[i].count + " = " + Subtotal[i].subtotal + "元";
    }
    result += "\n-----------------------------------";
    result += "\n总计：" + Total + "元";
    result += "\n===================================";
  }

  else if (SavedTotal === Total - 6) {
    for (let i = 0; i < setPromotions.length; i++) {
      result += "\n" + setPromotions[i].name + " x " + setPromotions[i].count + " = " + Subtotal[i].subtotal + "元";
    }
    result += "\n-----------------------------------";
    result += "\n使用优惠:";
    result += "\n满30减6元，省6元";
    result += "\n-----------------------------------";
    result += "\n总计：" + SavedTotal;
    result += "\n===================================";
  }
  else {
    for (let i = 0; i < setPromotions.length; i++) {
      result += "\n" + setPromotions[i].name + " x " + setPromotions[i].count + " = " + Subtotal[i].subtotal + "元";
    }
    result += "\n-----------------------------------";
    result += "\n使用优惠:";
    result += "\n指定菜品半价(";
    for (let j = 0; j < Subtotal.length; j++) {
      if (Subtotal[j].subtotal === 2 * setPromotions[j].subtotal) {
        result += Subtotal[j].name;
        result += "，";
      }
    }
    result = result.substr(0, result.length - 1);
    result += ")，";
    result += "省" + (Total - SavedTotal) + "元";
    result += "\n-----------------------------------";
    result += "\n总计：" + SavedTotal + "元";
    result += "\n===================================";
  }
  return result;
}
