"use client";
import { useState } from "react";
function Box({ value, onClick }) {
	return (
		<>
			<button
				className="border-2 border-solid border-black w-14 h-14 text-center text-3xl font-bold transition-all hover:bg-rose-400 text-cyan-800"
				onClick={onClick}
			>
				{value}
			</button>
		</>
	);
}
export default function Board() {
	const [squares, setSquares] = useState(Array(9).fill(null));
	const [xIsNext, setXIsNext] = useState(true);
	function handleClick(i) {
		if (squares[i]) {
			return;
		}
		if (checkWinner()) {
			return;
		}
		const nextSquares = squares.slice();
		xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
		setSquares(nextSquares);
		setXIsNext(!xIsNext);
	}
	function checkWinner() {
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
			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				return squares[a];
			}
		}
		return null;
	}
	function Modal() {
		let winner = checkWinner();
		let isEnded = squares.every((square) => {
			return square != null;
		});
		if (!winner) {
			let check;
			xIsNext == true ? (check = "X") : (check = "O");
			if (isEnded) {
				return (
					<>
						<h1 className="text-center m-3 text-xl">Tie</h1>
					</>
				);
			} else {
				return (
					<>
						<h1 className="text-center m-3 text-xl">
							Next Player is : {check}
						</h1>
					</>
				);
			}
		} else {
			return (
				<>
					<h1 className="text-center m-3 text-xl">Winner : {winner}</h1>
				</>
			);
		}
	}
	return (
		<>
			<div className="my-48">
				<Modal />
				<div className="flex align-center justify-center">
					<Box value={squares[0]} onClick={() => handleClick(0)} />
					<Box value={squares[1]} onClick={() => handleClick(1)} />
					<Box value={squares[2]} onClick={() => handleClick(2)} />
				</div>
				<div className="flex align-center justify-center">
					<Box value={squares[3]} onClick={() => handleClick(3)} />
					<Box value={squares[4]} onClick={() => handleClick(4)} />
					<Box value={squares[5]} onClick={() => handleClick(5)} />
				</div>
				<div className="flex align-center justify-center">
					<Box value={squares[6]} onClick={() => handleClick(6)} />
					<Box value={squares[7]} onClick={() => handleClick(7)} />
					<Box value={squares[8]} onClick={() => handleClick(8)} />
				</div>
				<button
					className="m-auto my-10 block border-2 border-black p-2 rounded hover:bg-rose-400 transition-all hover:scale-90"
					onClick={() => location.reload()}
				>
					Restart Game
				</button>
			</div>
		</>
	);
}
