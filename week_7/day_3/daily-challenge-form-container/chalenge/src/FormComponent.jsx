import React from "react";

function FormComponent({ data, handleChange, handleSubmit }) {
  return (
    <div className="form-container" >
      <h1>Sample form</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={data.firstName}
          onChange={handleChange}
          placeholder="First Name"
        />

        <input
          type="text"
          name="lastName"
          value={data.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />

        <input
          type="text"
          name="age"
          value={data.age}
          onChange={handleChange}
          placeholder="Age"
        />

        <br />

        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={data.gender === "male"}
            onChange={handleChange}
          />
          Male
        </label>

        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={data.gender === "female"}
            onChange={handleChange}
          />
          Female
        </label>

        <br />

        <label>Select your destination</label>
        <select
          name="destination"
          value={data.destination}
          onChange={handleChange}
        >
          <option value="">-- Please Choose a destination --</option>
          <option value="Japan">Japan</option>
          <option value="Brazil">Brazil</option>
          <option value="Morocco">Morocco</option>
        </select>

        <br />

        <label>Dietary restrictions:</label>
        <br />

        <label>
          <input
            type="checkbox"
            name="nutsFree"
            checked={data.nutsFree}
            onChange={handleChange}
          />
          Nuts free
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            name="lactoseFree"
            checked={data.lactoseFree}
            onChange={handleChange}
          />
          Lactose free
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            name="vegan"
            checked={data.vegan}
            onChange={handleChange}
          />
          Vegan meal
        </label>

        <br />
        <button type="submit">Submit</button>
      </form>

      <hr />

      {/* Entered information */}
      <div className="output-container">
      <h2>Entered information:</h2>

      <p>Your name: {data.firstName} {data.lastName}</p>
      <p>Your age: {data.age}</p>
      <p>Your gender: {data.gender}</p>
      <p>Your destination: {data.destination}</p>

      <p>Your dietary restrictions:</p>
      <p>**Nuts free : {data.nutsFree ? "Yes" : "No"}</p>
      <p>**Lactose free : {data.lactoseFree ? "Yes" : "No"}</p>
      <p>**Vegan meal : {data.vegan ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}

export default FormComponent;
