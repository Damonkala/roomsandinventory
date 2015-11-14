'use strict';

$(document).ready(init);

function init() {
  getRooms();
  $('#saveRoom').click(addRoom);
  $('#saveItem').click(addItem);

}
function getRooms(){
$.get('/rooms', function(data){
  for(var i = 0; i < data.length; i++){
    var nom = data[i].name;
    var $room = $('<tr>')
    $room.addClass('box');
    var $but = $('<button>');
    $but.addClass('showhide');
    $but.attr('id', i);
    $but.text("Show Items");
    var $roomCount = $('<div>').text(i + 1);
    $roomCount.addClass('numBox');
    $room.append($roomCount, nom, $but);
    var $items = $('<div>');
    $items.addClass('ites');
    $items.attr('dataValue', i);
    for(var q = 0; q < data[i].items.length; q++){
      console.log(data[i].items[q].name);
      var $itemDelete = $('<button>').addClass('deleteItem').text('Delete Item');
      var $itemRow = $('<td>');
      $itemRow.append(data[i].items[q].name)
      var $itemBox = $('<div>');
      $itemBox.append($itemRow, $itemDelete)
      $items.append($itemBox, '<br>');
    }
    $room.append($items);
    $('#rooms').append($room);
    // console.log($items);
    // $items.toggle();
  }
  $('.showhide').click(showItems)
  $('.deleteItem').click(deleteItem)
})

}

function addRoom(){
  var room = {};
  room.name = $('#roomName').val();
  $.post('/rooms', room);
  var $room = $('<tr>')
  $room.addClass('box');
  var $but = $('<button>');
  $but.addClass('showhide');
  $but.text("Show Items");
  $room.append(room.name);
  var $items = $('<tr>');
  $items.addClass('ites');
  $items.attr('dataValue');
  $room.append($items, $but);
  $('#rooms').append($room);
}
function addItem(){
  var item = {};
  item.name = $('#itemName').val();
  item.value = $('#itemValue').val();
  item.description = $('#itemDescription').val();

  $.post('/items', item);
  var $item = $('<tr>')
  $item.addClass('box');
  var $but = $('<button>');
  $but.addClass('showhide');
  $but.text("Show Items");
  $item.append(item);
  var $items = $('<tr>');
  $items.addClass('ites');
  $items.attr('dataValue');
  $item.append($items, $but);
  $('#items').append($item);
}

function deleteItem(e){
// e.target.closest('div').remove();
var $target = $(e.target);
var $targetDiv = $target.closest('div');
var div = $targetDiv[0];
var nameIndex  = div.firstChild.textContent;
console.log(div.firstChild.textContent)
// debugger;
// console.log(div.children.time.textContent)

$targetDiv.remove();
$.ajax({
    url: '/items',
    type: 'DELETE',
    data: {name : nameIndex},
    success: function(result) {
        console.log('deleted')
    }
})
}
function showItems(e){
console.log(e.target.closest('div'))

}
