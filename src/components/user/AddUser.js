import React, { useState /*useRef*/ } from "react";

import Card from "../ui/Card";
import ErrorPage from "../ui/ErrorPage";
import Wrapper from "../../Helper/Wrapper";
import Button from "../ui/Button";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  // Ref лучше использовать только для чтения внутри программы,если внутри программы нужно что-то изменить, лучше использовать useState
  // const nameInputRef = useRef();
  // const ageInputRef = useRef();

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    // const enteredName = nameInputRef.current.value;
    // const enteredUserAge = nameInputRef.current.value;
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input ",
        message: "Please enter a valid name (non-empty values).",
      });
      return;
    }
    if (+enteredAge < 14) {
      setError({
        title: "Invalid input ",
        message: "Please enter a valid age (> 14).",
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);
    // nameInputRef.current.value = "";
    // ageInputRef.current.value = "";
    setEnteredUsername("");
    setEnteredAge("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = (event) => {
    setError(null);
  };
  // Использование Wrapper для уменьшения вложенности
  return (
    <Wrapper>
      {error && (
        <ErrorPage
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username"> Username</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
            // ref={nameInputRef}
          />
          <label htmlFor="age"> Age(Years)</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageChangeHandler}
            // ref={ageInputRef}
          />
          <Button type="submit"> AddUser</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
