import { useState } from "react";

function addItemForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://localhost:3000/api/add-item";
    const body = JSON.stringify({ name, category, price, description, image });
    const response = await fetch(url, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json", // tells server that data is in json format
      },
    });

    console.log(await response);
  };

  return (
    <div>
      <p>addItemForm</p>
      <form onSubmit={handleSubmit}>
        {/* inputs for item name, price category, description */}
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label>
          Pick your favorite flavor:
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}>
            <option value="decks">decks</option>
            <option value="shoes">shoes</option>
            <option value="trucks">trucks</option>
            <option value="wheels">wheels</option>
            <option value="pants">pants</option>
            <option value="other">other</option>
          </select>
        </label>
        <label>Price</label>
        <input
          type="number"
          step="any"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />

        <label>Description</label>
        <input
          type="text"
          description="name"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <label> Image</label>
        <input type="file" id="img" name="img" accept="image/*" />
        <input type="submit" />
      </form>
    </div>
  );
}

export default addItemForm;
