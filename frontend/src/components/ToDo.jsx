import React, { useEffect, useState } from "react";
import axios from "axios";

const ToDo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [updateItem, setUpdateItem] = useState("");

  useEffect(() => {
    const getItemsFromDB = async () => {
      let list = await axios.get("http://localhost:5000/get");
      setItems(list.data);
    };
    getItemsFromDB();
  }, [toggleSubmit == false]);

  const handleInput = (e) => {
    setInputData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (items.includes(inputData)) {
      alert("Duplicate tasks are not allowed");
      return;
    }
    if (inputData) {
      setItems([...items, inputData]);
      setInputData("");
      fetch("http://localhost:5000/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: inputData }),
      });
    } else {
      alert("Field can't be empty");
    }
  };

  const editItem = (pos) => {
    setInputData(items[pos]);
    setUpdateItem(items[pos]);
    setToggleSubmit(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/update/${updateItem}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: inputData }),
    });
    setInputData("");
    setToggleSubmit(true);
  };

  const deleteItem = (pos) => {
    fetch(`http://localhost:5000/delete/${items[pos]}`, {
      method: "DELETE",
    });
    const updatedItems = items.filter((elem, index) => {
      return index !== pos;
    });
    setItems(updatedItems);
  };

  const deleteAll = () => {
    if (items.length == 0) {
      alert("Please add some tasks first!!!");
      return;
    }
    fetch("http://localhost:5000/deleteAll", {
      method: "DELETE",
    });
    setItems([]);
  };

  return (
    <>
      <section>
        <h1>Todo List</h1>
        <form>
          <input
            type="text"
            placeholder="Add Item..."
            value={inputData}
            onChange={handleInput}
          />
          {toggleSubmit ? (
            <button onClick={handleSubmit}>+</button>
          ) : (
            <button onClick={handleUpdate}>Save</button>
          )}
        </form>
        {items.map((item, index) => {
          return (
            <div className="todoitem" key={index}>
              <p>{item}</p>
              <button onClick={() => deleteItem(index)}>
                <i className="fa-regular fa-trash-can"></i>
              </button>
              <button onClick={() => editItem(index)}>
                <i className="fa-regular fa-pen-to-square"></i>
              </button>
            </div>
          );
        })}
        <div className="delete-btn">
          <button onClick={deleteAll}>Remove All</button>
        </div>
      </section>
    </>
  );
};

export default ToDo;
