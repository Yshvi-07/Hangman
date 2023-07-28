import React, { Component } from "react";
import {randomWord} from "./Random";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import "./Hangman.css";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), ans: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset=this.reset.bind(this);  }
  reset(){
    this .setState(
        {
            nWrong:0,
            guessed:new Set()


        }
    );

  }

  guessedWord() {
    return this.state.ans
      .split("")
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.ans.includes(ltr) ? 0 : 1),
    }));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        key={ltr} // Don't forget to add a unique key prop for each element in the loop
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  render() {
    let gameOver=this.state.nWrong>=this.props.maxWrong;
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]}  alt={`Hangman Step ${this.state.nWrong}`} />
        <p>GuessedWrong={this.state.nWrong}</p>
        <p className="Hangman-word">{!gameOver?this.guessedWord():this.state.ans}</p>
        <p className="Hangman-btns">
            {!gameOver
            ?this.generateButtons()
            :`You lose`}
            <button onClick={this.reset}>Restart???</button>
        </p>
        
      </div>
    );
  }
}

export default Hangman;
