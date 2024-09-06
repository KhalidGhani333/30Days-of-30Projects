"use client"
import { useState,useEffect, useRef, ChangeEvent } from "react"
import {Input} from "./ui/input"
import { Button } from "./ui/button"


function Count_down(){

const [duration,setDuration]=useState<number|string>("");
const [timeLeft,setTimeleft]=useState<number>(0);
const [isActive,setIsActive]=useState<boolean>(false);
const [isPaused,setIsPaused]=useState<boolean>(false);
const timerRef = useRef<NodeJS.Timeout | null>(null)

const handleSetDuration =():void =>{
    if(typeof duration === "number" && duration > 0){
        setTimeleft(duration);
        setIsActive(false);
        setIsPaused(false);
        if(timerRef.current){
            clearInterval(timerRef.current)
        }
    }}

    const handlestart = () :void =>{
        if(timeLeft > 0) {
            setIsActive(true);
            setIsPaused(false);
        }
    }
    const handlePasue = ():void =>{
        if(isActive){
            setIsPaused(true);
            setIsActive(false);
            if(timerRef.current){
                clearInterval(timerRef.current);
            }
        }
    }
    const handleReset = ():void =>{
        setIsActive(false);
        setIsPaused(false);
        setTimeleft(typeof duration === "number" ? duration : 0)
        if(timerRef.current){
            clearInterval(timerRef.current)
        }
    }
    useEffect(()=>{
        if(isActive && !isPaused){
            timerRef.current = setInterval(()=>{
                setTimeleft((prevTime) =>{
                    if(prevTime <= 1){
                        clearInterval(timerRef.current!);
                        return 0;}
                    return prevTime - 1;
                });
            },1000);
        
    }
    return ()=>{
        if(timerRef.current){
            clearInterval(timerRef.current);
        }
    };
},[isActive,isPaused]);

const formatTime =(time:number):string => {
    const minutes = Math.floor(time/60);
    const seconds = time % 60;

    return`${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`
};
const handleDurationChange =(e:ChangeEvent<HTMLInputElement>): void=>{
  setDuration(Number(e.target.value) || "");}

  return(
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
    <div className="bg-blue-300 dark:bg-gray-800 shadow-lg rounded-lg w-full max-w-md">
    <h1 className="text-2xl text-center font-bold p-5">CountDown Timer</h1>
    <div className="flex items-center mb-6">
    <Input
    type="number" 
    id="duration" 
    placeholder="Enter Duration in Seconds" 
    value={duration} 
    onChange={handleDurationChange} 
    className="flex-1 mr-4 rounded-md border-gray-600 text-black font-bold text-1xl ml-3 p-1"
    />
    <Button
    onClick={handleSetDuration} 
    variant="outline" 
    className="text-gray-700 dark:text-gray-200 mr-5 hover:bg-gray-200">
     Set
    </Button>
    </div>
    <div className="text-6xl font-bold text-center mb-6">
        {formatTime(timeLeft)}
        </div>
    <div className="flex justify-center gap-6 mb-3"> 
    <Button 
    onClick={handlestart} 
    variant="outline" 
    className="text-gray-800 border-4 border-green-500">
    {isPaused? "Resume" : "Start"}
    </Button>
    <Button
    onClick={handlePasue}
    variant="outline" 
    className="text-gray-800 border-4 border-yellow-500">
            Pause
    </Button>
    <Button
    onClick={handleReset}
    variant="outline" 
    className="text-gray-800 border-4 border-red-500">
            Reset
        </Button>
    </div>
</div>
</div>


  );
}

export default Count_down