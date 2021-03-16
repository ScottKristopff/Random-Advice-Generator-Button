import "./styles.css";
import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { Grid, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
export default function App() {
  //State
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [adviceslip, setAdviceSlip] = useState("");
  const [author, setAuthor] = useState("");
  const [show, setShow] = useState("false");

  // Data Fetch
  const getQuotes = () => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
        );
        const data = await response.json();
        /*    console.log(data); */
        const dataQuotes = data.quotes;
        let randomNum = Math.floor(Math.random() * dataQuotes.length);
        let randomQuote = dataQuotes[randomNum];
        setAdviceSlip(randomQuote.quote);
        setAuthor(randomQuote.author);
      } catch (e) {
        setError(e.message || "Something went wrong");
      }
      setIsLoading(false);
    };

    fetchData();
  };

  // UseEffect Triggers after every render

  useEffect(() => {
    getQuotes();
  }, []);

  //Error & Loading Conditionals
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (isLoading) {
    return (
      <Grid>
        <CircularProgress />
      </Grid>
    );
  }

  // Handlers
  const handleClick = () => {
    getQuotes();
    setShow(!show);
  };

  return (
    <div className="App">
      <p>
        {show === false
          ? `What a profound quote by ${author}!`
          : "Random Quote Generator"}
      </p>
      <h2>{show ? "Generate another quote" : adviceslip}</h2>
      <p>{show ? "Someone Smart" : author}</p>
      <Button onClick={handleClick}>Generate Quote</Button>
    </div>
  );
}

/*
Random Advice Generator Button
1. Set-up state for the data your fetching
2. Create a function that will hold the fectch data request
3. Create a useEffect Hook and place the fetch function within it
4. Create a variable that will hold the  fetched data of your API * Remember to use .notation to access the data within the object
5.Create a variable that will contain the random number generator. The generator will be * the created fetched varible  data.length
6.Create a varible that contains the varible with fetched data[ random generator variable].
7. The random generator varible is in brackets because it allows for the index number to be random.
8.Create a button with a onClick={function}
9. Create a function called handleClick that calls the Fetch API on Invokation. This will generate a new quote on every button press
10.Inside the fectch function set the states to the fetched data[ random generator variable] variable. Attached with dot notation and the data name you want to select

*/

/*
Error Handling & Loading State
1. Create state the hold the error data
2. Create state for the loading screen
3. Use try...catch to make sure we catch all the possible states
4. Set the default value of the loding state to true
  This is intented as we don't want to render an empty page when there is no data yet.
  Instead, Circular Progress component will show up.
5.Write conditonal if statements for the error & loading

*/
