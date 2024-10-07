import React, { useState, useRef } from 'react';

function SelectionSort() {
    const [array, setArray] = useState([49, 24, 27, 20, 38, 39, 46, 2, 17]);
    const [colors, setColors] = useState(Array(9).fill('bg-blue-400'));
    const [minElementIndex, setMinElementIndex] = useState(null);
    const [currentElementIndex, setCurrentElementIndex] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [isSorting, setIsSorting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [speed, setSpeed] = useState(300);
    const [sorted, setSorted] = useState(false);

    const pauseRef = useRef(false);

    // Generate a random array
    const generateRandomArray = () => {
        const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
        setArray(randomArray);
        setColors(Array(10).fill('bg-blue-400'));
        setInputValue("");
        setMinElementIndex(null);
        setCurrentElementIndex(null);
        setIsSorting(false);
        setSorted(false);
    };

    // Handle user input for the array
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleArraySubmit = () => {
        const userArray = inputValue.split(',').map(Number);
        if (userArray.some(isNaN)) {
            alert("Please enter a valid comma-separated list of numbers.");
        } else {
            setArray(userArray);
            setColors(Array(userArray.length).fill('bg-blue-400'));
            setIsSorting(false);
            setSorted(false);
        }
    };

    const handleSpeedChange = (e) => {
        setSpeed(Number(e.target.value));
    };

    const handlePauseResume = () => {
        setIsPaused(!isPaused);
        pauseRef.current = !pauseRef.current;
    };

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Selection Sort Algorithm with color animation
    const selectionSort = async () => {
        setIsSorting(true);
        setSorted(false);
        let arr = [...array];
        let colorArray = Array(arr.length).fill('bg-blue-400');

        for (let i = 0; i < arr.length; i++) {
            let minIndex = i;
            setCurrentElementIndex(i);

            colorArray[i] = 'bg-orange-500'; // Highlight current element
            setColors([...colorArray]);

            for (let j = i + 1; j < arr.length; j++) {
                setMinElementIndex(minIndex);
                colorArray[minElementIndex] = 'bg-green-500'; // Mark as potential minimum
                colorArray[j] = 'bg-red-500'; // Highlight compared element
                setColors([...colorArray]);
                await sleep(speed);

                if (pauseRef.current) {
                    while (pauseRef.current) {
                        await sleep(100);
                    }
                }

                if (arr[j] < arr[minIndex]) {
                    colorArray[minIndex] = 'bg-blue-400'; // Reset previous min color
                    minIndex = j;
                    setMinElementIndex(minIndex);
                }

                colorArray[j] = 'bg-blue-400'; // Reset color
                setColors([...colorArray]);
            }

            if (minIndex !== i) {
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]; // Swap

                // Highlight swapped elements
                colorArray[i] = 'bg-red-500';
                colorArray[minIndex] = 'bg-red-500';
                setArray([...arr]);
                setColors([...colorArray]);
                await sleep(speed);
            }

            // Mark sorted element as green
            colorArray[i] = 'bg-green-500';
            setColors([...colorArray]);
            await sleep(speed);
        }

        colorArray[arr.length - 1] = 'bg-green-500'; // Mark the last element as sorted
        setColors([...colorArray]);
        setMinElementIndex(null);
        setCurrentElementIndex(null);
        setIsSorting(false);
        setSorted(true);
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <h2 className="text-2xl font-bold mb-4">Selection Sort Visualization</h2>

            {/* Circle Visualization of the Array */}
            <div className="flex justify-center items-center w-3/4 mx-auto my-6 space-x-4">
                {array.map((value, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                        <div
                            className={`flex justify-center items-center rounded-full text-black text-xs ${colors[idx]} transition-all duration-300 ease-in-out`}
                            style={{
                                height: "70px",
                                width: "70px",
                                lineHeight: "50px",
                                textAlign: "center",
                                fontFamily:"sans-serif",
                                fontStyle:"bold",
                                fontSize: "14px",
                                borderRadius: "50%",
                                border: minElementIndex === idx || currentElementIndex === idx ? "2px solid black" : "none",
                                position: "relative"
                            }}
                        >
                            {value}
                        </div>
                        <div className="text-s mt-2 font-sans">
                            {idx}
                        </div>
                        <div className="text-xs mt-1 font-sans">
                            {idx === currentElementIndex ? 'Current' : idx === minElementIndex ? 'Min Element' : ''}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Field for Custom Array */}
            <div className="mb-6">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter comma-separated numbers"
                    className="px-4 py-2 outline-none rounded-lg w-64 mr-4"
                />
                <button
                    onClick={handleArraySubmit}
                    className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-700"
                >
                    Submit Array
                </button>
            </div>

            <div className="mb-4">
                <label htmlFor="speed" className="mr-4">Sorting Speed:</label>
                <select id="speed" value={speed} onChange={handleSpeedChange} className="px-2 py-1 border rounded">
                    <option value="100">Fast</option>
                    <option value="300">Medium</option>
                    <option value="500">Slow</option>
                </select>
            </div>

            <div className="space-x-4">
                <button
                    onClick={selectionSort}
                    className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 ${isSorting && 'opacity-50 cursor-not-allowed'}`}
                    disabled={isSorting}
                >
                    Sort
                </button>
                <button
                    onClick={generateRandomArray}
                    className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-700"
                    disabled={isSorting}
                >
                    Create Random Array
                </button>
                <button
                    onClick={handlePauseResume}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    disabled={!isSorting}
                >
                    {isPaused ? 'Resume' : 'Pause'}
                </button>
            </div>

            {sorted && <div className="mt-4 text-green-600 font-bold">Array is sorted!</div>}
        </div>
    );
}

export default SelectionSort;
