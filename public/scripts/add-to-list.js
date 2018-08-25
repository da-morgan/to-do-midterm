$(function() {
  function createDropdownForm(id) {
    var formOutput = $('<form>')
      .attr('name', id)
      .attr('class', 'dropdown')
      .attr('method', 'POST')
      .attr('action', 'todos');

    // The dropdownButton is the button itself while the divDropdown is the container for the buttons that will drop down on click
    var dropdownButton = createDropdownButton();
    var divDropdown = createDivDropdown();

    formOutput.append(dropdownButton);
    formOutput.append(divDropdown);
    return formOutput;
  }

  function createDeleteForm (id) {
    var formOutput = $('<form>')
      .attr('id', 'test-delete')
      .attr('action', `/todos/${id}/delete`)
      .attr('method', 'POST')
      .attr('name', 'id');

    var deleteButton = createDeleteButton();
    formOutput.append(deleteButton);
    return formOutput;
  }

  function createDeleteButton() {
    var deleteButton = $('<input>')
    .attr('type', 'submit')
    .attr('class','far fa-trash-alt');
    return deleteButton;
  }

  function createDropdownButton() {
    var dropdownButtonOutput = $('<button>')
      .attr('id', 'dropdownMenuButton')
      .attr('class', 'btn btn-secondary dropdown-toggle')
      .attr('type', 'button')
      .attr('data-toggle', 'dropdown')
      .attr('aria-haspopup', 'true')
      .attr('aria-expanded', 'false');

    var editIcon = createEditIcon()

    dropdownButtonOutput.append(editIcon);
    return dropdownButtonOutput;
  }

  function createEditIcon() {
    var iconOutput =$('<i>')
      .attr('class', 'far fa-edit');
    return iconOutput;
  }

  function createDivDropdown() {
    var dropdownDivOutput = $('<div>')
      .attr('class', 'dropdown-menu')
      .attr('aria-labelledby', 'dropdownMenuButton');

    var buttonToEat = createSubmitButton("Eat");
    var buttonToWatch = createSubmitButton("Watch");
    var buttonToRead = createSubmitButton("Read");
    var buttonToBuy = createSubmitButton("Buy");

    dropdownDivOutput.append(buttonToEat);
    dropdownDivOutput.append(buttonToWatch);
    dropdownDivOutput.append(buttonToRead);
    dropdownDivOutput.append(buttonToBuy);

    return dropdownDivOutput;
  }

  function createSubmitButton(category) {
    var submitButtonOutput = $('<button>')
      .attr('class', 'dropdown-item')
      .attr('type', 'submit')
      .attr('name', category)
      .text("To " + category);
    return submitButtonOutput;
  }

  function createListElement(content, id) {
    var listElementOutput = $("<li>");
    listElementOutput.attr('class', 'list-group-item')
      .append($('<p>').text(content));

    var newEditForm = createDropdownForm(id);
    var newDeleteForm = createDeleteForm(id);
    listElementOutput.append(newEditForm);
    listElementOutput.append(newDeleteForm);

    return listElementOutput;
  }

  function addToList(todoList, todoContent, todoId) {
    var listElement = createListElement(todoContent, todoId);

    switch (todoList) {
      case "To Eat":
        $('#to-eat').append(listElement);
        break;
      case "To Watch":
        $('#to-watch').append(listElement);
        break;
      case "To Read":
        $('#to-read').append(listElement);
        break;
      case "To Buy":
        $('#to-buy').append(listElement);
        break;
      default:
        $('#uncategorized').append(listElement);
        break;
      }
  }

  function renderLists(lists) {
    lists.forEach(function(todo) {
      addToList(todo.category, todo.name, todo.id);
    });
  }

  $.get("/todos").done(function(lists) {
    $("ul#to-eat").empty();
    $("ul#to-watch").empty();
    $("ul#to-read").empty();
    $("ul#to-buy").empty();
    $("ul#uncategorized").empty();
    renderLists(lists);
  });

  $("form#new-list-item").on("submit", function(event) {
    event.preventDefault();

    var input = $(this).children("input");
    var todoText = input.serialize();

    var category = "To Read";
    addToList(category, input.val());

    $.post('/todos', todoText).done(function(lists) {
      input.val("");

    });
  });
});
