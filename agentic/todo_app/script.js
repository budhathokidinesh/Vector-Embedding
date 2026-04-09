document.getElementById("add-btn").addEventListener("click", function() {
    const todoInput = document.getElementById("todo-input");
    const todoText = todoInput.value.trim();
    if (todoText !== "") {
        const li = document.createElement("li");
        li.textContent = todoText;
        const delButton = document.createElement("button");
        delButton.textContent = "Delete";
        delButton.addEventListener("click", function() {
            li.remove();
        });
        li.appendChild(delButton);
        document.getElementById("todo-list").appendChild(li);
        todoInput.value = "";
    }
});
