import React, { useState, useRef } from 'react';

function BubbleSort() {
    const [array, setArray] = useState([49, 24, 27, 20, 38, 39, 46, 2, 17]);
    const [colors, setColors] = useState(Array(9).fill('bg-blue-400'));
    const [currentElementIndex, setCurrentElementIndex] = useState(null);
    const [maxElementIndex, setMaxElementIndex] = useState(null);
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
        setCurrentElementIndex(null);
        setMaxElementIndex(null);
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

    // Bubble Sort Algorithm with color animation
    const bubbleSort = async () => {
        setIsSorting(true);
        setSorted(false);
        let arr = [...array];
        let colorArray = Array(arr.length).fill('bg-blue-400');
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            setMaxElementIndex(n - 1 - i); // Track the last sorted element
            for (let j = 0; j < n - 1 - i; j++) {
                setCurrentElementIndex(j); // Current index being compared
                colorArray[j] = 'bg-orange-500'; // Highlight current element
                colorArray[j + 1] = 'bg-red-500'; // Highlight next element
                setColors([...colorArray]);
                await sleep(speed);

                if (pauseRef.current) {
                    while (pauseRef.current) {
                        await sleep(100);
                    }
                }

                // Compare and swap if necessary
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap

                    // Highlight swapped elements
                    colorArray[j] = 'bg-red-500';
                    colorArray[j + 1] = 'bg-red-500';
                    setArray([...arr]);
                    setColors([...colorArray]);
                    await sleep(speed);
                }

                colorArray[j] = 'bg-blue-400'; // Reset current element color
                colorArray[j + 1] = 'bg-blue-400'; // Reset next element color
            }
            colorArray[n - 1 - i] = 'bg-green-500'; // Mark the last sorted element
            setColors([...colorArray]);
            await sleep(speed);
        }

        // Mark the first element as sorted
        colorArray[0] = 'bg-green-500';
        setColors([...colorArray]);
        setMaxElementIndex(null);
        setCurrentElementIndex(null);
        setIsSorting(false);
        setSorted(true);
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <h2 className="text-2xl font-bold mb-4">Bubble Sort Visualization</h2>

            {/* Bar Visualization of the Array */}
            <div className="flex justify-center items-end w-3/4 mx-auto my-6 space-x-1" style={{ height: '300px' }}>
                {array.map((value, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                        <div
                            className={`rounded-lg text-black text-xs ${colors[idx]} transition-all duration-300 ease-in-out`}
                            style={{
                                height: `${value * 2}px`, // Height based on value
                                width: "30px",
                                textAlign: "center",
                                fontFamily: "sans-serif",
                                fontWeight: "bold",
                                fontSize: "14px",
                                border: maxElementIndex === idx || currentElementIndex === idx ? "2px solid black" : "none",
                                position: "relative",
                                bottom: '0' // Align bars to the bottom of the container
                            }}
                        >
                            {value}
                        </div>
                        <div className="text-s mt-2 font-sans">
                            {idx}
                        </div>
                        <div className="text-xs mt-1 font-sans">
                            {idx === currentElementIndex ? 'Current' : idx === maxElementIndex ? 'Max Element' : ''}
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
                    onClick={bubbleSort}
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

export default BubbleSort;
