import './App.css'
import React, { ChangeEvent } from 'react'

export default function App() {
  const [word, setWord] = React.useState('');
  const [words, setWords] = React.useState([]);
  const [index, setIndex] = React.useState(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  //  this only fires on submit, and it increments the index as long as it is less than length of the 
  //  words array.
  React.useEffect(() => {
    if (words && index < words.length) {
      const timer = setTimeout(() => setIndex(prev => prev + 1), 500);
      return () => clearTimeout(timer);
    }
  }, [index]);

  function handleSubmit(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const wordsArray = word.split(' ');
    if (wordsArray.length <= 1) {
      return;
    } else {
      setWords(wordsArray);
      setIndex(1);
      setWord('');
    }
  }

  // this takes the words array and slices it from start to the index that's been incremented
  // and then joins it.
  const constructedWord = React.useMemo(() => {
    return words.slice(0, index).join(' ');
  }, [index])



  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={word}
          placeholder='enter word'
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
      <p>{constructedWord}</p>
    </div>
  )
}

// Write a functional component that accepts an extended piece of text from the user and prints the text to the screen,
// beginning with the first word and appending the next word every half-second until the entire text is displayed on the screen. For example, if the user submits “Hi my name is Bob”, the screen should read “Hi”, then “Hi my”, then “Hi my name”, and so on. If the user submits another piece of text reset the display and begin printing the new text. An image of the component taken as it was printing the input “Hi my name is Bob” is shown below: