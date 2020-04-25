import React from 'react';
import Square from './square';


class Board extends React.Component {

    renderSquare(i) {
        return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />;
    }

    createBoard = () => {
        const board = [];

        let squareIndex = 0;
        for (let i = 0; i < 3; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                row.push(<React.Fragment key={squareIndex}>{this.renderSquare(squareIndex)}</React.Fragment>);
                squareIndex++;
            }
            board.push(
                <div key={i} className="board-row">
                    {row}
                </div>
            );
        }
        return board;
    }

    render() {

        return (
            <div>
                {this.createBoard()}
            </div>
        );
    }
}


export default Board;