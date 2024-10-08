import React, { useState, useRef, useCallback } from 'react';

function InsertionSort() {
    const [array, setArray] = useState([82, 53, 73, 83, 19, 63, 30, 80, 56, 67]);
    const [colors, setColors] = useState(Array(10).fill('bg-cyan-400'));
    const [inputValue, setInputValue] = useState("");
    const [isSorting, setIsSorting] = useState(false);
    const [sorted, setSorted] = useState(false);
    const comparisonTextRef = useRef(''); // Use a ref to store comparisonText to avoid unnecessary re-renders

    const SWAP_SPEED = 500;  // 500ms for clear visibility

    // Generate a random array
    const generateRandomArray = useCallback(() => {
        const randomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
        setArray(randomArray);
        setColors(Array(10).fill('bg-cyan-400'));
        setSorted(false);
        setIsSorting(false);
    }, []);

    // Handle user input for the array
    const handleInputChange = (e) => setInputValue(e.target.value);

    const handleArraySubmit = () => {
        const userArray = inputValue.split(',').map(Number);
        if (userArray.some(isNaN)) {
            alert("Please enter a valid comma-separated list of numbers.");
        } else {
            setArray(userArray);
            setColors(Array(userArray.length).fill('bg-cyan-400'));
            setSorted(false);
        }
    };

    // Sleep function with custom delay
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Insertion Sort Algorithm
    const insertionSort = useCallback(async () => {
        setIsSorting(true);
        setSorted(false);
        let arr = [...array];
        let colorArray = Array(arr.length).fill('bg-cyan-400');
        const n = arr.length;

        for (let i = 1; i < n; i++) {
            const key = arr[i];
            let j = i - 1;
            colorArray[j + 1] = 'bg-orange-700'; // Highlight the key being compared
            setColors([...colorArray]);

            comparisonTextRef.current = `Inserting ${key} at the correct position.`;
            await sleep(300); // Wait for a while before the comparison

            while (j >= 0 && arr[j] > key) {
                colorArray[j] = 'bg-orange-700'; // Highlight the element being compared
                setColors([...colorArray]);

                comparisonTextRef.current = `Comparing: ${arr[j]} and ${key}`;
                await sleep(300); // Wait for a while to visualize the comparison

                arr[j + 1] = arr[j]; // Move the element one position ahead
                setArray([...arr]); // Update the array state
                await sleep(SWAP_SPEED); // Slower speed for visibility of swap

                colorArray[j] = 'bg-cyan-400'; // Reset the color of the compared element
                j--;
            }
            arr[j + 1] = key; // Insert the key in the correct position
            setArray([...arr]); // Update the array state
            colorArray[j + 1] = 'bg-green-700'; // Mark the inserted element as sorted
            setColors([...colorArray]);
        }

        setSorted(true);
        setIsSorting(false);
    }, [array]);

    return (
        <div className="flex justify-center gap-8 mt-10">
            {/* Left-side: Array Visualization */}
            <div className="flex flex-col items-center w-fit p-4">
                <h2 className="text-2xl font-bold mb-4">Insertion Sort Visualization</h2>

                <div className="flex justify-center items-end gap-2 w-fit px-8 mx-auto my-8 space-x-1" style={{ height: '300px' }}>
                    {array.map((value, idx) => (
                        <div key={idx} className="flex flex-col items-center" style={{ position: "relative" }}>
                            <div
                                className={`rounded-lg text-black text-xs ${colors[idx]} transition-all duration-300 ease-in-out mt-4`}
                                style={{
                                    height: `${value * 2.5}px`,
                                    width: "40px",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                    border: 'none',
                                }}
                            >
                                {value}
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
                        className="outline-none rounded-l-lg w-64 py-1 px-1"
                    />
                    <button
                        onClick={handleArraySubmit}
                        className="bg-orange-700 text-white rounded-r-lg py-1 px-2 hover:bg-orange-700"
                    >
                        GO
                    </button>
                </div>

                <div>
                    <button
                        onClick={insertionSort}
                        className={`px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-700 ${isSorting && 'opacity-50 cursor-not-allowed'}`}
                        disabled={isSorting}
                    >
                        Sort
                    </button>
                    <button
                        onClick={generateRandomArray}
                        className="px-4 py-2 bg-orange-700 text-white rounded hover:bg-orange-700"
                        disabled={isSorting}
                    >
                        Create Random Array
                    </button>
                </div>
            </div>

            {/* Right-side: Algorithm Display */}
            <div className="fixed bottom-[40%] right-[2%] w-[15%]">
                <h3 className="text-xl font-bold w-full px-6 py-1 text-white bg-gray-800 rounded-t-lg">Algorithm Steps</h3>
                <p className="text-orange-700 w-full px-6 py-2 bg-white rounded-b-lg"
                    dangerouslySetInnerHTML={{ __html: comparisonTextRef.current ? comparisonTextRef.current : 'Press Sort to begin.' }}
                />
                {sorted && <p className="text-green-600 px-6 py-2 font-bold">Array is sorted!</p>}
            </div>
        </div>
    );
}

export default InsertionSort;
