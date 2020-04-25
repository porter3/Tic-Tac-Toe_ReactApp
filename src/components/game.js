import React from 'react';
import Board from './board';


class Game extends React.Component {

    constructor(){
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                location: {
                    row: '',
                    col: ''
                }
            }],
            stepNumber: 0,
            xIsNext: true
        };
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        // get column and row based on the index
        let col = i % 3 % 3 + 1;
        let row = Math.floor(i / 3) + 1;
        this.setState({
            // concat doesn't mutate original array like push()
            history: history.concat([{
                squares: squares,
                location: {
                    row: row,
                    col: col
                }
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const { row, col } = step.location;
            const desc = move ? 'Go to move #' + move + ' (' + row + ', ' + col + ')' : 'Go to game start';
            let button;

            // if it's the current move, make the text bold
            if (move === history.length - 1) {
                button = <button onClick={() => this.jumpTo(move)}><strong>{desc}</strong></button>;
            } else {
                button = <button onClick={() => this.jumpTo(move)}>{desc}</button>;
            }
            return (
                <li key={move}>
                    {button}
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => {this.handleClick(i)}}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}


export default Game;